import { FC, ReactNode } from "react";
import { useSession } from "@supabase/auth-helpers-react";
import LoginPage from "./LoginPage";

type Props = {
  children: ReactNode;
};

const AuthWrapper: FC<Props> = ({ children }) => {
  const session = useSession();

  if (!session) {
    return <LoginPage />;
  }

  return <>{children}</>;
};

export default AuthWrapper;
