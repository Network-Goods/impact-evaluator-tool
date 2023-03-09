import { isAdmin, ServerParams } from "..";
import { Submission } from "../..";

type Params = {
  submission: Submission;
};

export async function createSubmission({
  supabase,
  params: { submission },
  auth,
}: ServerParams<Params>): Promise<void | Error> {
  if (!isAdmin(auth) && submission.user_id != auth.user_id) {
    return new Error(`Unauthorized`);
  }
  // const { data, error } = await supabase.from("submission").insert([submission]);

  const { data, error } = await supabase.rpc("create_submission", submission);
  console.log("data", data);

  if (error) {
    console.error(error);
    return new Error(`ERROR -- failed to insert submission.`);
  }
}
