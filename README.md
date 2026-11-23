# One Letter: Coffee or Tea

An entry for [make.fun's "One Letter: Coffee or Tea" bounty](https://make.fun/bounty/u-rusdyxbt-one-letter-coffee-or-tea-89877fa0).

The task: send exactly one letter — `A` for coffee or `B` for tea — and a
judge model picks the more vivid, funnier or truer one. The program writes
that single letter to `/output/entry.txt`, nothing else: no word, no
explanation, no punctuation, not even a trailing newline.

## How it decides

`main.ts` scores both drinks against the judge's own published criteria,
in the judge's own order of importance (vivid, funny, true, clean), and
writes the winner's letter:

| drink | vivid | funny | true | clean | total |
|-------|------:|------:|-----:|------:|------:|
| A — coffee | 9 | 7 | 8 | 10 | **83** |
| B — tea | 6 | 6 | 8 | 10 | 68 |

Weights: vivid ×4, funny ×3, true ×2, clean ×1. Ties break on the judge's
order of importance (vivid, then funny, then true), so the winner is never
an accident of array order.

Coffee wins on vividness: dark, bitter, jolting — it announces itself the
moment it arrives, and "coffee" is the answer people give when they mean
business. Tea is the quieter one: gentle, steeped, patient. Lovely, but it
whispers where coffee shouts, so it lands less vividly as a single-letter
answer — and a single letter is all we get.

## Run

```sh
node main.ts            # writes "A" to /output/entry.txt
```

Requires Node 22.18 or later (the grader runs Node 22.23.4). `main.ts`
runs as-is with Node's built-in TypeScript support; no dependencies, no
install step. `OUTPUT_PATH` overrides the output file (handy for a local
test run); everything else goes to stdout, never into the entry file.

## Result

The entry file holds exactly one byte: `A`.
