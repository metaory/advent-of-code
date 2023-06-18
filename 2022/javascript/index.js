import { readFile, readdir, stat } from "node:fs/promises";
// import select from "@inquirer/select";
import select, { Separator } from "@inquirer/select";
import chalk from "chalk";

global.c = chalk;
global.debug = process.env["ENV"] === "debug";

const fill = (char = ".", length = process.stdout.columns) =>
  global.c.black(Array.from({ length }).fill(char).join(""));

global.h = (str, char = "━") => {
  const len = process.stdout.columns - str.length - 4;
  process.stdout.write("\n");
  process.stdout.write(`${fill(char, 2)} ${global.c.cyan(str)} `);
  process.stdout.write(fill(char, len));
  process.stdout.write("\n\n");
};

const checkFile = async (path) => {
  try {
    await stat(path);
    return true;
  } catch (error) {
    return false;
  }
};

const days = await (
  await readdir("./")
)
  .filter((x) => x.startsWith("day_"))
  .reduce(async (acc, cur) => {
    acc = await acc;

    const aStat = await checkFile(`./${cur}/index.js`);
    aStat && acc.push(cur);

    const bStat = await checkFile(`./${cur}/index-b.js`);
    bStat && acc.push(`${cur}-b`);

    return acc;
  }, []);

const [, , _day, arg] = process.argv;
const day =
  _day ||
  (await select({
    message: "Select a day",
    choices: days.map((x) => ({ value: x, description: `Solutions Day ${x}` })),
  }));

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

const [dayDir] = day.split("-");

global.data = await readFile(`./${dayDir}/${inputType}.txt`, {
  encoding: "utf8",
});

const suffix = day.endsWith("b") ? "-b" : "";

const startTime = performance.now();

const file = await import(`./${dayDir}/index${suffix}.js`);

const endTime = Number((performance.now() - startTime).toFixed(1));

global.h("  ", "╸");

console.log(global.c.grey(" ⏱ "), endTime, "ms");
