use glob::glob;

#[path = "days/day1.rs"]
mod day1;

fn main() {
    println!("!@!@!");

    day1::solution();

    // for day in glob("src/days/*.rs").unwrap() {
    //     let path = day.unwrap();
    //     println!("day: {:#?}", path);
    //     #[path = path]
    //     mod day1;
    // }
}
