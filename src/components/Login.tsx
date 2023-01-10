import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import { supabase } from "../lib/supabase";

// Supabase auth needs to be triggered client-side
export default function Login() {
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
