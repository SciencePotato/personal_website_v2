const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");
const { test } = require("node:test");
const source = fs.readFileSync(require("node:path").join(__dirname, "../lib/script.js"), "utf8");

function setup(height = 2000, top = 0) {
  const style = {}, documentListeners = {}, windowListeners = {};
  const root = { scrollHeight: height };
  const window = {
    innerHeight: 800, innerWidth: 1200, scrollY: top,
    addEventListener: (name, fn) => { windowListeners[name] = fn; },
  };
  const document = {
    body: root, documentElement: root,
    getElementsByClassName: () => [],
    getElementById: () => ({ style }),
    addEventListener: (name, fn) => { documentListeners[name] = fn; },
  };
  const chain = { scroll() { return chain; }, each() { return chain; } };
  vm.runInNewContext(source, { window, document, $: () => chain });
  return { window, root, style, documentListeners, windowListeners };
}

test("scroll progress recomputes document size instead of retaining the initial range", () => {
  const app = setup();
  app.window.scrollY = 600;
  app.documentListeners.scroll();
  assert.equal(app.style.transform, "translate(-50%,0%)");
  app.root.scrollHeight = 3200;
  app.documentListeners.scroll();
  assert.equal(app.style.transform, "translate(-75%,0%)");
  app.window.innerHeight = 2000;
  assert.equal(typeof app.windowListeners.resize, "function");
  app.windowListeners.resize();
  assert.equal(app.style.transform, "translate(-50%,0%)");
});

test("empty ranges and overscroll produce finite, bounded progress", () => {
  const app = setup(800);
  app.documentListeners.scroll();
  assert.equal(app.style.transform, "translate(-100%,0%)");
  app.root.scrollHeight = 2000;
  app.window.scrollY = -100;
  app.documentListeners.scroll();
  assert.equal(app.style.transform, "translate(-100%,0%)");
  app.window.scrollY = 5000;
  app.documentListeners.scroll();
  assert.equal(app.style.transform, "translate(0%,0%)");
});
