import { isAdmin, ServerParams } from "..";

type Params = {
  id: string;
  description: string;
};

export async function setEvaluationDescription({
  supabase,
  params: { id, description },
  auth,
}: ServerParams<Params>): Promise<void | Error> {
  if (!isAdmin(auth)) {
    return new Error(`Unauthorized`);
  }

  const { error } = await supabase.from("evaluation").update({ description: description }).eq("id", id);

  if (error) {
    console.error(error);
    return new Error(`ERROR -- failed to set evaluation description. evaluation id: ${id}`);
  }
}
