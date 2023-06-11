/*
 * Every item type is identified by a single lowercase or uppercase letter
 *    (that is, a and A refer to different types of items).
 *
 * The list of items for each rucksack is given as characters all on a single line.
A given rucksack always has the same number of items in each of its two compartments,
    so the first half of the characters represent items in the first compartment,
    while the second half of the characters represent items in the second compartment.

For example, suppose you have the following list of contents from six rucksacks:

vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw

 * */

import { readFile } from "node:fs/promises";
import alphabet from "alphabet";

console.clear();
const scores = [...alphabet.lower, ...alphabet.upper].reduce((acc, cur, i) => {
  acc[cur] = i + 1;
  return acc;
}, {});

console.log("scores:", scores);

process.exit();

const dataFile = process.argv[2];

if (!dataFile) {
  console.error("NO DATA FILE PASSED!");
  process.exit(1);
}

const data = await readFile(`./days-js/${dataFile}`, {
  encoding: "utf8",
});
const rucks = data.split("\n").filter((x) => x);
console.log("rucks:", rucks);

for (const [i, ruck] of rucks.entries()) {
  const len = ruck.length;
  const left = ruck.slice(0, len / 2);
  const right = ruck.slice(len / 2, len);

  console.log(left, "<=|=>", right);

  const leftArray = Array.from(left).entries();
  const rightArray = Array.from(right).entries();

  const occurrences = {};
  const duplicates = [];

  for (const [j, item] of leftArray) {
    console.log(j, "left:", item);

    if (!occurrences[item]) {
      occurrences[item] = 0;
    }
    occurrences[item]++;
  }
  for (const [j, item] of rightArray) {
    console.log(j, "right:", item);

    if (occurrences[item] && duplicates.indexOf(item)) {
      duplicates.push(item);
    }
  }
  console.log("duplicates:", duplicates);
  console.log("occurrences:", occurrences);
}
