const assert = require("node:assert/strict");
const { readFileSync } = require("node:fs");
const { join } = require("node:path");
const { test } = require("node:test");
const vm = require("node:vm");

test("without jQuery, bootstrap stays usable and does not enable hidden reveal styling", () => {
  const classes = new Set();
  const source = readFileSync(join(__dirname, "../lib/script.js"), "utf8");
  assert.doesNotThrow(() => vm.runInNewContext(source, {
    window: { innerHeight: 900, innerWidth: 1280, scrollY: 0 },
    document: {
      body: { scrollHeight: 3000 },
      getElementsByClassName: () => [],
      addEventListener() {},
      documentElement: { classList: { add: name => classes.add(name) } },
    },
  }));
  assert.equal(classes.size, 0);
  const css = readFileSync(join(__dirname, "../src/css/main.css"), "utf8");
  for (const effect of ["effect", "moveLeft", "moveRight"]) {
    assert.doesNotMatch(css, new RegExp(`(^|})\\s*\\.${effect}\\s*\\{[^}]*opacity:\\s*0`, "m"));
  }
});

test("available jQuery still reveals intersecting content with the existing animation", () => {
  const classes = new Set();
  const row = { opacity: "0", transform: "translateX(100px)" };
  const window = { innerHeight: 900, innerWidth: 1280, scrollY: 0 };
  let handler;
  const viewport = {
    scroll(fn) {
      if (fn) handler = fn;
      else handler.call(window);
      return this;
    },
    scrollTop: () => 0,
    innerHeight: () => 900,
  };
  window.jQuery = (value) => {
    if (value === window) return viewport;
    if (typeof value === "string") return { each: (fn) => fn.call(row) };
    assert.equal(value, row);
    return {
      offset: () => ({ top: 100 }),
      css: (name, value) => value === undefined ? row[name] : (row[name] = value),
      animate: (values, duration) => {
        assert.equal(duration, 750);
        row.opacity = String(values.opacity);
      },
    };
  };
  vm.runInNewContext(readFileSync(join(__dirname, "../lib/script.js"), "utf8"), {
    window,
    document: {
      body: { scrollHeight: 3000 },
      getElementsByClassName: () => [],
      addEventListener() {},
      documentElement: { classList: { add: (name) => classes.add(name) } },
    },
  });
  assert.ok(classes.has("reveal-ready"));
  assert.equal(row.opacity, "1");
  assert.equal(row.transform, "none");
});
