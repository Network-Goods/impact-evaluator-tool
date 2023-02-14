import { ServerParams } from "..";
import { DashboardEvaluation } from "../..";

type Params = {
  submission_id: string;
};

export async function getSubmissionStore({
  supabase,
  params: { submission_id },
}: ServerParams<Params>): Promise<any | Error> {
  const { error, data } = await supabase.from("submission").select("*").eq("id", submission_id).single();

  if (error) {
    console.error(error);
    return new Error(`ERROR -- failed to get Submission Store`);
  }

  return data;
}
