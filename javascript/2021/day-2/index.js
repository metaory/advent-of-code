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
          break;
        case "up":
          acc.depth -= size;
          break;
        case "down":
          acc.depth += size;
          break;
      }
      return acc;
    },
    { horizontal: 0, depth: 0 }
  );
console.log("result:", result);
console.log(result.horizontal * result.depth);
