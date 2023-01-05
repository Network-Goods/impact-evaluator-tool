import { SupabaseClient } from "@supabase/supabase-js";
import { Evaluations } from "../Model/";

export async function loadEvaluations(supabase: SupabaseClient): Promise<Evaluations.Evaluation[] | Error> {
    const { data, error } = await supabase.from("evaluation").select();
    if (error) {
      return new Error(`loadEvaluations failed: ${error.message}`);
    }

    // TODO: should we be relying on the client to add this field? Or just eating the cost of the redundant kind info in the db column?
    for (let evaluation of data) {
      evaluation.kind = Evaluations.kind;
    }
  
    return data as any;
}