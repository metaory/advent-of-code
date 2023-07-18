const data = global.data.trim().split("\n");

const MostCommon = (arr) => {
  const zeros = arr.filter((x) => x === 0).length;
  const ones = arr.filter((x) => x === 1).length;
  return ones >= zeros ? 1 : 0;
};

const gammaRate = data
  .reduce((acc, cur, i) => {
    const length = cur.length;
    for (const [j] of Array.from({ length }).entries()) {
      acc[j] = acc[j] || [];
      acc[j].push(cur[j]);
    }
    return acc;
  }, [])
  .map((x) => x.map(Number))
  .map((x) => x.sort())
  .map(MostCommon)
  .join("");

String.prototype.reverse = function () {
  return Array.from(this)
    .map((x) => (x === "1" ? "0" : "1"))
    .join("");
};

const gammaRateInt = parseInt(gammaRate, 2);

console.log("gamma:", global.c.red(gammaRate));
console.log("gamma:", global.c.green(gammaRateInt));
console.log();

const epsilonRate = gammaRate.reverse();
const epsilonRateInt = parseInt(epsilonRate, 2);

console.log("epsil:", global.c.red(epsilonRate));
console.log("epsil:", global.c.green(epsilonRateInt));
console.log();

const final = gammaRateInt * epsilonRateInt;
console.log("final:", global.c.red(final));
