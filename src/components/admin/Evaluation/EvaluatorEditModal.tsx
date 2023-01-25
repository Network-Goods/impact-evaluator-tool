import { useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Close from "public/images/svg/Close";
import SubTitle from "src/components/shared/SubTitle";
import SmallTitle from "src/components/shared/SmallTitle";
import ConfirmResetModal from "./ConfirmResetModal";
import Button from "src/components/shared/Button";

const style = {
  position: "absolute",
  bgcolor: "white",
  boxShadow: 24,
  borderRadius: "9.31292px",
};

type EvaluatorEditModalProps = {
  handleClose: () => void;
  open: boolean;
  evaluator: any;
};

const EvaluatorEditModal = ({ handleClose, open, evaluator }: EvaluatorEditModalProps) => {
  const [openConfirmResetModal, setOpenConfirmResetModal] = useState(false);

  const handleConfirmResetModal = () => {
    setOpenConfirmResetModal(true);
  };

  const reset = () => {
    console.log("reset");
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
      <Fade in={open}>
        <Box
          sx={style}
          className="translate-x-[-5%] md:-translate-x-1/2 -translate-y-1/2 top-1/2 left-[10%] md:left-1/2 py-3 px-5 md:py-10 md:px-14 lg:w-[860px]"
        >
          <div className="flex justify-between items-center text-offblack">
            <h1 className="text-xl md:text-[28px] text-blue-alt font-semibold">Edit Evaluator</h1>

            <button
              onClick={handleClose}
              className="p-4 md:p-6 text-offblack hover:text-[#979797] transition-colors duration-200 ease-in-out transform"
            >
              <Close className="fill-current" />
            </button>
          </div>
          <div className="">
            <SmallTitle text="Github" />
            <p className="py-1">{evaluator.user?.github_handle}</p>
            <SmallTitle text="Email" />
            <p className="py-1">{evaluator.user?.preferred_email}</p>
            <SubTitle text="Voice Credits" />
            <p className="py-1">{evaluator.voice_credits}</p>
            <button onClick={() => handleConfirmResetModal()}>Reset votes</button>
          </div>
          <div className="flex justify-evenly">
            <div>
              <Button small alt text="Cancel" onClick={handleClose} />
            </div>
            <div>
              <button
                onClick={() => console.log("save")}
                className="transition-colors duration-200 ease-in-out transform  outline-none focus:outline-none flex flex-row items-center justify-center rounded-md font-bold mx-auto border border-blue bg-blue hover:bg-blue-darkest hover:border-blue-darkest focus:bg-blue-darkest text-white text-lg px-3 py-1"
              >
                Save
              </button>
            </div>
          </div>
          <ConfirmResetModal
            open={openConfirmResetModal}
            handleClose={() => setOpenConfirmResetModal(false)}
            handleReset={reset}
          />
        </Box>
      </Fade>
    </Modal>
  );
};

export default EvaluatorEditModal;
