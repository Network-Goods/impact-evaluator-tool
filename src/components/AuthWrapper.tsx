import { FC, ReactNode, use, useEffect } from "react";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import Login from "./Login";
import { useUserProfileStore } from "src/lib/UserProfileStore";

type Props = {
  children: ReactNode;
};

const AuthWrapper: FC<Props> = ({ children }) => {
  const session = useSession();
  const supabase = useSupabaseClient();
  const userProfileStore = useUserProfileStore();

  useEffect(() => {
    console.log(session);
    if (session) {
      userProfileStore.login(supabase, session);
    } else {
      userProfileStore.logout();
    }
  }, [session]);

  if (!session) {
    return <Login />;
  }

  return <>{children}</>;
};

export default AuthWrapper;
