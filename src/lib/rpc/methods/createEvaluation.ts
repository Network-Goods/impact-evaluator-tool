import { isAdmin, ServerParams } from "..";
import { Evaluation } from "../..";

type Params = {
  evaluation: Evaluation;
};

export async function createEvaluation({
  supabase,
  params: { evaluation },
  auth,
}: ServerParams<Params>): Promise<void | Error> {
  if (!isAdmin(auth)) {
    return new Error(`Unauthorized`);
  }

  const { data, error } = await supabase.from("evaluation").insert([evaluation]);

  if (error) {
    console.error(error);
    return new Error(`ERROR -- failed to insert evaluation.`);
  }
}
