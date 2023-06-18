import { readFile, readdir } from "node:fs/promises";
// import select from "@inquirer/select";
import select, { Separator } from "@inquirer/select";
import chalk from "chalk";

global.c = chalk;
global.debug = process.env["ENV"] === "debug";

const fill = (char = ".", length = process.stdout.columns) =>
  global.c.black(Array.from({ length }).fill(char).join(""));

global.h = (str, char = "━") => {
  if (!global.debug) return;
  const len = process.stdout.columns - str.length - 4;
  process.stdout.write("\n");
  process.stdout.write(`${fill(char, 2)} ${global.c.cyan(str)} `);
  process.stdout.write(fill(char, len));
  process.stdout.write("\n\n");
};

const days = (await readdir("./"))
  .filter((x) => x.startsWith("day_"))
  .reduce((acc, cur) => {
    acc.push(cur);
    acc.push(`${cur}b`);
    return acc;
  }, []);

const [, , _day, arg] = process.argv;
const day =
  _day ||
  (await select({
    message: "Select a day",
    choices: days.map((x) => ({ value: x, description: `Solutions Day ${x}` })),
  }));
//

if (days.includes(day) === false) {
  console.error(global.c.yellow(day), "doesnt exist");
  process.exit(1);
}

const inputType =
  arg ||
  (await select({
    message: "Select Input Type",
    choices: [
      { name: "basic", value: "basic", description: "basic input data" },
      { name: "input", value: "input", description: "complete input data" },
    ],
  }));

const dayPath = day.endsWith("b") ? day.substring(0, day.length - 1) : day;

global.data = await readFile(`./${dayPath}/${inputType}.txt`, {
  encoding: "utf8",
});

const suffix = day.endsWith("b") ? "-b" : "";

const startTime = performance.now();

const file = await import(`./${dayPath}/index${suffix}.js`);

global.h("  ", "╸");

const endTime = Number((performance.now() - startTime).toFixed(1));
console.log(global.c.grey(" ⏱ "), endTime, "ms");
