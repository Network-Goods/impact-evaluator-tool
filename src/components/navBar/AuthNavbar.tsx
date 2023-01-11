import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import PLLogo from "public/images/svg/PLLogo";
import LogoutButton from "../LogoutButton";
import Navbar from "./Navbar";

const AuthNavbar = () => {
  const session = useSession();

  let username = session?.user.user_metadata.user_name;

  return (
    <Navbar>
      <div className="h-full w-full bg-white shadow-sm">
        <div className="flex flex-row items-center justify-between w-full max-w-[1600px] h-full px-8 mx-auto">
          <div className="flex">
            <PLLogo />
            <span className="text-[#121212] font-bold text-xl">
              Impact Evaluator
            </span>
          </div>
          <div className="flex">
            <span className="items-center pr-4">{username}</span>
            {session ? <LogoutButton /> : ""}
          </div>
        </div>
      </div>
    </Navbar>
  );
};

export default AuthNavbar;
