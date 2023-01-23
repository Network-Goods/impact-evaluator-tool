import { isAdmin, ServerParams } from "..";

type Params = {
  id: string;
  name: string;
};

export async function setEvaluationName({
  supabase,
  params: { id, name },
  auth,
}: ServerParams<Params>): Promise<void | Error> {
  if (!isAdmin(auth)) {
    return new Error(`Unauthorized`);
  }

  const { error } = await supabase.from("evaluation").update({ name: name }).eq("id", id);

  if (error) {
    console.error(error);
    return new Error(`ERROR -- failed to set evaluation name. evaluation id: ${id}`);
  }
}
