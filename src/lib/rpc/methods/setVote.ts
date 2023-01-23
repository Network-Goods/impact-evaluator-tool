import { getIsUserEvaluator, isAdmin, ServerParams } from "..";

type Params = {
  in_evaluator_id: string;
  in_submission_id: string;
  vote_count: number;
};

export async function setVote({
  supabase,
  params: { in_evaluator_id, in_submission_id, vote_count },
  auth,
}: ServerParams<Params>): Promise<void | Error> {
  const isUserEvaluator = await getIsUserEvaluator(supabase, auth.user_id, in_evaluator_id);

  if (!isAdmin(auth) && !isUserEvaluator) {
    return new Error(`Unauthorized`);
  }

  const { error } = await supabase.rpc("upsertvote", {
    in_evaluator_id,
    in_submission_id,
    vote_count,
  });

  if (error) {
    console.error(error);
    return new Error(`ERROR -- failed to upsert vote`);
  }
}
