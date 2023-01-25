import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Close from "public/images/svg/Close";
import SubTitle from "src/components/shared/SubTitle";
import Button from "src/components/shared/Button";

const style = {
  position: "absolute",
  bgcolor: "white",
  boxShadow: 24,
  borderRadius: "9.31292px",
};

type OutcomeEditModalProps = {
  handleClose: () => void;
  open: boolean;
  submission: any;
};

const OutcomeEditModal = ({ handleClose, open, submission }: OutcomeEditModalProps) => {
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
            <h1 className="text-xl md:text-[28px] text-blue-alt font-semibold">Edit Outcome</h1>

            <button
              onClick={handleClose}
              className="p-4 md:p-6 text-offblack hover:text-[#979797] transition-colors duration-200 ease-in-out transform"
            >
              <Close className="fill-current" />
            </button>
          </div>
          <div className="md:text-lg">
            <SubTitle text="Name" />
            <p className="py-3">{submission.name}</p>
            <SubTitle text="Project Summary" />
            <p className="py-3">{submission.description?.summary}</p>
            <SubTitle text="Progress Description" />
            <p className="py-3">{submission.description?.description}</p>
            <SubTitle text="FVM Tech Specs" />
            <p className="py-3">{submission.description?.specs}</p>
            <SubTitle text="Links" />
            <p className="py-1">Github: {submission.github_link}</p>
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
                onClick={() => console.log("save")}
                className="transition-colors duration-200 ease-in-out transform  outline-none focus:outline-none flex flex-row items-center justify-center rounded-md font-bold mx-auto border border-blue bg-blue hover:bg-blue-darkest hover:border-blue-darkest focus:bg-blue-darkest text-white text-lg px-3 py-1"
              >
                Save
              </button>
            </div>
          </div>
        </Box>
      </Fade>
    </Modal>
  );
};

export default OutcomeEditModal;
