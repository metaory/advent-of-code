import alphabet from "alphabet";

const __log = (...x) => global.debug && console.log(...x);

/* INIT ************************************************************ */
global.h("INIT");
__log(global.data);

/* RENDER ********************************************************** */
function render(matrix) {
  const { length } = matrix.filter(([x]) => x === 0);

  const str = matrix.reduce((acc, [x, y, c], i) => {
    if (y % length === 0) acc += `\n ${global.c.blue(i / length)}`;
    // if (y % length === 0) acc += `\n ${global.c.blue(length - i / length - 1)}`;
    acc += ` [${global.c.green(c)}] `;
    return acc;
  }, "");
  const axis = Array.from({ length })
    .map((x, i) => i)
    .join("    ");
  process.stdout.write(`${str}\n ⸤  ${global.c.blue(axis)}\n`);
  return str;
}

/* PRELIMINARY ***************************************************** */
function parse(data) {
  const raw = data.split("\n");

  const { cmd: commands, mtx } = raw.reduce(
    (acc, cur, i) => {
      // console.log("mtx:", acc.mtx);
      if (cur === "") return acc;
      if (cur.includes("1   2")) return acc;
      if (cur.includes("move")) {
        const [, size, , from, , to] = cur.split(" ");
        acc.cmd.push([size, from, to]);
        return acc;
      }
      acc.mtx.push(cur);
      return acc;
    },
    {
      cmd: new Proxy([], {
        get: (target, property) => target[property],
        set: (obj, prop, value) => {
          if (Array.isArray(value))
            value = value.map(Number).map((x, i) => (i > 0 ? x - 1 : x));
          obj[prop] = value;
          return true;
        },
      }),
      mtx: [],
    }
  );

  const matrix = [];
  for (const [y, line] of mtx.entries()) {
    let x = 0;
    for (const [_x, char] of Array.from(line).entries()) {
      if (_x % 4 === 1) {
        matrix.push([y, x, char]);
        x++;
      }
    }
  }

  return { commands, matrix };
}

/* DECIDE ********************************************************** */
function decide(matrix) {
  return matrix
    .filter(([x, y, c]) => c !== " ")
    .reduce((acc, cur) => {
      const [x, y, c] = cur;
      acc[y] = acc[y] || [];
      acc[y].push(cur);
      return acc;
    }, [])
    .map((x) => x.sort((a, b) => a[0] - b[0]))
    .map((x) => x[0])
    .map(([, , c]) => c)
    .join(" ");
}

/* CONTROL ********************************************************* */
global.h("CONTROL");

const { commands, matrix } = parse(global.data);

__log(commands);
__log("matrix:", matrix);

/* EXECUTE ********************************************************* */
global.h("EXECUTE");
// render(matrix);
for (const [size, from, to] of commands) {
  console.log("move", size, "crates, from", from, "to", to);
  /*
   *  move 1 crates, from 1 to 0
   *  [ 0, 1, 'D' ] --> [ 0, 0, 'D' ]
   * */
  // const slice =
  const slice = matrix.filter((x) => x[1] === from).slice(0, size);
  console.log("slice:", slice);

  render(matrix);
  break;
}

// for (const [size, from, to] of commands) {
// console.log("cmd:", cmd);
// const slice =
// from means matrix[y == from+]
// }

/* LOGS ************************************************************ */

/* RESULT ********************************************************** */
global.h("RESULT");
const result = decide(matrix);
process.stdout.write(`${global.c.grey(" ->")} ${global.c.red(result)}\n`);
