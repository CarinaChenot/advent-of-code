use std::fs;

pub(crate) fn part_1() {
    let filename = "input";
    let contents = fs::read_to_string(filename).expect("Should have been able to read the file");
    let contents = contents.trim();

    let mut invalid_ids_count = 0;

    for range in contents.split(',') {
        let (start, end): (u64, u64) = {
            let (a, b) = range.split_once('-').expect("missing -");
            (a.parse().unwrap(), b.parse().unwrap())
        };

        for id in start..=end {
            let id_str = id.to_string();

            if !id_str.len().is_multiple_of(2) {
                continue;
            }

            let (l, r) = id_str.split_at(id_str.len() / 2);

            if l.parse::<u64>() == r.parse() {
                invalid_ids_count = invalid_ids_count + id;
            }
        }
    }

    println!("{}", invalid_ids_count);
}
