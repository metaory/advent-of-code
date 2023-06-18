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
import alphabet from "alphabet";

const priorities = [...alphabet.lower, ...alphabet.upper].reduce(
  (acc, cur, i) => ({ ...acc, [cur]: i + 1 }),
  {}
);
console.log("priorities:", priorities);

const rucks = global.data.split("\n").filter((x) => x);
console.log("rucks:", rucks);

const final = {};

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
  final[ruck] = duplicates;
}

console.log("final:", final);
const getScore = (arr) => arr.reduce((acc, cur) => acc + priorities[cur], 0);

const scores = Object.keys(final).reduce((acc, cur) => {
  console.log(" >> cur:", cur, final[cur]);
  const score = getScore(final[cur]);
  acc.push(score);
  return acc;
}, []);
console.log("scores:", scores);

const finalScore = scores.reduce((acc, cur) => acc + cur, 0);
console.log("finalScore:", finalScore);
