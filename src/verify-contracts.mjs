import { parse } from "csv-parse/sync";
import { stringify } from "csv-stringify/sync";
import fs from "fs";
import axios from "axios";

async function main() {
  const input = fs.readFileSync("round5.csv");

  const records = parse(input, {
    from_line: 2,
    skip_empty_lines: true,
  });

  for (let line of records) {
    if (line[7] && line[7].startsWith("0x")) {
      try {
        let a = await axios.get(`https://fvm-api.starboard.ventures/api/v1/contract/${line[7]}`);
        if (a.data.code == 0) {
          line.push("yes");
        } else {
          line.push("no");
        }
      } catch (e) {
        line.push("no");
      }
    } else {
      line.push("no");
    }
  }

  fs.writeFileSync("round5-verified.csv", stringify(records));
}

main();
