import { useState, useEffect, useRef } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
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

type EvaluatorModalProps = {
  handleClose: () => void;
  handleReset: (id: string) => void;
  open: boolean;
  evaluator: any;
  store: any;
};

export default function EvaluatorModal({ handleClose, handleReset, open, evaluator, store }: EvaluatorModalProps) {
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
      <Box
        sx={style}
        className="translate-x-[-5%] md:-translate-x-1/2 -translate-y-1/2 top-1/2 left-[10%] md:left-1/2 py-3 px-5 md:py-10 md:px-14 lg:w-[450px]"
      >
        <h1 className="text-xl md:text-[28px] text-blue-alt font-semibold text-center">Edit Evaluator</h1>
        <div className="pb-10">
          <EvaluationSubTitle small text="Github:" />
          <p className="py-1 mb-2">@{evaluator.user?.github_handle}</p>

          <EvaluationSubTitle small text="Email:" />
          <div className="py-1 mb-2">
            <div className="flex items-center justify-between">
              <input
                ref={emailRef}
                type="text"
                name="email"
                className={`appearance-none w-full py-2 rounded-lg border focus:outline-none mr-4 border-transparent focus:border-gray focus:px-4`}
                value={emailState || ""}
                onChange={(e) => setEmailState(e.target.value)}
                onBlur={(e) => store.setEmail(evaluator.id, evaluator.user.id, e.target.value)}
              />
              <div>
                <button onClick={() => emailRef.current?.focus()} className="border border-blue rounded p-1">
                  <Edit />
                </button>
              </div>
            </div>
          </div>
          <span className="font-bold">Voice Credits</span>
          <div className="py-1">
            <div className="flex items-center justify-between">
              <input
                ref={creditsRef}
                type="number"
                name="credits"
                className={`appearance-none w-full py-2 rounded-lg border focus:outline-none mr-4 border-transparent focus:border-gray focus:px-4`}
                value={credits || 0}
                onChange={(e) => setCredits(e.target.value)}
                onBlur={(e) => store.setVoiceCredits(evaluator.id, e.target.value)}
              />
              <div>
                <button onClick={() => creditsRef.current?.focus()} className="border border-blue rounded p-1">
                  <Edit />
                </button>
              </div>
            </div>
          </div>
          <>
            <button onClick={() => setOpenConfirmResetModal(true)} className="border border-[#898888] rounded p-1">
              <Reset className="fill-[#898888] w-3 h-3" />
            </button>
            <span className="font-bold ml-2">Reset user&#39;s votes</span>
          </>
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
    </Modal>
  );
}
