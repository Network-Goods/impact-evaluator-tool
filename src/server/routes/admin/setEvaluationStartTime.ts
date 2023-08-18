import { isAdmin, ServerParams } from "../..";

type Params = {
  time: Date;
  id: string;
};

export async function setEvaluationStartTime({
  supabase,
  params: { time, id },
  auth,
}: ServerParams<Params>): Promise<void | Error> {
  if (!isAdmin(auth)) {
    return new Error(`Unauthorized`);
  }
  const { error } = await supabase.from("evaluation").update({ start_time: time }).eq("id", id);

  if (error) {
    console.error(error);
    return new Error(`ERROR -- failed to set evaluation start time. evaluation id: ${id}`);
  }
}
