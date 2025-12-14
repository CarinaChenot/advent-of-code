use std::fs;

pub(crate) fn part_1() {
    let filename = "input";
    let contents = fs::read_to_string(filename).expect("Should have been able to read the file");
    let contents = contents.trim();

    let mut total = 0;

    for line in contents.split("\n") {
        let digits: Vec<u32> = line.chars().map(|c| c.to_digit(10).unwrap()).collect();

        // Find the first max number of the list, excluding last number
        let (first_position, first_digit) = get_max_and_position(&digits[0..digits.len() - 1]);

        // Find the second max number of the list, starting from first number position
        let (_, second_digit) = get_max_and_position(&digits[first_position + 1..]);

        let result = format!("{}{}", first_digit, second_digit)
            .parse::<u32>()
            .unwrap();

        total += result;
    }

    println!("{}", total);
}

fn get_max_and_position(numbers: &[u32]) -> (usize, u32) {
    let mut max = 0;
    let mut position = 0;

    for (i, el) in numbers.iter().enumerate() {
        if el > &max {
            position = i;
            max = *el;
        }
    }

    (position, max)
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn get_max_test() {
        let result = get_max_and_position(&[2, 2, 9, 8]);
        assert_eq!(result, (2, 9));
    }
}
