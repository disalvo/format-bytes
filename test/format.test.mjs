import test from "node:test";
import assert from "node:assert/strict";
import { formatBytes } from "../src/format.mjs";

test("zero", () => {
  assert.equal(formatBytes(0), "0 B");
});

test("bytes below the base stay bytes", () => {
  assert.equal(formatBytes(512), "512 B");
});

test("one and a half kilobytes", () => {
  assert.equal(formatBytes(1500), "1.5 kB");
});

test("two million bytes", () => {
  assert.equal(formatBytes(2_000_000), "2 MB");
});
