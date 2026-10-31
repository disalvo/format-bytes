# format-bytes

Turn a byte count into the string a human wants to read.

## `formatBytes(bytes, options)`

`options` is optional: `{ decimals = 2, binary = false }`.

1. `bytes` must be a finite number >= 0. A negative, `NaN`, `Infinity`, a
   numeric string or a missing argument is a `TypeError`.
2. `decimals` must be an integer from 0 to 6 inclusive, otherwise `TypeError`.
3. The base is 1000 by default and 1024 when `binary` is true.
4. Units are `B`, `kB`, `MB`, `GB`, `TB`, `PB` for base 1000 and `B`, `KiB`,
   `MiB`, `GiB`, `TiB`, `PiB` for base 1024. The largest unit is `PB`/`PiB`.
5. The unit is the largest one whose value is still under the base: `999` is
   `999 B` and `1000` is `1 kB`; with `binary`, `1023` is `1023 B` and `1024` is
   `1 KiB`.
6. The number is the scaled value rounded **half up** to `decimals` places, and
   trailing zeros are dropped: `2.00` prints `2`, `1.50` prints `1.5`, and
   `1.005` with two decimals prints `1.01`. Below the base there are no
   decimals at all: a whole byte count prints as an integer.
7. The number and the unit are separated by exactly one space.

## Examples

```js
formatBytes(0);                  // "0 B"
formatBytes(999);                // "999 B"
formatBytes(1500);               // "1.5 kB"
formatBytes(1024, { binary: true });        // "1 KiB"
formatBytes(1_000_000);          // "1 MB"
formatBytes(1_234_567, { decimals: 1 });    // "1.2 MB"
```
