import { getIsUserEvaluator, isAdmin, ServerParams } from "..";

type Params = {
  evaluator_id: string;
};

export async function setEvaluatorSubmission({
  supabase,
  params: { evaluator_id },
  auth,
}: ServerParams<Params>): Promise<void | Error> {
  const isUserEvaluator = await getIsUserEvaluator(supabase, auth.user_id, evaluator_id);

  if (!isAdmin(auth) && !isUserEvaluator) {
    return new Error(`Unauthorized`);
  }

  const { error } = await supabase.from("evaluator").update({ is_submitted: true }).eq("id", evaluator_id);

  if (error) {
    console.error(error);
    return new Error(`ERROR -- failed to set evaluator submission. evaluator id: ${evaluator_id}`);
  }
}
