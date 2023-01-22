import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "../shared/Button";
import { useRouter } from "next/router";

const style = {
  position: "absolute" as "absolute",
  top: "40%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 473,
  bgcolor: "white",
  boxShadow: 24,
  py: 4,
  px: 5,
  borderRadius: "9.31292px",
};

type SubmitEvaluationModalProps = {
  handleSubmit: () => void;
  handleClose: () => void;
  open: boolean;
};

const SubmitEvaluationModal = ({
  handleSubmit,
  handleClose,
  open,
}: SubmitEvaluationModalProps) => {
  const router = useRouter();

  const submit = () => {
    handleSubmit();
    window.location.replace("/");
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
        <Box sx={style}>
          <h1 className="text-[28px] text-blue-alt font-semibold text-center">
            Submit Evaluation
          </h1>
          <p className="text-center py-6">
            Are you sure you would like to submit your evaluation for this
            Impact Evaluator round? This action cannot be undone, and your
            assessment will be final.
          </p>
          <div className="flex justify-evenly">
            <div>
              <Button small alt text="Cancel" onClick={handleClose} />
            </div>
            <div>
              <button
                onClick={() => submit()}
                className="transition-colors duration-200 ease-in-out transform  outline-none focus:outline-none flex flex-row items-center justify-center rounded-md font-bold mx-auto border border-blue bg-blue hover:bg-blue-darkest hover:border-blue-darkest focus:bg-blue-darkest text-white text-lg px-3 py-1"
              >
                Submit
              </button>
            </div>
          </div>
        </Box>
      </Fade>
    </Modal>
  );
};

export default SubmitEvaluationModal;
