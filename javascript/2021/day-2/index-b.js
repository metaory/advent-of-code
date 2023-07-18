console.log(global.data);

const result = global.data
  .trim()
  .split("\n")
  .reduce(
    (acc, cur) => {
      const [action, _size] = cur.split(" ");
      const size = Number(_size);
      switch (action) {
        case "forward":
          acc.horizontal += size;
          acc.depth += acc.aim * size;
          break;
        case "up":
          acc.aim -= size;
          break;
        case "down":
          acc.aim += size;
          break;
      }
      return acc;
    },
    { horizontal: 0, depth: 0, aim: 0 }
  );
console.log("result:", result);
console.log(result.horizontal * result.depth);
