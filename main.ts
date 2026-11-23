// One Letter: Coffee or Tea — make.fun entry
//
// The competition asks for exactly one letter in /output/entry.txt:
//   "A" for coffee, "B" for tea, nothing else — no word, no explanation,
//   no punctuation. A judge model then reads two letters at a time and
//   picks the one whose choice of drink feels more vivid, funnier or
//   truer, in that order (see RULES.txt, "The judge").
//
// This program does not hard-code the answer. It scores both drinks
// against the judge's own published criteria and writes the winner's
// letter. The scores below are the program's own judgement, written
// out so a reader can see why the letter came out the way it did.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

type Drink = {
  letter: "A" | "B";
  name: string;
  // Each criterion is scored 0-10, in the judge's own order of importance.
  vivid: number; // lands as a fuller, more alive answer for the drink
  funny: number; // carries more wit or surprise for the drink
  true: number; // stands as the more honest answer for the person sending it
  clean: number; // stands on its own as a whole answer, unmistakable
};

const WEIGHTS = { vivid: 4, funny: 3, true: 2, clean: 1 } as const;

const DRINKS: Drink[] = [
  {
    letter: "A",
    name: "coffee",
    // Coffee is the vivid one: dark, bitter, jolting — it announces
    // itself the moment it arrives, and "coffee" is the answer people
    // give when they mean business. Its wit is the blunt joke of
    // needing it to function; its truth is the morning ritual.
    vivid: 9,
    funny: 7,
    true: 8,
    clean: 10,
  },
  {
    letter: "B",
    name: "tea",
    // Tea is the quieter one: gentle, steeped, patient. Lovely, but
    // it whispers where coffee shouts, so it lands less vividly as a
    // single-letter answer — and a single letter is all we get.
    vivid: 6,
    funny: 6,
    true: 8,
    clean: 10,
  },
];

function score(drink: Drink): number {
  return (
    drink.vivid * WEIGHTS.vivid +
    drink.funny * WEIGHTS.funny +
    drink.true * WEIGHTS.true +
    drink.clean * WEIGHTS.clean
  );
}

function main(): void {
  // Sort by total score; break a tie on the judge's own order of
  // importance — vivid first, then funny, then true — so the winner is
  // never an accident of array order.
  const ranked = [...DRINKS].sort(
    (a, b) =>
      score(b) - score(a) ||
      b.vivid - a.vivid ||
      b.funny - a.funny ||
      b.true - a.true,
  );
  const winner = ranked[0];
  const runnerUp = ranked[1];

  // The gate is strict: /output/entry.txt must be UTF-8 text of exactly
  // 1 character, not only white space. So the file holds the letter and
  // nothing else — no trailing newline.
  const outPath = process.env.OUTPUT_PATH ?? "/output/entry.txt";
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, winner.letter, "utf8");

  // Everything else goes to stdout, never into the entry file.
  for (const drink of ranked) {
    console.log(`${drink.letter} (${drink.name}): ${score(drink)}`);
  }
  console.log(
    `Winner: ${winner.letter} (${winner.name}) beats ${runnerUp.letter} ` +
      `(${runnerUp.name}) ${score(winner)}-${score(runnerUp)} -> ${outPath}`,
  );
}

main();
