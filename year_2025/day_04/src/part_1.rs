const ROLL_CHAR: char = '@';

fn solve(contents: &str) -> u64 {
    let lines: Vec<&str> = contents.split("\n").collect();
    let mut y = 0;
    let mut can_be_accessed = 0;

    for line in &lines {
        for (x,c) in line.char_indices() {
            // If cell is a ., ignore it
            if c != ROLL_CHAR {
                continue;
            }

            // X axis
            let left = if x == 0 { '.' } else { line.chars().nth(x-1).unwrap()};
            let right = if x == line.len() - 1 { '.' } else {line.chars().nth(x+1).unwrap()};
            let top = if y == 0 { '.' } else {lines[y-1].chars().nth(x).unwrap()};
            let bottom = if y == lines.len() - 1 {'.' } else {lines[y+1].chars().nth(x).unwrap()};

            // Diagonal axis
            let top_left = if x == 0 || y == 0 { '.' } else {lines[y-1].chars().nth(x-1).unwrap()};
            let top_right = if x == line.len() - 1 || y == 0 { '.' } else {lines[y-1].chars().nth(x+1).unwrap()};
            let bottom_left = if x == 0 || y == lines.len() - 1 { '.' } else {lines[y+1].chars().nth(x-1).unwrap()};
            let bottom_right = if x == line.len() - 1 || y == lines.len() - 1 { '.' } else {lines[y+1].chars().nth(x+1).unwrap()};

            let neighbors = [left, right, top, bottom, top_left, top_right, bottom_left, bottom_right];

            let count_rolls = neighbors.iter().filter(|&&c| c == ROLL_CHAR).count();

            if count_rolls < 4 {
                can_be_accessed += 1;
            }
        }

        y += 1;
    }

    can_be_accessed
}

#[cfg(test)]
mod tests {
    use crate::part_1::solve;
    use std::fs;

    #[test]
    fn it_solves_example() {
        let filename = "example";
        let contents = fs::read_to_string(filename).unwrap();
        let result = solve(contents.trim());
        assert_eq!(result, 13);
    }

    #[test]
    fn it_solves_input() {
        let filename = "input";
        let contents = fs::read_to_string(filename).unwrap();
        let result = solve(contents.trim());
        assert_eq!(result, 1518);
    }
}
