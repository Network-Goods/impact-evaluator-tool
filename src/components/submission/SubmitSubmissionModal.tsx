import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "../shared/Button";

const style = {
  position: "absolute",
  maxWidth: 473,
  bgcolor: "white",
  boxShadow: 24,
  py: 4,
  px: 5,
  borderRadius: "9.31292px",
};

type SubmitSubmissionModalProps = {
  handleSubmit: () => void;
  handleClose: () => void;
  open: boolean;
};

export default function SubmitSubmissionModal({ handleSubmit, handleClose, open }: SubmitSubmissionModalProps) {
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
          className="translate-x-[-5%] md:-translate-x-1/2 -translate-y-1/2 top-[40%] left-[10%] md:left-1/2"
        >
          <h1 className="text-[28px] text-blue-alt font-semibold text-center">Submit to Round</h1>
          <p className="text-center py-6">Are you sure you would like to submit?</p>
          <div className="flex justify-evenly">
            <div>
              <Button small alt text="Cancel" onClick={handleClose} />
            </div>
            <div>
              <button
                onClick={() => handleSubmit()}
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
}
