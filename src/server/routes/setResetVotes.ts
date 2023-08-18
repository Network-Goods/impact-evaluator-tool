import { isAdmin, getIsUserEvaluator, ServerParams } from "..";

type Params = {
  in_evaluator_id: any;
};

export async function setResetVotes({
  supabase,
  params: { in_evaluator_id },
  auth,
}: ServerParams<Params>): Promise<void | Error> {
  const isUserEvaluator = await getIsUserEvaluator(supabase, auth.user_id, in_evaluator_id);

  if (!isAdmin(auth) && !isUserEvaluator) {
    return new Error(`Unauthorized`);
  }

  const { data, error } = await supabase.rpc("reset", {
    in_evaluator_id,
  });

  if (error) {
    console.error(error);
    return new Error(`ERROR -- failed to reset votes`);
  }
}
