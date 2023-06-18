/*  [D]
[N] [C]
[Z] [M] [P] * */
console.log(`
    [D]
[N] [C]
[Z] [M] [P]
`);

const matrix = [
  [0, 0, " "],
  [0, 1, "D"],
  [0, 2, " "],

  [1, 0, "N"],
  [1, 1, "C"],
  [1, 2, " "],

  [2, 0, "Z"],
  [2, 1, "M"],
  [2, 2, "P"],
];

console.log("+++");
render(matrix);

const commands = [
  [1, 2, 1],
  [3, 1, 3],
  [2, 2, 1], // <--\
  [1, 1, 2],
];
const cmd = [2, 2, 1];

const [size, from, to] = cmd;
console.log("move", size, "crates, from x", from, "to x", to);
const slice = matrix
  .filter(([x, y, c]) => y + 1 === from)
  .filter(([x, y, c]) => c !== " ")
  .sort((a, b) => (a[0] === b[0] ? 0 : a[0] < b[0] ? 1 : -1))
  .slice(0, size);

console.log("slice:", slice);

render(matrix);
/* ################################################################# */
/* ****** ********************************************************** */
/* RENDER ********************************************************** */
function render(matrix) {
  const { length } = matrix.filter(([x]) => x === 0);

  const str = matrix.reduce((acc, [x, y, c]) => {
    if (y % length === 0) acc += "\n";
    acc += ` [${c}] `;
    return acc;
  }, "");
  console.log(str);
  return str;
}
