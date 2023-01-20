import { ServerParams } from "..";

type Params = {
  in_evaluator_id: any;
};

export async function resetVotes({
  supabase,
  params: { in_evaluator_id },
}: ServerParams<Params>): Promise<void | Error> {
  const { data, error } = await supabase.rpc("reset", {
    in_evaluator_id,
  });

  if (error) {
    console.error(error);
    return new Error(`ERROR -- failed to reset votes`);
  }
}
