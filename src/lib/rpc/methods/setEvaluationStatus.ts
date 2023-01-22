import { ServerParams } from "..";

type Params = {
  id: string;
  status: string;
};

export async function setEvaluationStatus({
  supabase,
  params: { id, status },
}: ServerParams<Params>): Promise<void | Error> {
  const { error } = await supabase.from("evaluation").update({ status: status }).eq("id", id);

  if (error) {
    console.error(error);
    return new Error(`ERROR -- failed to set evaluation status. evaluation id: ${id}`);
  }
}
