import { ReactNode, useEffect } from "react";
import { useSession, useSessionContext, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useUserProfileStore } from "src/lib/UserProfileStore";
import LoginPage from "src/components/login/LoginPage";
import LoadingSpinner from "../shared/LoadingSpinner";

type Props = {
  children: ReactNode;
};

export default function AuthWrapper({ children }: Props) {
  const session = useSession();
  const userProfileStore = useUserProfileStore();
  const sessionContext = useSessionContext();
  const supabase = useSupabaseClient();

  useEffect(() => {
    if (session && !sessionContext.isLoading) {
      userProfileStore.login();
    } else {
      userProfileStore.logout();
    }
  }, [session, sessionContext.isLoading]);

  if (sessionContext.isLoading) {
    return <LoadingSpinner />;
  }

  if (!session) {
    // TODO: This is currently necessary to clean up any lingering sessions in the event that the user was deleted on the backend before they logged out
    supabase.auth.signOut();
    return <LoginPage />;
  }

  return <>{children}</>;
}
