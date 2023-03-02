import { createMiddlewareSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  // We need to create a response and hand it to the supabase client to be able to modify the response headers.
  const res = NextResponse.next();
  // Create authenticated Supabase Client.
  const supabase = createMiddlewareSupabaseClient({ req, res });

  // Code for creating email accounts for testing purposes. Note that registration emails need to be disable
  // in the supabase UI for this method to work correctly.
  // const createNewUser = await supabase.auth.signUp({
  //   email: "",
  //   password: "",
  // });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  function redirect() {
    // Auth condition not met, redirect to home page.
    const redirectUrl = req.nextUrl.clone();
    redirectUrl.pathname = "/";
    redirectUrl.searchParams.set(`redirectedFrom`, req.nextUrl.pathname);
    return NextResponse.redirect(redirectUrl);
  }

  if (!session) {
    return redirect();
  }

  const user = await supabase.from("user").select().eq("github_user_id", session.user.id).single();

  if (!user.data) {
    return redirect();
  }

  if (user.data.role != "admin") {
    return redirect();
  }

  return res;
}

export const config = {
  matcher: ["/admin/:path*", "/results/:path*"],
};
