use std::fs;

const NB_BATTERIES: usize = 12;

pub(crate) fn part_2() {
    let filename = "input";
    let contents = fs::read_to_string(filename).expect("Should have been able to read the file");
    let contents = contents.trim();

    let mut total = 0;

    for line in contents.split("\n") {
        // "123" -> [1, 2, 3]
        let digits: Vec<u8> = line.bytes().map(|b| b - b'0').collect();

        let mut selected_digits = [0; NB_BATTERIES];
        let mut last_position = 0;

        for i in 0..NB_BATTERIES {
            // How much numbers I still need
            let still_needed = NB_BATTERIES - i;
            // How much it remains
            let remaining_digits = digits.len() - last_position;

            let window = remaining_digits - still_needed + 1;

            let slice = &digits[last_position..(last_position + window)];

            let (position, digit) = get_max_and_position(slice);
            selected_digits[i] = digit;
            last_position = last_position + position + 1;
        }

        let result: u64 = selected_digits
            .iter()
            .fold(0, |acc, &d| acc * 10 + d as u64);

        total += result;
    }

    println!("total: {}", total);
}

fn get_max_and_position(numbers: &[u8]) -> (usize, u8) {
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

    #[test]
    fn get_max_test_2() {
        let digits = vec![2, 3, 4, 2, 3, 4, 2, 3, 4, 2, 3, 4, 2, 7, 8];
        let result = get_max_and_position(&digits[0..digits.len() - 11]);
        assert_eq!(result, (2, 4));
    }
}
