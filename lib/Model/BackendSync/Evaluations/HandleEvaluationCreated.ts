import { SupabaseClient } from "@supabase/supabase-js";
import { EvaluationCreated } from "../../Evaluations/Events";

export const eventKind = EvaluationCreated.kind;

export async function handler(supabase: SupabaseClient, event: EvaluationCreated.EvaluationCreated): Promise<void | Error> {
  let new_evaluation: any = {
    ...event.evaluation
  };

  delete new_evaluation.kind;

  const { error } = await supabase.from("evaluation").insert([new_evaluation]);

  if (error) {
    return new Error(error.message);
  }
}