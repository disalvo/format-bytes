// format-bytes — follows the README.md contract.

const DECIMAL_UNITS = ["B", "kB", "MB", "GB", "TB", "PB"];
const BINARY_UNITS = ["B", "KiB", "MiB", "GiB", "TiB", "PiB"];

// Round a non-negative number to `decimals` places, half up
// (1.005 with two decimals -> 1.01), avoiding the float bug in toFixed.
function roundHalfUp(value, decimals) {
  const factor = 10 ** decimals;
  return Math.round((value + Number.EPSILON) * factor) / factor;
}

// Format `value` with at most `decimals` places, dropping trailing zeros.
function trimZeros(value, decimals) {
  let s = value.toFixed(decimals);
  if (s.includes(".")) {
    s = s.replace(/0+$/, "").replace(/\.$/, "");
  }
  return s;
}

export function formatBytes(bytes, options = {}) {
  // 1. bytes must be a finite number >= 0.
  if (typeof bytes !== "number" || !Number.isFinite(bytes) || bytes < 0) {
    throw new TypeError("bytes must be a finite number >= 0");
  }

  const { decimals = 2, binary = false } = options;

  // 2. decimals must be an integer from 0 to 6 inclusive.
  if (!Number.isInteger(decimals) || decimals < 0 || decimals > 6) {
    throw new TypeError("decimals must be an integer from 0 to 6");
  }

  // 3. Base and 4. unit table.
  const units = binary ? BINARY_UNITS : DECIMAL_UNITS;
  const base = binary ? 1024 : 1000;

  // Below the base there are no decimals at all.
  if (bytes < base) {
    return `${bytes} B`;
  }

  // 5. The largest unit whose value is still under the base.
  let value = bytes;
  let index = 0;
  while (value >= base && index < units.length - 1) {
    value /= base;
    index += 1;
  }

  // 6. Round half up, drop trailing zeros; 7. one space separator.
  const number = trimZeros(roundHalfUp(value, decimals), decimals);
  return `${number} ${units[index]}`;
}
