import { isAdmin, ServerParams } from "..";
import { Submission } from "../..";

type Params = {
  submission: any;
};

export async function createLiveSubmission({
  supabase,
  params: { submission },
  auth,
}: ServerParams<Params>): Promise<void | Error> {
  if (!isAdmin(auth)) {
    return new Error(`Unauthorized`);
  }

  const { data, error } = await supabase.from("submission").insert([submission]);

  if (error) {
    console.error(error);
    return new Error(`ERROR -- failed to insert submission.`);
  }
}
