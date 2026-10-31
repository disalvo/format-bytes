import test from "node:test";
import assert from "node:assert/strict";
import { formatBytes } from "../src/format.mjs";

test("rule 1: bytes validation", () => {
  for (const bad of [-5, NaN, Infinity, -Infinity, "1024", undefined]) {
    assert.throws(() => formatBytes(bad), TypeError);
  }
});

test("rule 2: decimals validation", () => {
  for (const bad of [-1, 7, 2.5, "2", NaN]) {
    assert.throws(() => formatBytes(1024, { decimals: bad }), TypeError);
  }
  assert.doesNotThrow(() => formatBytes(1024, { decimals: 0 }));
  assert.doesNotThrow(() => formatBytes(1024, { decimals: 6 }));
});

test("rule 3/4/5: base and unit selection", () => {
  assert.equal(formatBytes(999), "999 B");
  assert.equal(formatBytes(1000), "1 kB");
  assert.equal(formatBytes(1023, { binary: true }), "1023 B");
  assert.equal(formatBytes(1024, { binary: true }), "1 KiB");
  assert.equal(formatBytes(1024 ** 5, { binary: true }), "1 PiB");
  assert.equal(formatBytes(1000 ** 5), "1 PB");
});

test("rule 4/5: values at the top of the table do not run off", () => {
  assert.equal(formatBytes(1e21), "1000000 PB");
});

test("rule 6: half-up rounding and trailing zeros", () => {
  assert.equal(formatBytes(1_000_000), "1 MB");
  assert.equal(formatBytes(2_000_000), "2 MB");
  assert.equal(formatBytes(1500), "1.5 kB");
  assert.equal(formatBytes(1_005, { decimals: 2 }), "1.01 kB");
  assert.equal(formatBytes(1_234_567, { decimals: 1 }), "1.2 MB");
});

test("rule 6: below the base prints an integer", () => {
  assert.equal(formatBytes(0), "0 B");
  assert.equal(formatBytes(512), "512 B");
});

test("rule 7: exactly one space", () => {
  assert.equal(formatBytes(1500), "1.5 kB");
  assert.equal(formatBytes(1500).split(" ").length, 2);
});
