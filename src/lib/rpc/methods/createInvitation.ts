import { isAdmin, ServerParams } from "..";
import { Submission } from "../..";

type Params = {
  invitation: any;
};

export async function createInvitation({
  supabase,
  params: { invitation },
  auth,
}: ServerParams<Params>): Promise<void | Error> {
  if (!isAdmin(auth)) {
    return new Error(`Unauthorized`);
  }

  const { data, error } = await supabase.from("invitation").insert([invitation]);

  if (error) {
    console.error(error);
    return new Error(`ERROR -- failed to insert invitation.`);
  }
}
