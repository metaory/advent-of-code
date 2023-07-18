console.log("hello day 6 !");
console.log("@#@#");

const checkForUnique = (arr) =>
  arr.reduce((acc, cur, i, arr) => {
    if (arr.indexOf(cur) !== arr.lastIndexOf(cur)) acc = false;
    return acc;
  }, true);

// console.log("??", checkForUnique(["f", "o", "o", "b", "a", "r"]));

// mjqjpqmgbljsphdztnvjfqwrcgsmlb

const result = global.data
  .trim()
  .split("")
  .reduce((acc, cur, i, arr) => {
    const nextSlice = arr.slice(i, i + 4);
    console.log(i, "nextSlice:", nextSlice, checkForUnique(nextSlice));
    return acc;
  }, {});
