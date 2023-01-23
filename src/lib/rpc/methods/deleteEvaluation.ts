import { ServerParams } from "..";

type Params = {
  id: string;
};

export async function deleteEvaluation({ supabase, params: { id } }: ServerParams<Params>): Promise<void | Error> {
  const { error } = await supabase.from("evaluation").delete().eq("id", id);

  if (error) {
    console.error(error);
    return new Error(`ERROR -- failed to delete evaluation. evaluation id: ${id}`);
  }
}
