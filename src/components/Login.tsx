import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";

export default function Login() {
  const supabase = useSupabaseClient();
  const router = useRouter();

  // window is only defined on the client
  let redirectTo: string | undefined;
  if (typeof window !== "undefined") {
    redirectTo =
      window.location.protocol + "//" + window.location.host + router.route;
  }

  return (
    <>
      <Auth
        onlyThirdPartyProviders={true}
        redirectTo={redirectTo}
        appearance={{ theme: ThemeSupa }}
        // view="update_password"
        supabaseClient={supabase}
        providers={["github"]}
        // scopes={{github: 'repo'}} // TODO: enable scopes in Auth component.
        socialLayout="vertical"
      />
    </>
  );
}
