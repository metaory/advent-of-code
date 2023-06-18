import { readFile } from "node:fs/promises";

/*
 * Find the Elf carrying the most Calories.
 *   How many total Calories is that Elf carrying?
 ************************************************/

const input = global.data.split("\n");

const { list } = input.reduce(
  (acc, cur) => {
    if (cur === "") {
      ++acc.index;
      return acc;
    }
    acc.list[acc.index] = acc.list[acc.index] || [];
    acc.list[acc.index].push(cur);
    return acc;
  },
  { list: [], index: 0 }
);
console.log("list:", list);

const sum = (arr) => arr.reduce((acc, cur) => acc + Number(cur), 0);

const result = list
  .reduce((acc, cur) => [...acc, sum(cur)], [])
  .sort((a, b) => b - a);
console.log("result:", result);

const [highest] = result;
console.log("highest:", highest);

/* Find the top three Elves carrying the most Calories.
 * How many Calories are those Elves carrying in total? */
// const topThree = result[0] + result[1] + result[2];
const topThree = Array.from({ length: 3 }).reduce(
  (acc, cur, i) => acc + result[i],
  0
);
