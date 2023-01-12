import { FC, ReactNode, use, useEffect } from "react";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useUserProfileStore } from "src/lib/UserProfileStore";
import LoginPage from "src/components/LoginPage";

type Props = {
  children: ReactNode;
};

const AuthWrapper: FC<Props> = ({ children }) => {
  const session = useSession();
  const supabase = useSupabaseClient();
  const userProfileStore = useUserProfileStore();

  useEffect(() => {
    if (session) {
      userProfileStore.login(supabase, session);
    } else {
      userProfileStore.logout();
    }
  }, [session]);

  if (!session) {
    return <LoginPage />;
  }

  return <>{children}</>;
};

export default AuthWrapper;
