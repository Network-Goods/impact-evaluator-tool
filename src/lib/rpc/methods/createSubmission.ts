import { ServerParams } from "..";
import { Submission } from "../..";

type Params = {
  submission: Submission;
};

export async function createSubmission({
  supabase,
  params: { submission },
}: ServerParams<Params>): Promise<void | Error> {
  const { data, error } = await supabase
    .from("submission")
    .insert([submission]);

  if (error) {
    console.error(error);
    return new Error(`ERROR -- failed to insert submission.`);
  }
}
