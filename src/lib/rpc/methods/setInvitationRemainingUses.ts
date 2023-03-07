import { isAdmin, ServerParams } from "..";

type Params = {
  id: string;
  uses: string;
};

export async function setInvitationRemainingUses({
  supabase,
  params: { id, uses },
  auth,
}: ServerParams<Params>): Promise<void | Error> {
  if (!isAdmin(auth)) {
    return new Error(`Unauthorized`);
  }

  const { error } = await supabase.from("invitation").update({ remaining_uses: uses }).eq("id", id);

  if (error) {
    console.error(error);
    return new Error(`ERROR -- failed to set inviation remaining uses. invitation id: ${id}`);
  }
}
