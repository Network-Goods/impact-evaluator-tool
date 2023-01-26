import { isAdmin, ServerParams } from "..";

type Params = {
  id: string;
  amount: number;
};

export async function setVoiceCredits({
  supabase,
  params: { id, amount },
  auth,
}: ServerParams<Params>): Promise<void | Error> {
  if (!isAdmin(auth)) {
    return new Error(`Unauthorized`);
  }
  const { error } = await supabase.from("evaluator").update({ voice_credits: amount }).eq("id", id);

  if (error) {
    console.error(error);
    return new Error(`ERROR -- failed to set evaluation name. evaluation id: ${id}`);
  }
}
