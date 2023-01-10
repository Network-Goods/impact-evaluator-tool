import { FC } from "react";
import {
  useSupabaseClient,
  useUser,
  useSession,
} from "@supabase/auth-helpers-react";
import Login from "src/components/Login";
import { Auth } from "@supabase/ui";
import { useSessionStore } from "src/lib/sessionStore";

const Index: FC = () => {
  const supabaseClient = useSupabaseClient();
  const sessionStore = useSessionStore();

  if (!sessionStore.session) return <Login />;

  return (
    <>
      <p>user:</p>
      <pre>{JSON.stringify(sessionStore.session, null, 2)}</pre>
    </>
  );
};

export default Index;
