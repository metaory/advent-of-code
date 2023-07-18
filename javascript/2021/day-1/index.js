console.log(global.data, "hello day 1 !");

const data = global.data
  .trim()
  .split("\n")
  .map(Number)
  .reduce(
    (acc, cur, i, arr) => {
      if (cur > arr[i - 1]) acc.inc += 1;
      else acc.dec += 1;
      return acc;
    },
    { inc: 0, dec: 0 }
  );
console.log("data:", data);

// 7
