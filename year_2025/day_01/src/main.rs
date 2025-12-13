use std::fs;

fn main() {
    let filename = "input";
    let contents = fs::read_to_string(filename).expect("Should have been able to read the file");

    let mut pointer: i32 = 50;
    let mut nb_of_times_zero: u32 = 0;

    for line in contents.split("\n") {
        if line.len() == 0 {
            break;
        }

        let (direction, number) = line.split_at(1);
        let direction: char = direction.chars().next().unwrap();
        let number: i32 = number.parse().unwrap();

        if direction == 'L' {
            pointer = (pointer - number).rem_euclid(100)
        } else if direction == 'R' {
            pointer = (pointer + number) % 100
        }

        if pointer == 0 {
            nb_of_times_zero += 1
        }
    }

    println!("{}", nb_of_times_zero)
}
