import { ServerParams } from "..";

type Params = {
  id: string;
};

export async function setEvaluatorSubmission({
  supabase,
  params: { id },
}: ServerParams<Params>): Promise<void | Error> {
  const { error } = await supabase
    .from("evaluator")
    .update({ is_submitted: true })
    .eq("id", id);

  if (error) {
    console.error(error);
    return new Error(
      `ERROR -- failed to set evaluator submission. evaluator id: ${id}`
    );
  }
}
