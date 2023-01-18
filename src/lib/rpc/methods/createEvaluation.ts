import { ServerParams } from "..";
import { Evaluation } from "../..";

type Params = {
  evaluation: Evaluation;
};

export async function createEvaluation({
  supabase,
  params: { evaluation },
}: ServerParams<Params>): Promise<void | Error> {
  const { data, error } = await supabase
    .from("evaluation")
    .insert([evaluation]);

  if (error) {
    console.error(error);
    return new Error(`ERROR -- failed to insert evaluation.`);
  }
}
