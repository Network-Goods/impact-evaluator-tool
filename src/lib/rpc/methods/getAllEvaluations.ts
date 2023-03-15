import { ServerParams } from "..";
import { DashboardEvaluation } from "../..";

type Params = null;

export async function getAllEvaluations({ supabase }: ServerParams<Params>): Promise<{ [x: string]: any }[] | Error> {
  const { error, data } = await supabase.from("evaluation").select("*");

  if (error) {
    console.error(error);
    return new Error(`ERROR -- failed to get Admin Store`);
  }

  return data || [];
}
