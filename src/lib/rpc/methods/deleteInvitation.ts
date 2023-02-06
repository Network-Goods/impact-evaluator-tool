import { isAdmin, ServerParams } from "..";

type Params = {
  id: string;
};

export async function deleteInvitation({
  supabase,
  params: { id },
  auth,
}: ServerParams<Params>): Promise<void | Error> {
  if (!isAdmin(auth)) {
    return new Error(`Unauthorized`);
  }

  const { error } = await supabase.from("invitation").delete().eq("id", id);
  if (error) {
    console.error(error);
    return new Error(`ERROR -- failed to delete invitation. invitation id: ${id}`);
  }
}
