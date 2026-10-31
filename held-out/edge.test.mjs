import test from "node:test";
import assert from "node:assert/strict";
import { formatBytes } from "../src/format.mjs";

test("invalid input is a TypeError", () => {
  for (const bad of [-5, NaN, Infinity, "1024", null, undefined]) {
    assert.throws(() => formatBytes(bad), TypeError, String(bad));
  }
});

test("invalid decimals are a TypeError", () => {
  for (const bad of [-1, 7, 1.5, "2", NaN]) {
    assert.throws(() => formatBytes(1500, { decimals: bad }), TypeError, String(bad));
  }
});

test("the largest units exist and are reachable", () => {
  assert.equal(formatBytes(1e12), "1 TB");
  assert.equal(formatBytes(1e15), "1 PB");
  assert.equal(formatBytes(1099511627776, { binary: true }), "1 TiB");
});

test("past the last unit the count keeps growing in that unit", () => {
  assert.equal(formatBytes(2e15), "2 PB");
  assert.equal(formatBytes(2 ** 60, { binary: true }), "1024 PiB");
});

test("zero decimals and a big count", () => {
  assert.equal(formatBytes(1500, { decimals: 0 }), "2 kB");
  assert.equal(formatBytes(960), "960 B");
});
