import { SupabaseClient } from "@supabase/supabase-js";
import { EvaluationDeleted } from "../../Evaluations/Events";

export const eventKind = EvaluationDeleted.kind;

export async function handler(supabase: SupabaseClient, event: EvaluationDeleted.EvaluationDeleted): Promise<void | Error> {
    const { error } = await supabase.from("evaluation").delete().eq('id', event.evaluation_id);

    if (error) {
      return new Error(error.message);
    }
}