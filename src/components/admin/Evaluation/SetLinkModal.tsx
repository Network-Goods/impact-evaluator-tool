import { useState, useEffect, useRef } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "src/components/shared/Button";
import Close from "public/images/svg/Close";

const style = {
  position: "absolute",
  bgcolor: "white",
  boxShadow: 24,
  borderRadius: "9.31292px",
};

type SetLinkModalProps = {
  handleClose: () => void;
  open: boolean;
  // evaluator: any;
  // store: any;
};

const SetLinkModal = ({ handleClose, open }: SetLinkModalProps) => {
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Box
        sx={style}
        className="translate-x-[-5%] md:-translate-x-1/2 -translate-y-1/2 top-1/2 left-[10%] md:left-1/2 py-3 px-5 md:py-10 md:px-14 lg:w-[640px]"
      >
        <div className="flex justify-between items-center text-offblack">
          <h1 className="text-[28px] text-blue-alt font-semibold">Add link</h1>

          <button
            onClick={handleClose}
            className="p-6 text-offblack hover:text-[#979797] transition-colors duration-200 ease-in-out transform"
          >
            <Close className="fill-current" />
          </button>
        </div>

        <div className="pt-5">
          <p className="font-bold pb-1">Title</p>
          <input
            type="text"
            name="code"
            className="appearance-none w-full px-4 py-2 rounded-lg border border-gray focus:outline-none"
            placeholder="ExampleCode123"
            // value={inputs.code || ""}
            // onChange={handleChange}
          />
          <p className="font-bold pt-7 pb-1">Link</p>
          <input
            type="text"
            name="code"
            className="appearance-none w-full px-4 py-2 rounded-lg border border-gray focus:outline-none"
            placeholder="ExampleCode123"
            // value={inputs.code || ""}
            // onChange={handleChange}
          />
        </div>
        <hr className="my-6 border-[#f0f0f0]" />
        <div className="flex justify-evenly">
          <div>
            <Button small alt text="Cancel" onClick={handleClose} />
          </div>
          <div>
            <button
              onClick={() => console.log("save")}
              className={`transition-colors duration-200 ease-in-out transform  outline-none focus:outline-none flex flex-row items-center justify-center rounded-md font-bold mx-auto border border-blue bg-blue text-white text-lg px-3 py-1
               
                `}
            >
              Save Link
            </button>
          </div>
        </div>
      </Box>
    </Modal>
  );
};

export default SetLinkModal;
