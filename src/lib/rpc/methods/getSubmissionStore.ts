import { ServerParams } from "..";
import { DashboardEvaluation } from "../..";

type Params = {
  submission_id: string;
};

export async function getSubmissionStore({
  supabase,
  params: { submission_id },
}: ServerParams<Params>): Promise<DashboardEvaluation[] | Error> {
  const { error, data } = await supabase.from("evaluation").select("*").eq("id", submission_id).single();

  if (error) {
    console.error(error);
    return new Error(`ERROR -- failed to get Admin Store`);
  }

  return data || [];
}
