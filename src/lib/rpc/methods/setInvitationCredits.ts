import { isAdmin, ServerParams } from "..";

type Params = {
  id: string;
  credits: string;
};

export async function setInvitationCredits({
  supabase,
  params: { id, credits },
  auth,
}: ServerParams<Params>): Promise<void | Error> {
  if (!isAdmin(auth)) {
    return new Error(`Unauthorized`);
  }

  const { error } = await supabase.from("invitation").update({ voice_credits: credits }).eq("id", id);

  if (error) {
    console.error(error);
    return new Error(`ERROR -- failed to set inviation credits. invitation id: ${id}`);
  }
}
