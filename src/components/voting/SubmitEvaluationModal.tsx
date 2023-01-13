import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "../Button";

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
  handleClose: () => void;
  open: boolean;
};

const SubmitEvaluationModal = ({
  handleClose,
  open,
}: SubmitEvaluationModalProps) => {
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
              <Button
                small
                text="Submit"
                onClick={() => console.log("submit")}
              />
            </div>
          </div>
        </Box>
      </Fade>
    </Modal>
  );
};

export default SubmitEvaluationModal;
