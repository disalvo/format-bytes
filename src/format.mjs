// format-bytes - first cut.

export function formatBytes(bytes, options = {}) {
  const { decimals = 2, binary = false } = options;
  const units = binary ? ["B", "KiB", "MiB", "GiB"] : ["B", "kB", "MB", "GB"];
  const base = binary ? 1024 : 1000;
  if (bytes < base) return `${bytes} B`;
  let value = bytes;
  let index = 0;
  while (value >= base && index < units.length - 1) {
    value = value / base;
    index += 1;
  }
  return `${value.toFixed(decimals)} ${units[index]}`;
}
