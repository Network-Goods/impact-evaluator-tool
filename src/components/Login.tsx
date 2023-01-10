import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

export default function Login() {
  const supabase = useSupabaseClient();

  return (
    <>
      <Auth
        // redirectTo="http://localhost:3001/"
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
