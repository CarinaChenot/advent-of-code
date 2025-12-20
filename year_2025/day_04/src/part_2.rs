const ROLL_CHAR: u8 = b'@';

fn solve(contents: &str) -> u64 {
    let n = contents.lines().next().unwrap().len(); // Assuming square grid
    let stride = n + 1; // +1 for '\n'

    let mut bytes: Vec<u8> = contents.bytes().collect();
    let mut can_be_accessed = 0;
    let mut accessed_last_round = 1;

    while accessed_last_round > 0 {
        accessed_last_round = 0;

        for i in 0..bytes.len() {
            let c = bytes[i];

            if c != ROLL_CHAR {
                continue;
            }

            let row = i / stride;
            let col = i % stride;

            let mut neighbors: Vec<u8> = Vec::with_capacity(8);

            // left
            if row > 0 {
                neighbors.push(bytes[(row - 1) * stride + col]);
            }

            // right
            if row + 1 < n {
                neighbors.push(bytes[(row + 1) * stride + col]);
            }

            // top
            if col > 0 {
                neighbors.push(bytes[row * stride + (col - 1)]);
            }

            // bottom
            if col + 1 < n {
                neighbors.push(bytes[row * stride + (col + 1)]);
            }

            // top-left
            if row > 0 && col > 0 {
                neighbors.push(bytes[(row - 1) * stride + (col - 1)]);
            }

            // top-right
            if row > 0 && col + 1 < n {
                neighbors.push(bytes[(row - 1) * stride + (col + 1)]);
            }

            // bottom-left
            if row + 1 < n && col > 0 {
                neighbors.push(bytes[(row + 1) * stride + (col - 1)]);
            }

            // bottom-right
            if row + 1 < n && col + 1 < n {
                neighbors.push(bytes[(row + 1) * stride + (col + 1)]);
            }

            // Less than 4 rolls
            if neighbors.iter().filter(|&&c| c == ROLL_CHAR).count() < 4 {
                accessed_last_round += 1;
                can_be_accessed += 1;
                bytes[i] = b'.';
            }
        }
    }

    can_be_accessed
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
        assert_eq!(result, 43);
    }

    #[test]
    fn it_solves_input() {
        let filename = "input";
        let contents = fs::read_to_string(filename).unwrap();
        let result = solve(contents.trim());
        assert_eq!(result, 8665);
    }
}
