// format-bytes - follows the README contract.

const UNITS = {
  1000: ["B", "kB", "MB", "GB", "TB", "PB"],
  1024: ["B", "KiB", "MiB", "GiB", "TiB", "PiB"],
};

// Round `value` half up to `decimals` places, returning a number (trailing
// zeros in the decimal representation are not retained by JS numbers).
function roundHalfUp(value, decimals) {
  const factor = 10 ** decimals;
  return Math.round((value + Number.EPSILON) * factor) / factor;
}

export function formatBytes(bytes, options = {}) {
  // Rule 1: bytes must be a finite number >= 0.
  if (typeof bytes !== "number" || !Number.isFinite(bytes) || bytes < 0) {
    throw new TypeError("bytes must be a finite number >= 0");
  }

  const { decimals = 2, binary = false } = options;

  // Rule 2: decimals must be an integer from 0 to 6 inclusive.
  if (!Number.isInteger(decimals) || decimals < 0 || decimals > 6) {
    throw new TypeError("decimals must be an integer from 0 to 6");
  }

  // Rule 3 & 4: base and unit table.
  const base = binary ? 1024 : 1000;
  const units = UNITS[base];

  // Rule 5: pick the largest unit whose scaled value is still under the base,
  // clamped to the largest unit (PB/PiB).
  let value = bytes;
  let index = 0;
  while (value >= base && index < units.length - 1) {
    value /= base;
    index += 1;
  }

  // Rule 6: below the base, a whole byte count prints as an integer; otherwise
  // round half up and drop trailing zeros.
  const number = index === 0 ? String(value) : String(roundHalfUp(value, decimals));

  // Rule 7: exactly one space between number and unit.
  return `${number} ${units[index]}`;
}
