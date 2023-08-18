import { isAdmin, ServerParams } from "../..";

type Params = {
  id: string;
  is_sme: boolean;
};

export async function setInvitationSubmissionRequired({
  supabase,
  params: { id, is_sme },
  auth,
}: ServerParams<Params>): Promise<void | Error> {
  if (!isAdmin(auth)) {
    return new Error(`Unauthorized`);
  }

  const { error } = await supabase.from("invitation").update({ is_sme: is_sme }).eq("id", id);

  if (error) {
    console.error(error);
    return new Error(`ERROR -- failed to set invitation submission required. invitation id: ${id}`);
  }
}
