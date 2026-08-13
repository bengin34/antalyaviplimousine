import { writeFile } from "node:fs/promises";

const endpoint = process.env.AVL_CDP_ENDPOINT || "http://127.0.0.1:9225";
const origin = process.env.AVL_PREVIEW_ORIGIN || "http://127.0.0.1:4175";
const target = await fetch(`${endpoint}/json/new?${encodeURIComponent(`${origin}/`)}`, { method: "PUT" }).then((response) => response.json());
const socket = new WebSocket(target.webSocketDebuggerUrl);
const pending = new Map();
const consoleErrors = [];
let commandId = 0;

socket.addEventListener("message", (event) => {
  const message = JSON.parse(event.data);
  if (message.id) {
    const handler = pending.get(message.id);
    pending.delete(message.id);
    if (message.error) handler?.reject(new Error(message.error.message));
    else handler?.resolve(message.result);
  }
  if (message.method === "Runtime.exceptionThrown") consoleErrors.push(message.params.exceptionDetails?.text || "Runtime exception");
  if (message.method === "Log.entryAdded" && message.params.entry?.level === "error") {
    consoleErrors.push(`${message.params.entry.text}${message.params.entry.url ? ` (${message.params.entry.url})` : ""}`);
  }
});

await new Promise((resolve, reject) => {
  socket.addEventListener("open", resolve, { once: true });
  socket.addEventListener("error", reject, { once: true });
});

const command = (method, params = {}) => new Promise((resolve, reject) => {
  const id = ++commandId;
  pending.set(id, { resolve, reject });
  socket.send(JSON.stringify({ id, method, params }));
});
const sleep = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));
const evaluate = async (expression) => {
  const result = await command("Runtime.evaluate", { expression, awaitPromise: true, returnByValue: true });
  if (result.exceptionDetails) throw new Error(result.exceptionDetails.exception?.description || result.exceptionDetails.text);
  return result.result?.value;
};
const viewport = (width, height) => command("Emulation.setDeviceMetricsOverride", {
  width, height, deviceScaleFactor: 1, mobile: false,
});
const navigate = async (path) => {
  await command("Page.navigate", { url: `${origin}${path}` });
  for (let attempt = 0; attempt < 40; attempt += 1) {
    await sleep(100);
    if (await evaluate("document.readyState === 'complete'")) break;
  }
  await sleep(350);
};
const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};
const screenshot = async (file, fullPage = false) => {
  const params = { format: "png", captureBeyondViewport: fullPage, fromSurface: true };
  if (fullPage) {
    const metrics = await command("Page.getLayoutMetrics");
    params.clip = {
      x: 0,
      y: 0,
      width: Math.ceil(metrics.cssContentSize.width),
      height: Math.ceil(metrics.cssContentSize.height),
      scale: 1,
    };
  }
  const result = await command("Page.captureScreenshot", params);
  await writeFile(file, Buffer.from(result.data, "base64"));
};

const layoutAudit = () => evaluate(`(() => {
  const viewportWidth = window.innerWidth;
  const rootOverflow = Math.max(document.documentElement.scrollWidth, document.body.scrollWidth) - viewportWidth;
  const visible = (element) => {
    const style = getComputedStyle(element);
    const rect = element.getBoundingClientRect();
    return style.display !== 'none' && style.visibility !== 'hidden' && Number(style.opacity) !== 0 && rect.width > 0 && rect.height > 0;
  };
  const clipsOverflow = (element) => {
    for (let parent = element.parentElement; parent && parent !== document.body; parent = parent.parentElement) {
      const overflow = getComputedStyle(parent).overflowX;
      if (['hidden', 'clip', 'auto', 'scroll'].includes(overflow)) return true;
    }
    return false;
  };
  const offenders = Array.from(document.querySelectorAll('body *'))
    .filter(visible)
    .filter((element) => !clipsOverflow(element))
    .map((element) => ({ element, rect: element.getBoundingClientRect() }))
    .filter(({ rect }) => rect.left < -1 || rect.right > viewportWidth + 1 || rect.width > viewportWidth + 1)
    .slice(0, 8)
    .map(({ element, rect }) => ({
      selector: element.id ? '#' + element.id : element.className ? element.tagName.toLowerCase() + '.' + String(element.className).trim().split(/\\s+/).join('.') : element.tagName.toLowerCase(),
      parent: element.parentElement?.id ? '#' + element.parentElement.id : element.parentElement?.className ? element.parentElement.tagName.toLowerCase() + '.' + String(element.parentElement.className).trim().split(/\\s+/).join('.') : element.parentElement?.tagName.toLowerCase(),
      text: element.textContent?.trim().replace(/\\s+/g, ' ').slice(0, 80),
      left: Math.round(rect.left),
      right: Math.round(rect.right),
      width: Math.round(rect.width),
    }));
  return { viewportWidth, rootOverflow, offenders };
})()`);

