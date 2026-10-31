import test from "node:test";
import assert from "node:assert/strict";
import { formatBytes } from "../src/format.mjs";

test("contract: validation of bytes", () => {
  for (const bad of [-5, NaN, Infinity, "1024", undefined, null]) {
    assert.throws(() => formatBytes(bad), TypeError);
  }
});

test("contract: validation of decimals", () => {
  for (const bad of [-1, 7, 1.5, "2", NaN]) {
    assert.throws(() => formatBytes(1000, { decimals: bad }), TypeError);
  }
});

test("contract: binary units", () => {
  assert.equal(formatBytes(1023, { binary: true }), "1023 B");
  assert.equal(formatBytes(1024, { binary: true }), "1 KiB");
  assert.equal(formatBytes(2 ** 30, { binary: true }), "1 GiB");
});

test("contract: decimal units and boundaries", () => {
  assert.equal(formatBytes(999), "999 B");
  assert.equal(formatBytes(1000), "1 kB");
  assert.equal(formatBytes(1_000_000), "1 MB");
  assert.equal(formatBytes(1e15), "1 PB");
});

test("contract: rounding half up and trailing zeros", () => {
  assert.equal(formatBytes(1500), "1.5 kB");
  assert.equal(formatBytes(1.005e3, { decimals: 2 }), "1.01 kB");
  assert.equal(formatBytes(1_234_567, { decimals: 1 }), "1.2 MB");
  assert.equal(formatBytes(2_000_000), "2 MB");
});

test("contract: large value stays within the unit table", () => {
  assert.equal(formatBytes(1e21), "1000000 PB");
});
