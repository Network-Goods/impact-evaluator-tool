import { createClient } from "@supabase/supabase-js";
import { parse } from "csv-parse/sync";
import fs from "fs";

async function main() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  const input = fs.readFileSync("submissions.csv");

  const records = parse(input, {
    from_line: 2,
    // columns: true,
    skip_empty_lines: true,
  });

  const evaluationID = "a3306daa-31a3-4a67-ab6d-2c6c6446d471";
  const userID = "e64a055b-115a-4f4f-bb25-0ae41e72d4eb";

  const submissions = records.map((submission) => {
    const desc = {
      specs: submission[3],
      summary: submission[4],

      description: submission[5],
    };

    return {
      user_id: userID,
      name: submission[0],
      github_link: submission[1],
      website_link: submission[2],
      evaluation_id: evaluationID,
      description: desc,
    };
  });

  console.log("submissions: ", submissions);

  const { data, error } = await supabase.from("submission").insert(submissions);
  console.log("data: ", data);
  console.log("error: ", error);
}

main();
