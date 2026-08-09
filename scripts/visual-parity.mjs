import { writeFile } from "node:fs/promises";

const endpoint = process.env.AVL_CDP_ENDPOINT || "http://127.0.0.1:9225";
const origins = {
  legacy: process.env.AVL_LEGACY_ORIGIN || "http://127.0.0.1:4176",
  react: process.env.AVL_PREVIEW_ORIGIN || "http://127.0.0.1:4175",
};
const viewports = [
  { label: "desktop", width: 1440, height: 1000 },
  { label: "mobile", width: 390, height: 844 },
];
const sections = [
  { label: "hero", selector: "#top" },
  { label: "booking", selector: "#booking" },
  { label: "fleet", selector: "#fleet" },
  { label: "services", selector: "#services" },
  { label: "routes", selector: "#routes" },
  { label: "reviews", selector: "#reviews" },
  { label: "faq", selector: "#faq" },
  { label: "contact", selector: "#contact" },
];
const pages = [
  { label: "transfer-page", path: "/tr/transfers/side/" },
  { label: "legal-page", path: "/tr/gizlilik/" },
];

const target = await fetch(`${endpoint}/json/new?${encodeURIComponent(`${origins.react}/tr/`)}`, { method: "PUT" }).then((response) => response.json());
const socket = new WebSocket(target.webSocketDebuggerUrl);
const pending = new Map();
let commandId = 0;

socket.addEventListener("message", (event) => {
  const message = JSON.parse(event.data);
  if (!message.id) return;
  const handler = pending.get(message.id);
  pending.delete(message.id);
  if (message.error) handler?.reject(new Error(message.error.message));
  else handler?.resolve(message.result);
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
const navigate = async (url) => {
  await command("Page.navigate", { url });
  for (let attempt = 0; attempt < 40; attempt += 1) {
    await sleep(100);
    if (await evaluate("document.readyState === 'complete'")) break;
  }
  await evaluate("localStorage.setItem('avl-analytics-consent', 'rejected'); location.reload()");
  for (let attempt = 0; attempt < 40; attempt += 1) {
    await sleep(100);
    if (await evaluate("document.readyState === 'complete'")) break;
  }
  await sleep(650);
  await evaluate(`(() => {
    let style = document.querySelector('#visual-parity-overrides');
    if (!style) {
      style = document.createElement('style');
      style.id = 'visual-parity-overrides';
      style.textContent = '*,*::before,*::after{animation:none!important;transition:none!important;scroll-behavior:auto!important}';
      document.head.appendChild(style);
    }
  })()`);
};

try {
  await command("Page.enable");
  await command("Runtime.enable");
  for (const viewport of viewports) {
    await command("Emulation.setDeviceMetricsOverride", {
      width: viewport.width,
      height: viewport.height,
      deviceScaleFactor: 1,
      mobile: false,
    });
    for (const [version, origin] of Object.entries(origins)) {
      await navigate(`${origin}/tr/`);
      for (const section of sections) {
        const found = await evaluate(`Boolean(document.querySelector(${JSON.stringify(section.selector)}))`);
        if (!found) continue;
        await evaluate(`document.querySelector(${JSON.stringify(section.selector)}).scrollIntoView({ block: 'start' })`);
        await sleep(120);
        const result = await command("Page.captureScreenshot", { format: "png", captureBeyondViewport: false, fromSurface: true });
        await writeFile(`/tmp/avl-parity-${version}-${viewport.label}-${section.label}.png`, Buffer.from(result.data, "base64"));
      }
      for (const page of pages) {
        await navigate(`${origin}${page.path}`);
        await evaluate("scrollTo(0, 0)");
        await sleep(120);
        const result = await command("Page.captureScreenshot", { format: "png", captureBeyondViewport: false, fromSurface: true });
        await writeFile(`/tmp/avl-parity-${version}-${viewport.label}-${page.label}.png`, Buffer.from(result.data, "base64"));
      }
    }
  }
  console.log("Captured legacy and React parity screenshots for homepage, transfer and legal pages on desktop and mobile.");
} finally {
  socket.close();
  await fetch(`${endpoint}/json/close/${target.id}`).catch(() => undefined);
}
