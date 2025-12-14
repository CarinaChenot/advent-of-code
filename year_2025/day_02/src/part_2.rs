use std::fs;

pub(crate) fn part_2() {
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
            if is_id_invalid_check(id) {
                invalid_ids_count = invalid_ids_count + id;
            }
        }
    }

    println!("{}", invalid_ids_count);
}

fn is_id_invalid_check(id: u64) -> bool {
    let id_str = id.to_string();
    let id_len = id_str.len();

    // In how many parts is this id divisible, biggest first
    for parts_size in (1..id_len).rev() {
        if id_len % parts_size != 0 {
            continue;
        }

        let parts = id_len / parts_size;

        // Divise the id string into equal parts
        let mut result = Vec::with_capacity(parts);
        for i in 0..parts {
            let start = i * parts_size;
            let end = start + parts_size;
            result.push(&id_str[start..end]);
        }

        // Check if all parts are equal
        let first = result.first().unwrap();

        let all_equal = result.iter().all(|x| x == first);

        if all_equal {
            return true;
        } else {
            continue;
        }
    }

    false
}
