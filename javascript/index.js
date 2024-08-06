import { readFile, readdir, stat } from "node:fs/promises";
import select from "@inquirer/select";
import chalk from "chalk";

global.c = chalk;
global.debug = process.env["ENV"] === "debug";

const [, , _year, _day, arg] = process.argv;
const foo = ''
const fileNotFound = (path) => {
  console.error(global.c.yellow(path), global.c.red("doesnt exist"));
  process.exit(1);
};

const fill = (char = ".", length = process.stdout.columns) =>
  global.c.black(Array.from({ length }).fill(char).join(""));

global.h = (str, char = "━") => {
  const len = process.stdout.columns - str.length - 4;
  process.stdout.write("\n");
  process.stdout.write(`${fill(char, 2)} ${global.c.cyan(str)} `);
  process.stdout.write(fill(char, len));
  process.stdout.write("\n\n");
};

const catchFileNotFound = (path) => stat(path).catch(fileNotFound);

const prompt = (list, message) =>
  select({ message, choices: list.map((value) => ({ value })) });

const years = (await readdir("./")).filter((x) => !isNaN(x));

const year = _year || (await prompt(years, "Select a year"));

catchFileNotFound(`./${year}/`);

const days = (await readdir(`./${year}/`)).filter((x) => x.startsWith("day-"));

const day = _day || (await prompt(days, "Select a day"));

// days.includes(day) || fileNotFound(day);

const [dayDir] = day.split("b");

const dayPath = `./${year}/${dayDir}`;
const inputs = (await readdir(dayPath)).filter((x) => !x.includes("."));

const input = arg || (await prompt(inputs, "Select Input Type"));

const dataPath = `./${year}/${dayDir}/${input}`;
catchFileNotFound(dataPath);

global.data = await readFile(dataPath, { encoding: "utf8" });

const suffix = day.endsWith("b") ? "-b" : "";

const filePath = `./${year}/${dayDir}/index${suffix}.js`;
catchFileNotFound(filePath);

process.stdout.write(global.data);

const startTime = performance.now();

await import(filePath);

const endTime = Number((performance.now() - startTime).toFixed(1));

global.h("· · ·", "╸");

console.log(global.c.grey(" ⏱ "), endTime, "ms");
