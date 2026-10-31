import test from "node:test";
import assert from "node:assert/strict";
import { formatBytes } from "../src/format.mjs";

test("trailing zeros are dropped", () => {
  assert.equal(formatBytes(2_000_000), "2 MB");
  assert.equal(formatBytes(1_500), "1.5 kB");
});

test("binary units", () => {
  assert.equal(formatBytes(1024, { binary: true }), "1 KiB");
  assert.equal(formatBytes(1536, { binary: true }), "1.5 KiB");
  assert.equal(formatBytes(1048576, { binary: true }), "1 MiB");
});

test("boundary is the base, not the unit label", () => {
  assert.equal(formatBytes(999), "999 B");
  assert.equal(formatBytes(1000), "1 kB");
  assert.equal(formatBytes(1023, { binary: true }), "1023 B");
  assert.equal(formatBytes(1024, { binary: true }), "1 KiB");
});

test("decimals option is honoured", () => {
  assert.equal(formatBytes(1_234_567, { decimals: 1 }), "1.2 MB");
  assert.equal(formatBytes(1_234_567, { decimals: 3 }), "1.235 MB");
});

test("rounding is half up", () => {
  assert.equal(formatBytes(1005, { decimals: 2 }), "1.01 kB");
  assert.equal(formatBytes(1015, { decimals: 1 }), "1 kB");
});
