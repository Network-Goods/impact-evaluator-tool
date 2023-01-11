import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { FC } from "react";
import Button from "./Button";

const LogoutButton: FC = () => {
  const supabase = useSupabaseClient();

  function onClick() {
    supabase.auth.signOut();
  }

  return <Button text="logout" onClick={onClick} />;
};

export default LogoutButton;
