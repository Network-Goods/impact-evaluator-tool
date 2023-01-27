import { useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Close from "public/images/svg/Close";
import SubTitle from "src/components/shared/SubTitle";
import Button from "src/components/shared/Button";
import Add from "public/images/svg/Add";
import Delete from "public/images/svg/Delete";
import Edit from "public/images/svg/Edit";
import SetLinkModal from "./SetLinkModal";

const style = {
  position: "absolute",
  bgcolor: "white",
  boxShadow: 24,
  borderRadius: "9.31292px",
};

type OutcomeModalProps = {
  handleClose: () => void;
  open: boolean;
  submission?: any;
};

const OutcomeModal = ({ handleClose, open, submission }: OutcomeModalProps) => {
  const [inputs, setInputs] = useState<any>({});
  const [openLinkModal, setOpenLinkModal] = useState(false);

  const handleChange = (event: any) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values: any) => ({ ...values, [name]: value }));
    console.log("inputs", inputs);
  };
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
        className="translate-x-[-5%] md:-translate-x-1/2 -translate-y-1/2 top-1/2 left-[10%] md:left-1/2 py-3 px-5 md:py-10 md:px-14 lg:w-[1166px] text-offblack"
      >
        <h1 className="text-center text-xl md:text-[28px] text-blue-alt font-semibold">Edit Outcome</h1>

        <button
          onClick={handleClose}
          className="absolute top-0 right-0 p-4 md:p-8 text-offblack hover:text-[#979797] transition-colors duration-200 ease-in-out transform"
        >
          <Close className="fill-current" />
        </button>
        <div className="flex pt-8">
          <div className="flex-1 md:text-lg">
            <div className="flex items-center pb-7">
              <div className="font-bold py-2 px-4 border border-gray border-r-0 rounded-l-lg bg-blue bg-opacity-5">
                Title
              </div>
              <input
                type="text"
                name="name"
                className="appearance-none w-full px-4 py-2 rounded-r-lg border border-gray focus:outline-none"
                placeholder="Example Title 1"
                value={submission ? submission.name : inputs.name || ""}
                onChange={handleChange}
              />
            </div>
            <p className="font-bold pb-1">Project Summary</p>
            <textarea
              className="w-full min-h-[112px] px-8 py-3 rounded-lg border border-gray focus:outline-none"
              placeholder="XYZ is..."
              name="summary"
              value={submission ? submission.description?.summary : inputs.summary || ""}
              onChange={handleChange}
            />
            <p className="font-bold pb-1">Progress Description</p>

            <textarea
              className="w-full min-h-[112px] px-8 py-3 rounded-lg border border-gray focus:outline-none"
              placeholder="XYZ is..."
              name="description"
              value={submission ? submission.description?.description : inputs.description || ""}
              onChange={handleChange}
            />
            <p className="font-bold pb-1">FVM Tech Specs</p>
            <textarea
              className="w-full min-h-[112px] px-8 py-3 rounded-lg border border-gray focus:outline-none"
              placeholder="XYZ is..."
              name="specs"
              value={submission ? submission.description?.specs : inputs.specs || ""}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col justify-between ml-8">
            <div>
              <div className="flex pb-7">
                <Button
                  text="Add Link"
                  secondary
                  icon={<Add className="fill-current" />}
                  onClick={() => console.log("hello")}
                />

                <div>
                  <button className="bg-blue bg-opacity-5 p-4  rounded-lg ml-7">
                    <Delete className="w-4 h-6" />
                  </button>
                </div>
              </div>
              <p className="font-bold pb-1">Links</p>
              <button
                className="flex items-center justify-center px-3 py-1 border border-[#dbdbdb] rounded-lg"
                onClick={() => setOpenLinkModal(true)}
              >
                <span className="mr-3">
                  <Edit className="w-3 h-3" />
                </span>
                <span>Github</span>
              </button>
              <p className="py-1">Github: {submission.github_link}</p>
              <button
                className="flex items-center justify-center px-3 py-1 border border-[#dbdbdb] rounded-lg"
                onClick={() => setOpenLinkModal(true)}
              >
                <span className="mr-3">
                  <Edit className="w-3 h-3" />
                </span>
                <span>Website</span>
              </button>
              {submission.website_link ? (
                <p className="py-1">Website: {submission.website_link}</p>
              ) : (
                <p className="py-1">Website: N/A</p>
              )}
            </div>
            <div className="flex justify-evenly">
              <div>
                <Button small alt text="Cancel" onClick={handleClose} />
              </div>
              <div>
                <button
                  onClick={handleClose}
                  className="transition-colors duration-200 ease-in-out transform  outline-none focus:outline-none flex flex-row items-center justify-center rounded-md font-bold mx-auto border border-blue bg-blue hover:bg-blue-darkest hover:border-blue-darkest focus:bg-blue-darkest text-white text-lg px-3 py-1"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
        <SetLinkModal open={openLinkModal} handleClose={() => setOpenLinkModal(false)} />
      </Box>
    </Modal>
  );
};

export default OutcomeModal;
