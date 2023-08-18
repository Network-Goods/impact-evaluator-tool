import { isAdmin, ServerParams } from "../..";

type Params = {
  id: string;
  email: string;
};

export async function setEmail({ supabase, params: { id, email }, auth }: ServerParams<Params>): Promise<void | Error> {
  if (!isAdmin(auth)) {
    return new Error(`Unauthorized`);
  }

  const { error } = await supabase.from("user").update({ preferred_email: email }).eq("id", id);

  if (error) {
    console.error(error);
    return new Error(`ERROR -- failed to set user email. user id: ${id}`);
  }
}
