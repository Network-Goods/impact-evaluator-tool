import { Auth } from "@supabase/auth-ui-react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import Layout from "../layout/Layout";
import Container from "../layout/Container";
import BasicNavbar from "../navBar/BasicNavbar";

export default function Login() {
  const supabase = useSupabaseClient();
  const router = useRouter();

  // window is only defined on the client
  let redirectTo: string | undefined;
  if (typeof window !== "undefined") {
    redirectTo = window.location.protocol + "//" + window.location.host + router.route;
    console.log("redirectTo: ", redirectTo);
  }

  return (
    <Layout>
      <BasicNavbar />
      <main>
        <Container>
          <div className="max-w-[404px] border border-gray p-4 flex flex-col justify-between rounded-lg bg-gray-lighter mx-auto">
            <h1 className="text-charcoal text-2xl font-semibold text-center">
              Create or Join
              <br />
              Impact Evaluator Rounds
            </h1>
            <div className="py-8">
              <div className="max-w-[190px] mx-auto">
                <Auth
                  onlyThirdPartyProviders={true}
                  redirectTo={redirectTo}
                  appearance={{
                    style: {
                      button: {
                        background: "white",
                        color: "#156FF7",
                        border: "1px solid #156FF7",
                        // background: "#346DEE",
                        // color: "white",
                        // border: "none",
                        borderRadius: "8px",
                        fontWeight: "600",
                        fontSize: "16px",
                        paddingTop: "8px",
                        paddingBottom: "8px",
                      },
                    },
                  }}
                  supabaseClient={supabase}
                  providers={["github"]}
                  socialLayout="vertical"
                />
              </div>
            </div>
          </div>
        </Container>
      </main>
    </Layout>
  );
}