const cases = [
  { label: "phone-320", width: 320, height: 568 },
  { label: "phone-360", width: 360, height: 800 },
  { label: "phone-390", width: 390, height: 844 },
  { label: "phone-430", width: 430, height: 932 },
  { label: "tablet-768", width: 768, height: 1024 },
  { label: "tablet-1024", width: 1024, height: 1366 },
];
const languages = [
  { code: "en", path: "/" },
  { code: "de", path: "/de/" },
  { code: "tr", path: "/tr/" },
  { code: "ru", path: "/ru/" },
  ...["ar", "pl", "nl", "uk", "fr", "sv", "ja", "ko"].map((code) => ({ code, path: "/" })),
];

try {
  await command("Page.enable");
  await command("Runtime.enable");
  await command("Log.enable");

  for (const current of cases) {
    await viewport(current.width, current.height);
    await navigate("/tr/");
    await evaluate("localStorage.setItem('avl-analytics-consent', 'rejected'); location.reload()");
    await sleep(550);

    const homeLayout = await layoutAudit();
    assert(homeLayout.rootOverflow <= 1, `${current.label}: homepage root overflow ${homeLayout.rootOverflow}px`);
    assert(homeLayout.offenders.length === 0, `${current.label}: homepage elements outside viewport ${JSON.stringify(homeLayout.offenders)}`);
    assert(await evaluate("document.querySelector('h1')?.getBoundingClientRect().right <= innerWidth + 1"), `${current.label}: hero title exceeds viewport`);

    if (current.width <= 768) {
      assert(await evaluate("getComputedStyle(document.querySelector('.menu-button')).display !== 'none'"), `${current.label}: mobile menu button is hidden`);
      await evaluate("document.querySelector('.menu-button').click()");
      await sleep(120);
      assert(await evaluate("document.body.classList.contains('menu-open') && document.querySelector('.mobile-menu')?.getBoundingClientRect().width <= innerWidth + 1"), `${current.label}: mobile menu did not open inside viewport`);
      assert((await layoutAudit()).rootOverflow <= 1, `${current.label}: open menu causes horizontal overflow`);
      await evaluate("document.querySelector('.menu-button').click()");
      await sleep(80);

      await evaluate("scrollTo(0, document.querySelector('#services').offsetTop)");
      await sleep(120);
      assert(await evaluate("document.querySelector('.mobile-book-bar')?.classList.contains('visible')"), `${current.label}: mobile booking bar is not visible after the hero`);
      assert(await evaluate("Boolean(document.querySelector('.mobile-book-bar .btn-wa'))"), `${current.label}: mobile WhatsApp action is missing`);
      const stickyBounds = await evaluate(`(() => {
        const rect = document.querySelector('.mobile-book-bar')?.getBoundingClientRect();
        return rect && { left: rect.left, right: rect.right, bottom: rect.bottom, height: rect.height, viewportWidth: innerWidth, viewportHeight: innerHeight };
      })()`);
      assert(stickyBounds && stickyBounds.left >= -1 && stickyBounds.right <= stickyBounds.viewportWidth + 1 && stickyBounds.bottom <= stickyBounds.viewportHeight + 1, `${current.label}: mobile booking bar is outside viewport ${JSON.stringify(stickyBounds)}`);
      if (current.label === "phone-390") await screenshot("/tmp/avl-responsive-sticky.png");
    }

    await navigate("/tr/transfers/side/");
    const routeLayout = await layoutAudit();
    assert(routeLayout.rootOverflow <= 1 && routeLayout.offenders.length === 0, `${current.label}: route layout overflow ${JSON.stringify(routeLayout)}`);
    if (current.label === "phone-390") await screenshot("/tmp/avl-responsive-route.png");

    await navigate("/tr/gizlilik/");
    const legalLayout = await layoutAudit();
    assert(legalLayout.rootOverflow <= 1 && legalLayout.offenders.length === 0, `${current.label}: legal layout overflow ${JSON.stringify(legalLayout)}`);

    await navigate("/admin/");
    const adminLayout = await layoutAudit();
    assert(adminLayout.rootOverflow <= 1 && adminLayout.offenders.length === 0, `${current.label}: admin layout overflow ${JSON.stringify(adminLayout)}`);
  }

  await viewport(320, 700);
  for (const language of languages) {
    await navigate(language.path);
    await evaluate(`localStorage.setItem('avl-language', ${JSON.stringify(language.code)}); localStorage.setItem('avl-analytics-consent', 'rejected'); location.reload()`);
    await sleep(550);
    assert(await evaluate(`document.documentElement.lang === ${JSON.stringify(language.code)}`), `${language.code}: requested language did not render`);
    assert(await evaluate(`document.documentElement.dir === ${JSON.stringify(language.code === "ar" ? "rtl" : "ltr")}`), `${language.code}: document direction is incorrect`);
    const languageLayout = await layoutAudit();
    assert(languageLayout.rootOverflow <= 1 && languageLayout.offenders.length === 0, `${language.code}: translated homepage overflow ${JSON.stringify(languageLayout)}`);
    assert(await evaluate("document.querySelector('h1')?.getBoundingClientRect().width <= innerWidth"), `${language.code}: translated hero title exceeds viewport`);
    await evaluate("document.querySelector('.menu-button').click()");
    await sleep(80);
    assert(await evaluate(`(() => {
      const menu = document.querySelector('.mobile-menu');
      return menu.scrollWidth <= menu.clientWidth + 1 && Array.from(menu.querySelectorAll('a, button')).filter((element) => getComputedStyle(element).display !== 'none').every((element) => {
        const rect = element.getBoundingClientRect();
        return rect.left >= -1 && rect.right <= innerWidth + 1;
      });
    })()`), `${language.code}: translated mobile menu exceeds viewport`);
    await evaluate("document.querySelector('.menu-button').click()");
  }

  await viewport(390, 844);
  await navigate("/tr/");
  await evaluate("localStorage.removeItem('avl-analytics-consent'); location.reload()");
  await sleep(550);
  assert(await evaluate("Boolean(document.querySelector('#analytics-consent'))"), "Mobile consent dialog did not render");
  assert(await evaluate(`(() => {
    const rect = document.querySelector('#analytics-consent').getBoundingClientRect();
    return rect.left >= 0 && rect.right <= innerWidth && rect.top >= 0 && rect.bottom <= innerHeight;
  })()`), "Mobile consent dialog exceeds the viewport");
  await screenshot("/tmp/avl-responsive-consent.png");

  await evaluate("document.querySelector('.consent-reject').click()");
  await evaluate("document.querySelector('#destination').value = 'side'; document.querySelector('#destination').dispatchEvent(new Event('change', { bubbles: true })); document.querySelector('input[name=tripType][value=round_trip]').click(); document.querySelector('#booking').scrollIntoView()");
  await sleep(400);
  const bookingLayout = await layoutAudit();
  assert(bookingLayout.rootOverflow <= 1 && bookingLayout.offenders.length === 0, `Mobile round-trip booking layout overflow ${JSON.stringify(bookingLayout)}`);
  assert(await evaluate(`(() => Array.from(document.querySelectorAll('.booking-card .booking-field')).every((field) => {
    const rect = field.getBoundingClientRect();
    return rect.width <= innerWidth && rect.left >= 13 && rect.right <= innerWidth - 13;
  }))()`), "Mobile booking fields do not fit their container");
  const whatsappState = await evaluate(`(() => {
    const button = document.querySelector('.floating-whatsapp');
    const rect = button.getBoundingClientRect();
    return { opacity: Number(getComputedStyle(button).opacity), left: rect.left, right: rect.right, bottom: rect.bottom, viewportWidth: innerWidth, viewportHeight: innerHeight };
  })()`);
  assert(whatsappState.opacity > 0 && whatsappState.left >= 0 && whatsappState.right <= whatsappState.viewportWidth && whatsappState.bottom <= whatsappState.viewportHeight, `Mobile WhatsApp button is outside the viewport ${JSON.stringify(whatsappState)}`);
  await screenshot("/tmp/avl-responsive-booking.png");

  const relevantErrors = consoleErrors.filter((message) => !/favicon|service.worker|Supabase is not configured/i.test(message));
  assert(relevantErrors.length === 0, `Browser console errors: ${relevantErrors.join(" | ")}`);
  console.log(`Responsive audit passed: ${cases.map(({ label }) => label).join(", ")}; ${languages.length} languages; homepage, mobile menu, sticky booking, transfer, legal, consent, booking form and admin.`);
} finally {
  socket.close();
  await fetch(`${endpoint}/json/close/${target.id}`).catch(() => undefined);
}
