import { ServerParams } from "..";
import { DashboardEvaluation } from "../..";

type Params = {
  submission_id: string;
};

export async function getSubmissionStore({
  supabase,
  params: { submission_id },
}: ServerParams<Params>): Promise<any | Error> {
  const { error, data } = await supabase
    .from("submission")
    .select(
      "*, evaluation(description, name, evaluation_field!evaluation_field_evaluation_id_fkey(*, submission_field(*)))",
    )
    .eq("id", submission_id)
    .single();

  if (error) {
    console.error(error);
    return new Error(`ERROR -- failed to get Submission Store`);
  }

  (data as any).evaluation.evaluation_field.sort((a: any, b: any) => a.field_order - b.field_order);

  return data as any;
}
