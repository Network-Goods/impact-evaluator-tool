import { ServerParams } from "..";
import { DashboardEvaluation } from "../..";

type Params = {
  evaluation_id: string;
};

export async function getEvaluationStore({
  supabase,
  params: { evaluation_id },
}: ServerParams<Params>): Promise<DashboardEvaluation[] | Error> {
  const { error, data } = await supabase
    .from("evaluation")
    .select(
      "*, evaluation_field!evaluation_field_evaluation_id_fkey(*, submission_field(*)), submission(*), evaluator(*, user(*)), invitation(*)",
    )
    .eq("id", evaluation_id)
    .single();

  if (error) {
    console.error(error);
    return new Error(`ERROR -- failed to get Admin Store`);
  }

  return data || [];
}
