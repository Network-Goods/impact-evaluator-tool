import { isAdmin, ServerParams } from "../..";

type Params = {
  id: string;
  code: string;
};

export async function setInvitationCode({
  supabase,
  params: { id, code },
  auth,
}: ServerParams<Params>): Promise<void | Error> {
  if (!isAdmin(auth)) {
    return new Error(`Unauthorized`);
  }

  const { error } = await supabase.from("invitation").update({ code: code }).eq("id", id);

  if (error) {
    console.error(error);
    return new Error(`ERROR -- failed to set inviation code. invitation id: ${id}`);
  }
}
