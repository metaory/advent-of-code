# Advent Of Code

### metaory solutions

### How to run Rust Solutions

[TODO]

### How to run JavaScript Solutions

    git clone git@github.com:metaory/advent-of-code.git
    cd 2022/javascript
    npm install

    node index [day] <basic|input>

### Run a Solution

```bash
  node index # prompt year & day & input type
  node index day_1 # prompt year & day & input type, run day 1
  node index day_2 basic # prompt year & run day 2 with basic input
  node index 2021 day_4 input # run year 2021 day 4 with complete input
  node index 2022 day_4b input # run year 2022 day 4 B with complete input
```

### Scaffold

```bash
year=2022
mkdir $year 2> /dev/null
for i in {1..10}; do
  mkdir ${year}/day-${i} &&
  echo "console.log('hello day ${i} !')" > ${year}/day-${i}/index.js &&
  aoc -y ${year} -d ${i} download -i ${year}/day-${i}/input -p ${year}/day-${i}/puzzle.md;
done
```
