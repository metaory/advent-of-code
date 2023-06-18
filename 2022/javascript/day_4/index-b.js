console.log(">>>");
console.log(global.data);

/*
 * It seems like there is still quite a bit of duplicate work planned.
 * Instead, the Elves would like to know the number of pairs that overlap at all.

In the above example, the first two pairs (2-4,6-8 and 2-3,4-5) don't overlap,
while the remaining four pairs (5-7,7-9, 2-8,3-7, 6-6,4-6, and 2-6,4-8) do overlap:
    5-7,7-9 overlaps in a single section, 7.
    2-8,3-7 overlaps all of the sections 3 through 7.
    6-6,4-6 overlaps in a single section, 6.
    2-6,4-8 overlaps in sections 4, 5, and 6.
  So, in this example, the number of overlapping assignment pairs is XXX: 4
_____________
  A      B
 X|Y    X|Y
-------------
 2|4    8|4
 2|4    6|8
 2|3    4|5
 8|3    3|9
 6|5    2|4


TODO: In how many assignment pairs do the ranges overlap?
 * */

// const data = global.data
//   .split("\n")
//   .filter((x) => x)
//   .map((x) => x.split(","));
// .map((x) => x.split("-"));
// .map(Number);
const pairs = global.data
  .trim()
  .split("\n")
  .map((pair) =>
    Array.from(pair.split(",").flatMap((range) => range.split("-").map(Number)))
  );
console.log("pairs:", pairs);

const clean = pairs.filter(
  ([aX, aY, bX, bY]) => (aX < bX && aY < bX) || (bX < aX && bY < aX)
).length;
console.log("clean:", clean);

const total = pairs.length - clean;
console.log("total:", total);
