import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Close from "public/images/svg/Close";

const style = {
  position: "absolute",
  bgcolor: "white",
  boxShadow: 24,
  borderRadius: "9.31292px",
};

type QuadraticVotingModalProps = {
  handleClose: () => void;
  open: boolean;
};

const QuadraticVotingModal = ({ handleClose, open }: QuadraticVotingModalProps) => {
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
            <h1 className="text-xl md:text-[28px] text-blue-alt font-semibold">What is Quadratic Voting?</h1>

            <button
              onClick={handleClose}
              className="p-4 md:p-6 text-offblack hover:text-[#979797] transition-colors duration-200 ease-in-out transform"
            >
              <Close className="fill-current" />
            </button>
          </div>
          <div className="md:text-lg">
            <p className="py-3">
              Quadratic Voting is a voting method that allows participants to indicate their strength of conviction in
              support of items in a list of options. Participants receive a budget of{" "}
              <span className="font-bold">voice credits</span>, which they allocate to different items on the ballot to
              signal the <span className="italic">intensity of their preferences</span>.
            </p>
            <p className="py-3">
              Those voice credits convert to <span className="font-bold"> counted votes</span> according to their square
              root. For example, if a voter puts one voice credit towards an issue, that equals one counted vote; four
              credits are two votes; nine credits are three votes, and so on.
            </p>
            <p className="py-3">
              To learn more about Quadratic Voting, see:
              <ul className="list-disc ml-6">
                <li>
                  <a
                    className="text-blue hover:text-blue-dark font-bold underline"
                    href="https://www.radicalxchange.org/concepts/plural-voting/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Plural (or Quadratic) Voting
                  </a>{" "}
                  | RadicalxChange
                </li>
                <li className="">
                  <a
                    className="text-blue hover:text-blue-dark font-bold underline"
                    href="https://www.economist.com/interactive/2021/12/18/quadratic-voting/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Quadratic Voting Tool
                  </a>{" "}
                  | The Economist
                </li>
              </ul>
            </p>
          </div>
        </Box>
      </Fade>
    </Modal>
  );
};

export default QuadraticVotingModal;
