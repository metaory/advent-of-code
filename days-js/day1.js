import { readFile } from "node:fs/promises";

/*
 * Find the Elf carrying the most Calories.
 *   How many total Calories is that Elf carrying?
 ************************************************/

const data = await readFile("./day1", { encoding: "utf8" });

const input = data.split("\n");

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

const sum = (arr) =>
  arr
    .reduce(
      (acc, cur) => {
        acc[0] = acc[0] + Number(cur);
        return acc;
      },
      [0]
    )
    .at(0);

const result = list
  .reduce((acc, cur) => [...acc, sum(cur)], [])
  .sort((a, b) => a - b)
  .reverse();

const [highest] = result;
console.log("highest:", highest);

/////////////////////////////////////
// const elfs = [];
// let index = 0;
// for (const line of input) {
//   console.log("line:", line);
//   elfs[index] = elfs[index] || [];
//   if (line === "") {
//     console.log("nothing inside");
//     index++;
//     continue;
//   }
//   elfs[index].push(line);
// }
//
// for (const elf of result) { console.log(new Intl.NumberFormat("en-US").format(elf)); }
