import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { type inferAsyncReturnType } from "@trpc/server";
import type { CreateNextContextOptions } from "@trpc/server/adapters/next";
import { Auth, getUserProfileAuth } from "src/lib/rpc";
import { db } from "src/lib/db";

export const createContext = async (opts: CreateNextContextOptions) => {
  const supabaseServerClient = createServerSupabaseClient<any>({
    req: opts.req,
    res: opts.res,
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
      // res.status(405).send({ error: "An error occurred, try logging out" });
      // return;
    }

    console.error("ERROR -- supabaseServerClient.auth.getUser did not return user. ");
    // res.status(405).send({ error: "Not logged in" });
    // return;
  }

  const auth = (await getUserProfileAuth(supabaseServerClient as any, user!.id)) as any as Auth;
  if (auth instanceof Error) {
    console.error("ERROR -- rpc.getUserProfileAuth failed. ", auth);
    // return;
  }

  const ctx = {
    auth,
    supabase: supabaseServerClient,
    db,
  };

  return ctx;
};

export type Context = inferAsyncReturnType<typeof createContext>;
