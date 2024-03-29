import { useState, useRef } from "react";
import Link from "next/link";
import { useUserProfileStore } from "src/lib/UserProfileStore";
import Fade from "@mui/material/Fade";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import PLLogo from "public/images/svg/PLLogo";
import Navbar from "./Navbar";
import { useClickOutside } from "src/hooks/useClickOutside";
import { useRouter } from "next/router";
import DownChevron from "public/images/svg/DownChevron";

export default function AuthNavbar() {
  const [toggle, setToggle] = useState(false);
  const logoutWrapperRef = useRef<HTMLInputElement>(null);
  const supabase = useSupabaseClient();
  const userProfileStore = useUserProfileStore();
  const router = useRouter();

  const handleSignOut = () => {
    setToggle(false);
    supabase.auth.signOut();
    router.push("/");
  };

  useClickOutside(logoutWrapperRef, () => setToggle(false));

  const session = useSession();

  const username = session?.user.user_metadata.user_name;

  return (
    <Navbar>
      <div className="h-full w-full bg-white shadow-sm">
        <div className="flex flex-row items-center justify-between w-full max-w-[1600px] h-full px-8 mx-auto">
          <div className="flex">
            <Link href="/">
              <div className="flex items-center">
                <PLLogo className="min-w-[45px]" />
                <span className="text-black font-bold md:text-xl">Impact Evaluator</span>
              </div>
            </Link>
            {userProfileStore.isAdmin() ? (
              <Link href="/admin">
                <div className="ml-[10px]">
                  <div className="inline-flex flex-row w-auto items-center justify-center font-bold rounded-lg text-sm py-[5px] px-[10px] bg-gray-lighter text-blue">
                    ADMIN
                  </div>
                </div>
              </Link>
            ) : null}
          </div>

          <div className="relative inline-block text-left" ref={logoutWrapperRef}>
            <div>
              <button
                type="button"
                className="inline-flex w-full justify-center px-4 py-2 text-lg font-medium"
                onClick={() => setToggle((prev) => !prev)}
              >
                {username || "Signed in"}
                <DownChevron className="ml-2 my-auto h-6 w-6" />
              </button>
            </div>
            <Fade in={toggle}>
              <div className="absolute px-4 right-0 z-10 mt-2 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1">
                  <button
                    className="block w-full px-4 py-2 text-left text-lg min-w-[100px]"
                    onClick={() => handleSignOut()}
                  >
                    Sign out
                  </button>
                </div>
              </div>
            </Fade>
          </div>
        </div>
      </div>
    </Navbar>
  );
}
