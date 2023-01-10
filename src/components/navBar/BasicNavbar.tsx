import PLLogoWhite from "public/images/svg/PLLogoWhite";
import Navbar from "./Navbar";

const BasicNavbar = () => {
  return (
    <Navbar>
      <div className="flex flex-row items-center justify-between h-full w-full bg-[#102d70]">
        <div className="w-full max-w-[1600px] px-8 mx-auto">
          <div className="flex">
            <PLLogoWhite />
            <span className="text-white font-semibold text-2xl pl-2">
              Impact Evaluator
            </span>
          </div>
        </div>
      </div>
    </Navbar>
  );
};

export default BasicNavbar;
