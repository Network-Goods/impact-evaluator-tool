import { FC, ReactNode } from "react";
import { useSession } from "@supabase/auth-helpers-react";
import Login from "./Login";

type Props = {
  children: ReactNode;
};

const AuthWrapper: FC<Props> = ({ children }) => {
  const session = useSession();

  if (!session) {
    return <Login />;
  }

  return <>{children}</>;
};

export default AuthWrapper;
