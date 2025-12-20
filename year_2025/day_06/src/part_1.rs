fn solve(contents: &str) -> u64 {
    let lines: Vec<&str> = contents.lines().collect();
    let (operations, lines) = lines.split_last().unwrap();
    let operations: Vec<&str> = operations.split_ascii_whitespace().collect();
    let mut total: Vec<u64> = Vec::with_capacity(operations.len());

    for line in lines {
        for (index, number) in line.split_ascii_whitespace().enumerate() {
            if total.get(index).is_none() {
                total.push(number.parse::<u64>().unwrap());
                continue;
            }

            if operations[index] == "*" {
                total[index] *= number.parse::<u64>().unwrap();
            } else {
                total[index] += number.parse::<u64>().unwrap();
            }
        }
    }

    total.iter().sum()
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
        assert_eq!(result, 4277556);
    }

    #[test]
    fn it_solves_input() {
        let filename = "input";
        let contents = fs::read_to_string(filename).unwrap();
        let result = solve(contents.trim());
        assert_eq!(result, 5316572080628);
    }
}
