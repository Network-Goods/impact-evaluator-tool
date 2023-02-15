import { createClient } from "@supabase/supabase-js";
import { parse } from "csv-parse/sync";
import fs from "fs";
const NEXT_PUBLIC_SUPABASE_URL = "https://wtefsnhgkloxbxhifnxp.supabase.co";
const NEXT_PUBLIC_SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind0ZWZzbmhna2xveGJ4aGlmbnhwIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjkyMTU0NTksImV4cCI6MTk4NDc5MTQ1OX0.NqqOfCK998Yxb3t2NP8U4RBbZwtcIA9x08POtrxWVZk";

function parse_links(additional_links) {
  if (!additional_links) {
    return [];
  }
  let links = additional_links.split(/[\r\n]+/);
  links = links
    .map((link) => {
      const parts = link.split("-", 2);

      if (parts.length != 2) {
        console.error("Failed to parse link, skipping. Link: ", link);
        return null;
      }

      const name = parts[0].trim();
      const value = parts[1].trim();

      return {
        name: name,
        value: value,
      };
    })
    .filter((link) => !!link);

  return links;
}

async function main() {
  // const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
  const supabase = createClient(NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY);

  const input = fs.readFileSync("submissions2.csv");

  const records = parse(input, {
    from_line: 2,
    // columns: true,
    skip_empty_lines: true,
  });

  const evaluationID = "cf866f4d-216c-49aa-8363-3cabd93e80e0";
  // const userID = "e64a055b-115a-4f4f-bb25-0ae41e72d4eb";

  const submissions = records.map((submission) => {
    const github_handle = submission[0];
    const name = submission[1];
    const github_link = submission[2];
    const website_link = submission[3];
    let additional_links = parse_links(submission[4]);
    const description = submission[5];
    const progress = submission[6];
    const specs = submission[7];

    if (website_link) {
      additional_links.unshift({
        name: "Website",
        value: website_link,
      });
    }

    const desc = {
      specs: specs,
      summary: progress,
      description: description,
    };

    return {
      name: name,
      github_link: github_link,
      github_handle: github_handle,
      links: additional_links,
      evaluation_id: evaluationID,
      description: desc,
    };
  });

  submissions.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));

  const { data, error } = await supabase.from("submission").insert(submissions);
  console.log("data: ", data);
  console.log("error: ", error);
}

main();
