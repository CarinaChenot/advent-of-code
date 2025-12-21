fn solve(contents: &str) -> u64 {
    let mut transposed: Vec<String> = Vec::with_capacity(contents.lines().count());
    let mut operators: Vec<char> = Vec::new();

    for line in contents.lines() {
        for (index, char) in line.chars().enumerate() {
            if transposed.get(index).is_none() {
                transposed.push(char.to_string());
                continue;
            }

            if char == '+' || char == '*' {
                operators.push(char);
                continue;
            }

            if char == ' ' {
                continue;
            }

            transposed[index] += char.to_string().as_str();
        }
    }

    let mut total: u64 = 0;
    let mut index: usize = 0;
    let mut product: u64 = 1;

    for element in transposed {
        if element.trim().is_empty() {
            index += 1;

            if product > 1 {
                total += product;
                product = 1;
            }

            continue;
        }

        if operators[index] == '+' {
            total += element.trim().parse::<u64>().unwrap();
        } else {
            product *= element.trim().parse::<u64>().unwrap();
        }
    }

    total
}

#[cfg(test)]
mod tests {
    use crate::part_2::solve;
    use std::fs;

    #[test]
    fn it_solves_example() {
        let filename = "example";
        let contents = fs::read_to_string(filename).unwrap();
        let result = solve(contents.trim());
        assert_eq!(result, 3263827);
    }

    #[test]
    fn it_solves_input() {
        let filename = "input";
        let contents = fs::read_to_string(filename).unwrap();
        let result = solve(contents.trim());
        assert_ne!(result, 61513154530343601);
        assert_eq!(result, 11299263623062);
    }
}
