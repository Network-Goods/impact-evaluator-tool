import { FC, ReactNode, use, useEffect } from "react";
import {
  useSession,
  useSessionContext,
  useSupabaseClient,
} from "@supabase/auth-helpers-react";
import { useUserProfileStore } from "src/lib/UserProfileStore";
import LoginPage from "src/components/LoginPage";

type Props = {
  children: ReactNode;
};

const AuthWrapper: FC<Props> = ({ children }) => {
  const session = useSession();
  const userProfileStore = useUserProfileStore();
  const sessionContext = useSessionContext();

  useEffect(() => {
    if (session && !sessionContext.isLoading) {
      userProfileStore.login();
    } else {
      userProfileStore.logout();
    }
  }, [session, sessionContext.isLoading]);

  if (sessionContext.isLoading) {
    return <div>Loading</div>;
  }

  if (!session) {
    return <LoginPage />;
  }

  return <>{children}</>;
};

export default AuthWrapper;
