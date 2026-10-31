// format-bytes - follows the README contract.

const DECIMAL_UNITS = ["B", "kB", "MB", "GB", "TB", "PB"];
const BINARY_UNITS = ["B", "KiB", "MiB", "GiB", "TiB", "PiB"];

function roundHalfUp(value, decimals) {
  if (decimals === 0) return Math.round(value);
  const str = String(value);
  // The `e` trick avoids float drift (1.005 * 100 === 100.4999...) so ties
  // round up correctly. Numbers already in exponential form fall back to the
  // plain multiply-and-round path.
  if (str.includes("e") || str.includes("E")) {
    const factor = 10 ** decimals;
    return Math.round(value * factor) / factor;
  }
  return Number(`${Math.round(Number(`${str}e${decimals}`))}e-${decimals}`);
}

export function formatBytes(bytes, options = {}) {
  const { decimals = 2, binary = false } = options;

  if (typeof bytes !== "number" || !Number.isFinite(bytes) || bytes < 0) {
    throw new TypeError("bytes must be a finite number >= 0");
  }
  if (!Number.isInteger(decimals) || decimals < 0 || decimals > 6) {
    throw new TypeError("decimals must be an integer from 0 to 6");
  }

  const units = binary ? BINARY_UNITS : DECIMAL_UNITS;
  const base = binary ? 1024 : 1000;

  let value = bytes;
  let index = 0;
  while (value >= base && index < units.length - 1) {
    value /= base;
    index += 1;
  }

  // Below the base there are no decimals: a whole byte count is an integer.
  if (index === 0) {
    return `${Math.round(value)} B`;
  }

  const number = roundHalfUp(value, decimals);
  return `${number} ${units[index]}`;
}
