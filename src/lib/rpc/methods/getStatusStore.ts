import { isAdmin, ServerParams } from "..";
import { RoundStatus } from "../..";

export async function getStatusStore({ supabase, auth }: ServerParams<null>): Promise<RoundStatus[] | Error> {
  if (!isAdmin(auth)) {
    return new Error("Not authorized");
  }

  const { data, error } = await supabase.rpc("get_status_store");

  console.log("status store data: ", data);

  if (error) {
    console.error(error);
    return new Error(`ERROR -- get_status_store failed. message: ${error.message}`);
  }

  return data as any;
}
