const matches = global.data.split("\n").filter((x) => x);
console.log("matches:", matches, "\n---");

// const rules = { AX: "CZ", BY: "AX", CZ: "BY" };
const rules = { A: "Y", B: "Z", C: "X" };

const scores = matches.reduce((acc, cur) => {
  const [_attack, _defend] = cur.split(" ");
  let score = 0;

  console.log("cur:", cur);
  console.log("_attack:", _attack);
  console.log("_defend:", _defend);

  // const values = { X: 1, Y: 2, Z: 3 };
  const values = { A: 1, X: 1, B: 2, Y: 2, C: 3, Z: 3 };
  // const values = { A: 1, B: 2, C: 3 };
  // score += values[_defend];
  const X = {
    // Who lose to key
    lose: { A: "Z", B: "X", C: "Y" },

    // Who wins key
    win: { A: "Y", B: "Z", C: "X" },
  };

  switch (_defend) {
    case "X": // Lose
      score += 0;
      score += values[X.lose[_attack]];
      break;
    case "Y": // Draw
      score += 3;
      score += values[_attack];
      break;
    case "Z": // Win
      score += 6;
      score += values[X.win[_attack]];
      break;
  }
  console.log("score:", score);
  console.log("-----------------");
  acc.push(score);
  return acc;
}, []);

console.log("scores:", scores);

const total = scores.reduce((acc, cur) => (acc += cur), 0);
console.log("total:", total);

/* ***
 * X lose , A Y , A X Rock
 * Y draw , B X , B Y Paper
 * Z win  , C Z , C Z Scissors
 * ----
 * total score of 12.
 * what would your total score be
 * if everything goes exactly according
 * *** */
