import alphabet from "alphabet";

const rucks = global.data.split("\n").filter((x) => x);
console.log("rucks:", rucks);

const occurrences = [];
// const occurrences = new Set();

const priorities = [...alphabet.lower, ...alphabet.upper].reduce(
  (acc, cur, i) => ({ ...acc, [cur]: i + 1 }),
  {}
);
console.log("priorities:", JSON.stringify(priorities));

const { z: groups } = rucks.reduce(
  (acc, cur, i) => {
    if (i > 0 && i % 3 === 0) {
      acc.c++;
    }

    acc.z[acc.c] = acc.z[acc.c] || [];
    acc.z[acc.c].push(cur);
    acc.z[acc.c].sort((a, b) => b.length - a.length);

    return acc;
  },
  { c: 0, z: [] }
);
console.log("groups:", groups, "\n========");

const buckets = [];

for (const [i, group] of groups.entries()) {
  console.log(i, "group:", group);

  for (const char of Array.from(group[0])) {
    const uno = group[1].includes(char);
    const dos = group[2].includes(char);

    if (uno && dos) {
      buckets[i] = buckets[i] || new Set();
      buckets[i].add(char);
    }
  }
}

console.log("buckets:", buckets, buckets.length);

const getScore = (arr) => arr.reduce((acc, cur) => acc + priorities[cur], 0);

const total = buckets.reduce((acc, cur) => acc + getScore([...cur]), 0);
console.log("total:", total);

// const final = Array.from(occurrences).reduce((acc, cur) => acc + priorities[cur], 0);

/////////////////////////////////////////////////////
/////////////////////////////////////////////////////
/////////////////////////////////////////////////////

// for (const item of Array.from(rucks[0])) {
//   const uno = rucks[1].indexOf(item);
//   const dos = rucks[2].indexOf(item);
//   if (uno >= 0 && dos >= 0) {
//     occurrences.add(item);
//   }
// }

/*
[11, 22, 33]
[22, 11, 44]
[33, 22, 11]
 */
