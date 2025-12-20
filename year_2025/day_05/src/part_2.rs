fn solve(contents: &str) -> u64 {
    let mut ranges: Vec<(u64, u64)> = contents
        .split("\n\n")
        .next()
        .unwrap()
        .lines()
        .map(|line| {
            let (start, end) = line.split_once('-').unwrap();
            (start.parse::<u64>().unwrap(), end.parse::<u64>().unwrap())
        })
        .collect();

    ranges.sort_by_key(|start| start.0);

    let mut merged_ranges: Vec<(u64, u64)> = Vec::new();

    for (start, end) in ranges {
        if merged_ranges.is_empty() {
            merged_ranges.push((start, end));
            continue;
        }

        let last = merged_ranges.last_mut().unwrap();

        // Check if the current range is right after the last range
        if last.1 + 1 == start {
            last.1 = end;
            println!(
                "Extending last range to the right to ({}, {})",
                last.0, last.1
            );
            continue;
        }

        // Check if the current range is right before the last range
        if end + 1 == last.0 {
            last.0 = start;
            println!(
                "Extending last range to the left to ({}, {})",
                last.0, last.1
            );
            continue;
        }

        // Check if the current range is already included in the last range
        if start >= last.0 && end <= last.1 {
            println!("Skipping ({}, {}) as it’s already included", start, end);
            continue;
        }

        // Check if the current range increases the last range
        if start <= last.1 && end >= last.1 {
            last.1 = end;
            println!(
                "Merging ({}, {}) into last range to become ({}, {})",
                start, end, last.0, last.1
            );
            continue;
        }

        // Range does not overlap, add it as a new range
        merged_ranges.push((start, end));
        println!("Adding new range ({}, {})", start, end);
    }

    let mut total = 0;

    for merged_range in merged_ranges {
        total += merged_range.1 - merged_range.0 + 1;
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
        assert_eq!(result, 14);
    }

    #[test]
    fn it_solves_input() {
        let filename = "input";
        let contents = fs::read_to_string(filename).unwrap();
        let result = solve(contents.trim());
        assert_eq!(result, 350939902751909);
    }
}
