import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Close from "public/images/svg/Close";
import Button from "src/components/shared/Button";

const style = {
  position: "absolute",
  bgcolor: "white",
  boxShadow: 24,
  borderRadius: "9.31292px",
};

type ConfirmResetModalProps = {
  handleClose: () => void;
  handleReset: () => void;
  open: boolean;
};

const ConfirmResetModal = ({ handleClose, handleReset, open }: ConfirmResetModalProps) => {
  const handleResetAndClose = () => {
    handleReset();
    handleClose();
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
        className="translate-x-[-5%] md:-translate-x-1/2 -translate-y-1/2 top-1/2 left-[10%] md:left-1/2 py-3 px-5 md:py-10 md:px-14 lg:w-[500px]"
      >
        <div className="flex justify-between items-center text-offblack">
          <h1 className="text-xl md:text-[28px] text-blue-alt font-semibold">Reset Votes</h1>

          <button
            onClick={handleClose}
            className="p-4 md:p-6 text-offblack hover:text-[#979797] transition-colors duration-200 ease-in-out transform"
          >
            <Close className="fill-current" />
          </button>
        </div>
        <div className="md:text-lg">
          <p className="py-3">Are you sure you would like to reset this users votes?</p>

          <p className="py-3">This action cannot be undone.</p>
        </div>
        <div className="flex justify-evenly">
          <div>
            <Button small alt text="Cancel" onClick={handleClose} />
          </div>
          <div>
            <button
              onClick={() => handleResetAndClose()}
              className="transition-colors duration-200 ease-in-out transform  outline-none focus:outline-none flex flex-row items-center justify-center rounded-md font-bold mx-auto border border-blue bg-blue hover:bg-blue-darkest hover:border-blue-darkest focus:bg-blue-darkest text-white text-lg px-3 py-1"
            >
              Reset
            </button>
          </div>
        </div>
      </Box>
    </Modal>
  );
};

export default ConfirmResetModal;
