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

type RoundDetailsModalProps = {
  handleClose: () => void;
  open: boolean;
};

export default function RoundDetailsModal({ handleClose, open }: RoundDetailsModalProps) {
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
            <h1 className="text-xl md:text-[28px] text-blue-alt font-semibold">Round Details</h1>

            <button
              onClick={handleClose}
              className="p-4 md:p-6 text-offblack hover:text-[#979797] transition-colors duration-200 ease-in-out transform"
            >
              <Close className="fill-current" />
            </button>
          </div>
          <div className="md:text-lg">
            <p className="py-3">
              This Impact Evaluator (IE) round is part of the Space Warp program, which leads up to the mainnet launch
              of the Filecoin Virtual Machine (FVM). The recurring IE rounds crowdsource the community’s perspective on
              the most valuable work being done on the FVM, which populates the{" "}
              <span className="font-bold">FVM Builders Leaderboard</span> and directs the allocation of a $75,000 prize
              pool.
            </p>
            <p className="py-3">
              Impact Evaluators are a type of funding mechanism that Protocol Labs is working to define and grow. By
              transparently measuring, evaluating, and rewarding valuable projects over time, this project aims to
              increase the efficiency of public goods funding for the Filecoin ecosystem.
            </p>
            <p className="py-3">
              To learn more about Space Warp’s Impact Evaluator Rounds, see:
              <ul className="list-disc ml-6">
                <li>
                  <a
                    className="text-blue hover:text-blue-dark font-bold underline"
                    href="https://network-goods.notion.site/Impact-Evaluators-Builders-Leaderboard-602ea6755b5642e1ad6f9da59a47fa62"
                    target="_blank"
                    rel="noreferrer"
                  >
                    IE Round Overview & FAQ
                  </a>
                </li>
                <li>
                  <a
                    className="text-blue hover:text-blue-dark font-bold underline"
                    href="https://spacewarp.fvm.dev/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Space Warp Website
                  </a>
                  , which will feature Round 1 results of FVM Builders Leaderboard once the round is complete
                </li>
              </ul>
            </p>
          </div>
        </Box>
      </Fade>
    </Modal>
  );
}
