import { useState, useEffect, useRef } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import ConfirmResetModal from "./ConfirmResetModal";
import Button from "src/components/shared/Button";
import EvaluationSubTitle from "./EvaluationSubTitle";
import Reset from "public/images/svg/Reset";
import Edit from "public/images/svg/Edit";

const style = {
  position: "absolute",
  bgcolor: "white",
  boxShadow: 24,
  borderRadius: "9.31292px",
};

type CreateInvitationModalProps = {
  handleClose: () => void;
  handleReset: (id: string) => void;
  open: boolean;
  evaluator: any;
  store: any;
};

const CreateInvitationModal = ({ handleClose, handleReset, open, evaluator, store }: CreateInvitationModalProps) => {
  const creditsRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const [openConfirmResetModal, setOpenConfirmResetModal] = useState(false);
  const [credits, setCredits] = useState(evaluator.voice_credits);
  const [emailState, setEmailState] = useState(evaluator.user?.preferred_email);

  const reset = () => {
    handleReset(evaluator.id);
  };

  useEffect(() => {
    setCredits(evaluator.voice_credits);
    setEmailState(evaluator.user?.preferred_email);
  }, [evaluator]);

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
          className="translate-x-[-5%] md:-translate-x-1/2 -translate-y-1/2 top-1/2 left-[10%] md:left-1/2 py-3 px-5 md:py-10 md:px-14 lg:w-[750px]"
        >
          <h1 className="text-xl md:text-[28px] text-blue-alt font-semibold text-center">Create Code</h1>
          <div className="pb-10">
            <h4 className="font-bold pt-5 pb-3">Create unique code for Impact Evaluator round.</h4>
            <div className="grid lg:grid-cols-6 lg:gap-[18px]">
              <div className="col-span-4">
                <EvaluationSubTitle small text="Round code" />
                <input
                  type="text"
                  className="appearance-none w-full px-4 py-2 rounded-lg border border-gray focus:outline-none"
                />
              </div>
              <div>
                <EvaluationSubTitle small text="Voice Credits" />
                <input
                  type="number"
                  className="appearance-none w-full px-4 py-2 rounded-lg border border-gray focus:outline-none"
                />
              </div>
              <div>
                <EvaluationSubTitle small text="Code Limit" />
                <input
                  type="number"
                  className="appearance-none w-full px-4 py-2 rounded-lg border border-gray focus:outline-none"
                />
              </div>
            </div>
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

export default CreateInvitationModal;
