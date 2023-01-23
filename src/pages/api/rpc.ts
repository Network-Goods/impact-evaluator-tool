import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import type { NextApiRequest, NextApiResponse } from "next";
import { rpc } from "src/lib";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    res.status(405).send({ message: "Only POST requests allowed" });
    return;
  }

  const supabaseServerClient = createServerSupabaseClient<any>({
    req,
    res,
  });

  const {
    data: { user },
  } = await supabaseServerClient.auth.getUser();

  const session = await supabaseServerClient.auth.getSession();

  if (!user) {
    // This can be the case if the user was removed from the backend but has not been
    // logged out.
    if (session.data.session) {
      // TODO: Return an error to the client that redirects them to the home page
      // signout does not work on the server
      // supabaseServerClient.auth.signOut();

      console.error(
        "ERROR -- supabaseServerClient.auth.getUser did not return user, but the user still has an active session",
      );
      res.status(405).send({ error: "An error occurred, try logging out" });
      return;
    }

    console.error("ERROR -- supabaseServerClient.auth.getUser did not return user. ");
    res.status(405).send({ error: "Not logged in" });
    return;
  }

  const auth = await rpc.getUserProfileAuth(supabaseServerClient, user.id);
  if (auth instanceof Error) {
    console.error("ERROR -- rpc.getUserProfileAuth failed. ", auth);
    res.status(405).send({ error: auth });
    return;
  }

  const result = await rpc.execute(req.body.method, req.body.params, supabaseServerClient, auth);

  if (result instanceof Error) {
    console.error(`ERROR -- rpc.getUserProfileAuth failed. method: ${req.body.method} `, result);
    res.status(405).send({ error: result });
    return;
  }

  res.status(200).json({
    result: result,
  });
};
