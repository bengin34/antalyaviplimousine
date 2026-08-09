import { writeFile } from "node:fs/promises";

const endpoint = process.env.AVL_CDP_ENDPOINT || "http://127.0.0.1:9225";
const target = await fetch(`${endpoint}/json/new?${encodeURIComponent("http://127.0.0.1:4175/")}`, { method: "PUT" }).then((response) => response.json());
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
const viewport = (width, height, mobile = false) => command("Emulation.setDeviceMetricsOverride", {
  width, height, deviceScaleFactor: 1, mobile,
});
const navigate = async (url) => {
  await command("Page.navigate", { url });
  for (let attempt = 0; attempt < 30; attempt += 1) {
    await sleep(100);
    if (await evaluate("document.readyState === 'complete'")) break;
  }
  await sleep(600);
};
const screenshot = async (file) => {
  const result = await command("Page.captureScreenshot", { format: "png", captureBeyondViewport: false, fromSurface: true });
  await writeFile(file, Buffer.from(result.data, "base64"));
};
const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};

try {
  await command("Page.enable");
  await command("Runtime.enable");
  await command("Log.enable");
  await viewport(1440, 1000);
  await navigate("http://127.0.0.1:4175/");
  await evaluate("localStorage.setItem('avl-analytics-consent', 'rejected'); location.reload()");
  await sleep(900);
  assert(await evaluate("document.querySelector('h1')?.innerText.includes('Premium Airport')"), "Homepage hero did not render");
  assert(await evaluate("!document.querySelector('#analytics-consent')"), "Saved consent choice was not respected");
  await screenshot("/tmp/avl-cdp-home.png");

  await evaluate(`(() => { const field = document.querySelector('#destination'); field.value = 'side'; field.dispatchEvent(new Event('change', { bubbles: true })); })()`);
  await sleep(150);
  assert(await evaluate("document.querySelector('.price-display-amount')?.innerText === '€50'"), "One-way Side quote should be €50");
  await evaluate("document.querySelector('input[name=tripType][value=round_trip]').click()");
  await sleep(150);
  assert(await evaluate("document.querySelector('.price-display-amount')?.innerText === '€100'"), "Round-trip Side quote should be €100");
  assert(await evaluate("Boolean(document.querySelector('#return-date'))"), "Round-trip fields did not appear");
  await evaluate(`(() => { const field = document.querySelector('#guests'); field.value = '8'; field.dispatchEvent(new Event('change', { bubbles: true })); })()`);
  await sleep(150);
  assert(await evaluate("document.querySelector('#vehicle-type')?.value === 'sprinter'"), "Capacity did not switch the vehicle to Sprinter");
  assert(await evaluate("document.querySelector('.price-display-amount')?.innerText === '€170'"), "Round-trip Sprinter Side quote should be €170");
  await evaluate("document.querySelector('#booking').scrollIntoView()");
  await sleep(100);
  await screenshot("/tmp/avl-cdp-booking.png");

  await navigate("http://127.0.0.1:4175/tr/transfers/side/");
  assert(await evaluate("document.querySelector('link[rel=canonical]')?.href.endsWith('/tr/transfers/side/')"), "Route canonical URL is incorrect");
  assert(await evaluate("getComputedStyle(document.querySelector('.localized-route')).backgroundImage !== 'none'"), "Route hero styling is missing");
  assert(await evaluate("document.querySelector('#destination')?.value === 'side'"), "Route booking form was not preselected");
  assert(await evaluate("window.scrollY < 50"), "Route page should open at its hero, not at the booking form");
  await screenshot("/tmp/avl-cdp-route.png");

  await viewport(390, 844, true);
  await navigate("http://127.0.0.1:4175/tr/");
  assert(await evaluate("document.documentElement.scrollWidth <= window.innerWidth"), "Mobile homepage has horizontal overflow");
  assert(await evaluate("getComputedStyle(document.querySelector('.menu-button')).display !== 'none'"), "Mobile navigation button is hidden");
  await screenshot("/tmp/avl-cdp-mobile.png");

  await viewport(1440, 1000);
  await navigate("http://127.0.0.1:4175/tr/gizlilik/");
  assert(await evaluate("document.querySelector('h1')?.innerText === 'Gizlilik Politikası'"), "Legal page did not render in Turkish");
  assert(await evaluate("Boolean(document.querySelector('[data-open-consent]'))"), "Privacy settings action is missing from the legal page");
  await screenshot("/tmp/avl-cdp-legal.png");

  await navigate("http://127.0.0.1:4175/admin/");
  assert(await evaluate("document.querySelector('button[type=submit]')?.innerText.includes('Giriş Yap')"), "Admin login did not render");
  await screenshot("/tmp/avl-cdp-admin.png");

  const relevantErrors = consoleErrors.filter((message) => !/favicon|service.worker|Supabase is not configured/i.test(message));
  assert(relevantErrors.length === 0, `Browser console errors: ${relevantErrors.join(" | ")}`);
  console.log("Browser smoke passed: homepage, quote updates, round trip, capacity switch, route, mobile, legal and admin.");
} finally {
  socket.close();
  await fetch(`${endpoint}/json/close/${target.id}`).catch(() => undefined);
}
