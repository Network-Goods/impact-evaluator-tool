import Add from "public/images/svg/Add";
import LeftArrow from "public/images/svg/LeftArrow";
import { useState, useEffect } from "react";
import SubTitle from "src/components/SubTitle";
import Title from "src/components/Title";
import Button from "../Button";
import Collapse from "@mui/material/Collapse";
import SubmitEvaluationModal from "./SubmitEvaluationModal";
import SmallTitle from "../SmallTitle";
import DownChevron from "public/images/svg/DownChevron";

export default function Voting() {
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);
  const [open, setOpen] = useState(false);

  const [decrementDisabled, setDecrementDisabled] = useState(false);
  const [incrementDisabled, setIncrementDisabled] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const [totalCount, setTotalCount] = useState(0);

  // const handleCount = (action: string, id: number) => {
  //   const newArr = rolesArray.map((role) => {
  //     if (role.id !== id) {
  //       return role;
  //     } else {
  //       if (action === "increment") {
  //         return {
  //           ...role,
  //           count: role.count + 1,
  //         };
  //       } else if (action === "decrement") {
  //         return {
  //           ...role,
  //           count: role.count - 1,
  //         };
  //       } else {
  //         return null;
  //       }
  //     }
  //   });
  //   //@ts-ignore
  //   setRolesArray(newArr);
  // };

  useEffect(() => {
    if ("role.count") {
      setDecrementDisabled(true);
    } else {
      setDecrementDisabled(false);
    }
  }, []);
  return (
    <div>
      <div className="flex">
        <button className="rounded-lg bg-gray-light h-12 w-12 flex justify-center items-center mr-6">
          <LeftArrow className="" />
        </button>
        <div className="flex-1">
          <div className="flex justify-between pb-2">
            <h1 className="text-4xl text-offblack">Round Title</h1>
            <div>
              <Button
                secondary
                small
                text="Round details"
                icon={<Add className="mb-1 fill-blue" />}
                onClick={() => console.log("hi")}
              />
            </div>
          </div>
          <div className="flex justify-between pb-6">
            <h3 className="text-2xl text-blue-alt font-bold">
              Quadratic voting
            </h3>
            <div>
              <Button
                secondary
                small
                text="Quadratic voting"
                icon={<Add className="mb-1 fill-blue" />}
                onClick={() => console.log("hi")}
              />
            </div>
          </div>
          <SmallTitle text="DEADLINE" />
          <div className="mt-2 font-bold tracking-wider">15/03/2022</div>
        </div>
      </div>
      <hr className="my-8 border-gray" />

      <div className="rounded-lg bg-[#f0f0f0] border border-gray">
        <div className="flex py-2 px-6">
          <div className="w-[60%] py-2 border-r border-gray ">
            <SmallTitle text="PROJECTS" />
          </div>
          <div className="w-[23.5%] text-center py-2">
            <SmallTitle text="VOTES" />
          </div>
          <div className="w-[16.5%] text-center py-2 border-l border-gray ">
            <SmallTitle text="CREDITS" />
          </div>
        </div>
        <div className="flex px-6 border border-gray border-x-0 bg-white">
          <div className="w-[60%] flex justify-between border-r border-gray">
            <div className="py-6 pl-6">Outcome title</div>
            <button onClick={handleClick} className="p-4">
              <DownChevron
                className={`h-5 w-5 transform transition-all duration-300  ease-in-out
              ${open ? "rotate-180 fill-blue" : "rotate-0"}
              
              `}
              />
            </button>
          </div>
          <div className="w-[23.5%] text-center">
            <div className="py-6">
              <div className="flex flex-row ">
                {/* <button
                  onClick={() => handleCount("decrement", role.id)}
                  className={`h-full  rounded-l cursor-pointer outline-none ${
                    decrementDisabled ? "bg-secondaryBg" : "bg-secondaryText "
                  }`}
                  disabled={decrementDisabled}
                >
                  <span className="m-auto text-2xl font-thin">−</span>
                </button> */}
                <span className="outline-none focus:outline-none text-center w-full bg-secondaryText font-semibold text-md  md:text-basecursor-default  text-primaryText">
                  1
                </span>
                {/* <button
                  onClick={() => handleCount("increment", role.id)}
                  className={` h-full  rounded-r cursor-pointer
          ${incrementDisabled ? "bg-secondaryBg" : "bg-secondaryText "}
          `}
                  disabled={incrementDisabled}
                >
                  <span className="m-auto text-2xl font-thin">+</span>
                </button> */}
              </div>
            </div>
          </div>
          <div className="w-[16.5%] text-center">
            <div className="py-4 ">
              <div className="py-2 border-l border-gray">Used credits</div>
            </div>
          </div>
        </div>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <div>i love dihan</div>
          <div>i love dihan</div>
          <div>i love dihan</div>
          <div>i love dihan</div>
          <div>i love dihan</div>
          <div>i love dihan</div>
        </Collapse>
      </div>

      <div className="flex justify-between">
        <div>
          <Button alt text="Save and exit" onClick={() => console.log("hi")} />
        </div>
        <div>
          <Button text="Submit" onClick={handleOpenModal} />
        </div>
      </div>
      <SubmitEvaluationModal handleClose={handleCloseModal} open={openModal} />
    </div>
  );
}
