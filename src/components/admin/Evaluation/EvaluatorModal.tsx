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

type EvaluatorModalProps = {
  handleClose: () => void;
  handleReset: (id: string) => void;
  open: boolean;
  evaluator?: any;
  store: any;
};

const EvaluatorModal = ({ handleClose, handleReset, open, evaluator, store }: EvaluatorModalProps) => {
  const creditsRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const [openConfirmResetModal, setOpenConfirmResetModal] = useState(false);
  const [credits, setCredits] = useState(evaluator ? evaluator.voice_credits : 0);
  const [emailState, setEmailState] = useState(evaluator ? evaluator.user?.preferred_email : "");

  const [inputs, setInputs] = useState<any>({});

  const reset = () => {
    handleReset(evaluator.id);
  };

  useEffect(() => {
    if (evaluator) {
      setCredits(evaluator.voice_credits);
      setEmailState(evaluator.user?.preferred_email);
    }
  }, [evaluator]);

  const handleBlurEmail = (e: any) => {
    if (evaluator) {
      store.setEmail(evaluator.id, evaluator.user.id, e.target.value);
    }
  };

  const handleBlurCredits = (e: any) => {
    if (evaluator) {
      store.setVoiceCredits(evaluator.id, e.target.value);
    }
  };

  const handleChange = (event: any) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values: any) => ({ ...values, [name]: value }));
    console.log("inputs", inputs);
  };

  const handleSubmit = () => {
    store.createEvaluator(inputs);
    handleClose();
    setInputs({});
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
        className="translate-x-[-5%] md:-translate-x-1/2 -translate-y-1/2 top-1/2 left-[10%] md:left-1/2 py-3 px-5 md:py-10 md:px-14 lg:w-[450px]"
      >
        <h1 className="text-xl md:text-[28px] text-blue-alt font-semibold text-center">
          {evaluator ? "Edit" : "Create"} Evaluator
        </h1>
        <div className="pb-10">
          <EvaluationSubTitle small text="Github:" />
          {evaluator ? (
            <p className="py-1 mb-2">@{evaluator.user?.github_handle}</p>
          ) : (
            <input
              type="text"
              name="github"
              className="appearance-none w-full px-4 py-2 rounded-lg border border-gray focus:outline-none "
              value={inputs.github || ""}
              onChange={handleChange}
            />
          )}
          <EvaluationSubTitle small text="Email:" />
          <div className="py-1 mb-2">
            <div className="flex items-center justify-between">
              <input
                ref={emailRef}
                type="text"
                name="email"
                className={`appearance-none w-full py-2 rounded-lg border focus:outline-none ${
                  evaluator ? "mr-4 border-transparent focus:border-gray focus:px-4" : "border-gray px-4"
                }`}
                value={evaluator ? emailState || "" : inputs.email || ""}
                onChange={evaluator ? (e) => setEmailState(e.target.value) : handleChange}
                onBlur={(e) => handleBlurEmail(e.target.value)}
              />
              {evaluator ? (
                <div>
                  <button onClick={() => emailRef.current?.focus()} className="border border-blue rounded p-1">
                    <Edit />
                  </button>
                </div>
              ) : null}
            </div>
          </div>
          <span className="font-bold">Voice Credits</span>
          <div className="py-1">
            <div className="flex items-center justify-between">
              <input
                ref={creditsRef}
                type="number"
                name="credits"
                className={`appearance-none w-full py-2 rounded-lg border focus:outline-none ${
                  evaluator ? "mr-4 border-transparent focus:border-gray focus:px-4" : "border-gray px-4"
                }`}
                value={evaluator ? credits || 0 : inputs.credits || 0}
                onChange={evaluator ? (e) => setCredits(e.target.value) : handleChange}
                onBlur={(e) => handleBlurCredits(e.target.value)}
              />
              {evaluator ? (
                <div>
                  <button onClick={() => creditsRef.current?.focus()} className="border border-blue rounded p-1">
                    <Edit />
                  </button>
                </div>
              ) : null}
            </div>
          </div>
          {evaluator ? (
            <>
              <button onClick={() => setOpenConfirmResetModal(true)} className="border border-[#898888] rounded p-1">
                <Reset className="fill-[#898888] w-3 h-3" />
              </button>
              <span className="font-bold ml-2">Reset user's votes</span>
            </>
          ) : null}
        </div>
        <div className="flex justify-evenly">
          <div>
            <Button small alt text="Cancel" onClick={handleClose} />
          </div>
          <div>
            <button
              onClick={evaluator ? handleClose : () => handleSubmit()}
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
};

export default EvaluatorModal;
