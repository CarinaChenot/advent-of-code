fn solve(contents: &str) -> u64 {
    let mut parts = contents.split("\n\n");

    let part1 = parts.next().unwrap();
    let part2 = parts.next().unwrap();

    let mut total = 0;

    let fresh_ranges = part1
        .lines()
        .map(|line| {
            let mut nums = line.split('-').map(|num| num.parse::<u64>().unwrap());
            let start = nums.next().unwrap();
            let end = nums.next().unwrap();
            (start, end)
        })
        .collect::<Vec<(u64, u64)>>();

    for line in part2.lines() {
        let num = line.parse::<u64>().unwrap();

        for (start, end) in &fresh_ranges {
            if num >= *start && num <= *end {
                total += 1;
                break;
            }
        }
    }

    total
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
        assert_eq!(result, 3);
    }

    #[test]
    fn it_solves_input() {
        let filename = "input";
        let contents = fs::read_to_string(filename).unwrap();
        let result = solve(contents.trim());
        assert_ne!(result, 489);
        assert_ne!(result, 659);
        assert_eq!(result, 511);
    }
}
