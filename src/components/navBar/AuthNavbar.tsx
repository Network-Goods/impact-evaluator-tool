import { useState, useEffect, useRef } from "react";
import Fade from "@mui/material/Fade";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import PLLogo from "public/images/svg/PLLogo";
import LogoutButton from "../LogoutButton";
import Navbar from "./Navbar";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

type CapturedEvent = MouseEvent | TouchEvent;

const AuthNavbar = () => {

  const [toggle, setToggle] = useState(false);
  const wrapperRef = useRef<HTMLInputElement>(null);
    const supabase = useSupabaseClient();



  const handleSignOut = () => {
    setToggle(false);
   supabase.auth.signOut();
  };

  const handleToggleButton = () => {
    setToggle((prev) => !prev);
  };
  useEffect(() => {
    const listener = (e: CapturedEvent) => {
      const el = wrapperRef?.current;
      if (!el || el.contains(e.target as Node) || !toggle) {
        return;
      }
      handleToggleButton();
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.addEventListener("touchstart", listener);
    };
  }, [handleToggleButton, wrapperRef]);

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

          <div className="relative inline-block text-left" ref={wrapperRef}>
            <div>
              <button
                type="button"
                className="inline-flex w-full justify-center px-4 py-2 text-sm font-medium text-gray-700 "
                onClick={() => setToggle((prev) => !prev)}
              >
                User name
                <svg
                  className="-mr-1 ml-2 h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
            <Fade in={toggle}>
              <div className="absolute px-4 right-0 z-10 mt-2 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1">
                  <button
                    className="text-gray-700 block w-full px-4 py-2 text-left text-sm"
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
};

export default AuthNavbar;
