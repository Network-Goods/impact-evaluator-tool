import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import Layout from "./layout/Layout";
import Container from "./layout/Container";
import BasicNavbar from "./navBar/BasicNavbar";

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
    <Layout>
      <BasicNavbar />
      <main>
        <Container>
          <div className="max-w-[404px] border p-4 flex flex-col justify-between rounded-lg bg-[#f5f5f5] mx-auto">
            <h1 className="text-[#242424] text-2xl font-semibold text-center">
              Create or Join
              <br />
              Impact Evaluator Rounds
            </h1>
            <div className="py-8">
              <Auth
                onlyThirdPartyProviders={true}
                redirectTo={redirectTo}
                appearance={{ theme: ThemeSupa }}
                supabaseClient={supabase}
                providers={["github"]}
                socialLayout="vertical"
              />
            </div>
          </div>
        </Container>
      </main>
    </Layout>
  );
}
