import { readFile, readdir, stat } from "node:fs/promises";
// import select from "@inquirer/select";
import select, { Separator } from "@inquirer/select";
import chalk from "chalk";

global.c = chalk;
global.debug = process.env["ENV"] === "debug";

const [, , _year, _day, arg] = process.argv;

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

const year =
  _year ||
  (await select({
    message: "Select a year",
    choices: (
      await readdir("./")
    )
      .filter((x) => !isNaN(x))
      .map((value) => ({
        value,
        description: `Solutions year ${value}`,
      })),
  }));

const days = await (
  await readdir(`./${year}/`)
)
  .filter((x) => x.startsWith("day-"))
  .reduce(async (acc, cur) => {
    acc = await acc;

    (await checkFile(`./${year}/${cur}/index.js`)) && acc.push(cur);

    (await checkFile(`./${year}/${cur}/index-b.js`)) && acc.push(`${cur}b`);

    return acc;
  }, []);

const day =
  _day ||
  (await select({
    message: "Select a day",
    choices: days.map((value) => ({
      value,
      description: `Solutions Day ${value}`,
    })),
  }));

if (days.includes(day) === false) {
  console.error(global.c.yellow(day), "doesnt exist");
  process.exit(1);
}

const [dayDir] = day.split("b");

const inputs = (await readdir(`./${year}/${dayDir}`)).filter(
  (x) => !x.includes(".")
);

const input =
  arg ||
  (await select({
    message: "Select Input Type",
    choices: inputs.map((x) => ({ value: x })),
  }));

const dataPath = `./${year}/${dayDir}/${input}`;

if ((await checkFile(dataPath)) === false) {
  console.error(global.c.yellow(dataPath), "doesnt exist");
  process.exit(1);
}

global.data = await readFile(dataPath, { encoding: "utf8" });

const suffix = day.endsWith("b") ? "-b" : "";

const filePath = `./${year}/${dayDir}/index${suffix}.js`;

if ((await checkFile(filePath)) === false) {
  console.error(global.c.yellow(filePath), "doesnt exist");
  process.exit(1);
}

const startTime = performance.now();

await import(filePath);

const endTime = Number((performance.now() - startTime).toFixed(1));

global.h("· · ·", "╸");

console.log(global.c.grey(" ⏱ "), endTime, "ms");
