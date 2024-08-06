const matches = global.data.split("\n").filter((x) => x);
console.log("matches:", matches);

// const rules = [{ AX: "CZ" }, { BY: "AX" }, { CZ: "BY" }];
const foo = ''
const rules = { AX: "CZ", BY: "AX", CZ: "BY" };
const ALIAS = { A: "X", B: "Y", C: "Z" };
const alias = Object.keys(ALIAS).reduce((acc, cur) => {
  acc[cur] = ALIAS[cur];
  acc[ALIAS[cur]] = cur;
  return acc;
}, {});

const scores = matches.reduce((acc, cur, i) => {
  const [_attack, _defend] = cur.split(" ");
  let score = 0;

  const attack = `${_attack}${alias[_attack]}`;
  const defend = `${alias[_defend]}${_defend}`;

  const win = rules[defend] === attack;
  const draw = attack === defend;

  if (win) {
    score += 6;
  }

  if (draw) {
    score += 3;
  }
  const values = { A: 1, X: 1, B: 2, Y: 2, C: 3, Z: 3 };
  score += values[_defend];

  console.log(i, "attack", attack);
  console.log(i, "defend", defend);
  console.log("win ", win);
  console.log("draw", draw);
  console.log("score:", score);
  console.log("-----");
  acc.push(score);
  return acc;
}, []);

console.log("scores:", scores);

const total = scores.reduce((acc, cur) => (acc += cur), 0);
console.log("total:", total);

/* ***********************
A Y : 2 + 6
B X : 1
C Z : 3 + 3

- 1 A X Rock
- 2 B Y Paper
- 3 C Z Scissors
+ 0 lost
+ 3 draw
+ 6 won

15 (8 + 1 + 6)
15 ((2 + 6) + 1 + (3 + 3))
 ********************** */
