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

const startTime = performance.now();

const [, , day, arg] = process.argv;
let _day = day;
if (!day) {
  const days = (await readdir("./")).filter((x) => x.startsWith("day_"));
  const answer = await select({
    message: "Select a day",
    choices: days.map((x) => ({ value: x, description: `Solutions Day ${x}` })),
  });
  _day = answer;
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

const dayPath = _day.endsWith("b") ? _day.substring(0, day.length - 1) : _day;

global.data = await readFile(`./${dayPath}/${inputType}.txt`, {
  encoding: "utf8",
});

const suffix = _day.endsWith("b") ? "-b" : "";

const file = await import(`./${dayPath}/index${suffix}.js`);

global.h("  ", "╸");

const endTime = Number((performance.now() - startTime).toFixed(1));
console.log(global.c.grey(" ⏱ "), endTime, "ms");
