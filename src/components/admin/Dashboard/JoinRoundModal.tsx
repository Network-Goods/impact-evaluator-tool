import { useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Close from "public/images/svg/Close";

const style = {
  position: "absolute" as "absolute",
  top: "40%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 793,
  bgcolor: "white",
  boxShadow: 24,
  py: 2,
  pl: 8,
  pr: 6,
  borderRadius: "9.31292px",
};

type JoinRoundModalProps = {
  handleClose: () => void;
  open: boolean;
};

const JoinRoundModal = ({ handleClose, open }: JoinRoundModalProps) => {
  const [inputs, setInputs] = useState({});

  const handleChange = (event: any) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("inputs", inputs);
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
          <div className="flex justify-between items-center">
            <h1 className="text-[28px] text-[#346dee] font-semibold">
              Join an Impact Evaluator Round
            </h1>

            <button
              onClick={handleClose}
              className="p-6 text-[#333333] hover:text-[#979797] transition-colors duration-200 ease-in-out transform"
            >
              <Close className="fill-current" />{" "}
            </button>
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col max-w-xl">
            <label className="my-2" htmlFor="code">
              Enter the unique round code:
              <input
                className="appearance-none border rounded-lg w-full py-2 px-3 mt-3 text-gray font-medium placeholder-gray-light focus:outline-none"
                type="text"
                name="code"
                //@ts-ignore
                value={inputs.code || ""}
                onChange={handleChange}
              />
            </label>
            <label className="mb-2 mt-5" htmlFor="email">
              Enter email address:
              <br />
              <p className="text-sm text-[#979797]">
                Emails are used by round administrators to share details about
                the Impact Evaluator.
              </p>
              <input
                className="appearance-none border rounded-lg w-full py-2 px-3 mt-3 text-gray font-medium placeholder-gray-light focus:outline-none"
                type="text"
                name="email"
                //@ts-ignore
                value={inputs.email || ""}
                onChange={handleChange}
              />
            </label>
            <input
              className="transition-colors duration-200 ease-in-out transform outline-none focus:outline-none flex flex-row items-center justify-center rounded-md font-bold mx-auto
                px-6 py-1 border border-[#156ff7] bg-[#156ff7] hover:bg-[#002256] hover:border-[#002256] focus:bg-[#002256] text-white text-lg cursor-pointer my-8"
              type="submit"
              value="Join"
            />
          </form>
        </Box>
      </Fade>
    </Modal>
  );
};

export default JoinRoundModal;
