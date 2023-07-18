/*
199  A
200  A B
208  A B C
210    B C D
200  E   C D
207  E F   D
240  E F G
269    F G H
260      G H
263        H
  * */
const z = [
  [199, 200, 208],
  [200, 208, 210],
];
console.log("___");
console.log(global.data);
const windows = global.data
  .trim()
  .split("\n")
  .map(Number)
  .reduce(
    (acc, cur, i) => {
      // acc.a[acc.c] = acc.a[acc.c] || [];
      // acc.a[acc.c].push(cur);
      const c = (i % 3) + 1;
      acc.a[c] = acc.a[c] || [];
      // const _i = Math.floor(i / 3);
      console.log(i, cur, ">>", c);
      switch (c) {
        case 1:
          acc.a[c].push(cur);
          break;

        default:
          break;
      }
      if (i % 3 === 2) acc.c++;
      return acc;
    },
    { a: [], c: 0 }
  );

console.log("windows:", windows);
const numbers = global.data.trim().split("\n").map(Number);
let counter = 0;
for (let i = 1; i < numbers.length - 2; i++) {
  const a = numbers.slice(i - 1, i + 2).reduce((a, b) => a + b);
  const b = numbers.slice(i, i + 3).reduce((a, b) => a + b);

  if (b > a) {
    counter++;
  }
}
console.log("counter:", counter);
