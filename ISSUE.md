# format-bytes prints the wrong thing outside the happy path

`formatBytes` was written for one screen and it shows.

- `formatBytes(1024, { binary: true })` prints `1.00 KiB` - the README says `1 KiB`.
- `formatBytes(1_000_000)` prints `1.00 MB`; the trailing `.00` should not be there.
- `formatBytes(1.005e3, { decimals: 2 })` rounds 1.005 down to `1.00` when the
  README asks for half up.
- Nothing is validated: `formatBytes(-5)` prints `-5 B`, `formatBytes("1024")`
  prints `1024 B`, and `formatBytes(1e21)` runs off the end of the unit table.

The contract is README.md. Make the implementation match it.
