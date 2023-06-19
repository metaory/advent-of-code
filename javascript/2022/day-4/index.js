import assert from "node:assert";

console.log(global.data);
/*
const lines = global.data
  .split("\n")
  .map((line) => line.split(",").map((x) => x.split("-").map(Number)));
console.log("lines:", lines);
const part = 1;

// [null, f1, f2][part](lines);

function f1(lines) {
  let r = 0;
  lines.forEach(([[a, b], [c, d]]) => {
    if ((a <= c && b >= d) || (c <= a && d >= b)) r++;
  });
  console.log(r);
}

function f2(lines) {
  let r = 0;
  lines.forEach(([[a, b], [c, d]]) => {
    if (!(b < c || d < a)) r++;
  });
  console.log(r);
}
*/

/*
Some of the pairs have noticed that one of their assignments fully contains the other.
For example, 2-8 fully contains 3-7, and 6-6 is fully contained by 4-6.
  In pairs where one assignment fully contains the other,
  one Elf in the pair would be exclusively cleaning sections their partner will already be cleaning,
  so these seem like the most in need of reconsideration. In this example, there are 2 such pairs.

In how many assignment pairs does one range fully contain the other?
_____________
  A      B
 X|Y    X|Y
-------------
 2|4    6|8
 2|3    4|5
 5|7    7|9
 2|8    3|7  <-
 6|6    4|6  ->
 2|6    4|8
=============
 2|9 <- 3|7  |_B_|
 6|6 -> 2|9  |_A_|
=============
.234.....  2-4
.....678.  6-8

.23......  2-3
...45....  4-5

....567..  5-7
......789  7-9

.2345678.  2-8  <--
..34567..  3-7  <--

.....6...  6-6  <--
...456...  4-6  <--

.23456...  2-6
...45678.  4-8

|===> 2 <==*/
const pairsString = global.data.split("\n").filter((x) => x);

const pairs = Object.freeze(
  pairsString.reduce((acc, cur) => [...acc, cur.split(",")], [])
);
console.log("pairs:", pairs);

const overlaps = pairs.reduce((acc, cur, i) => {
  console.log(">>", cur, "::", i);
  const [elfA, elfB] = cur;

  const [elfAx, elfAy] = elfA.split("-"); // 2 4
  const [elfBx, elfBy] = elfB.split("-"); // 6 8

  // Condition for when A contain B.  |_B_|
  if (
    // (elfBx >= elfAx && elfBx <= elfAy && elfBy <= elfAy && elfBy >= elfAx) ||
    // (elfAx >= elfBx && elfAx <= elfBy && elfAy <= elfBy && elfAy >= elfBx)
    (elfBx >= elfAx && elfBy <= elfAy) ||
    (elfAx >= elfBx && elfAy <= elfBy)
  ) {
    acc.push(cur);
  }

  return acc;
}, []);
console.log("overlaps:", overlaps, "=>>", overlaps.length);

// *******************************************************
const _pairs = global.data
  .split("\n")
  .map((pair) =>
    Array.from(pair.split(",").flatMap((range) => range.split("-").map(Number)))
  );

const overlappingElves = _pairs.filter(([lower1, higher1, lower2, higher2]) => {
  return (
    (lower2 >= lower1 && higher2 <= higher1) ||
    (lower1 >= lower2 && higher1 <= higher2)
  );
}).length;
console.log("overlappingElves:", overlappingElves);
// *******************************************************

// assert.strictEqual(2, 2);
