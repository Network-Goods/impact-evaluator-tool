import { useState, useEffect, useRef } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "src/components/shared/Button";
import Close from "public/images/svg/Close";

const style = {
  position: "absolute",
  bgcolor: "white",
  boxShadow: 24,
  borderRadius: "9.31292px",
};

type SetGithubModalProps = {
  handleClose: () => void;
  open: boolean;
  submission: any;
  link?: any;
  store: any;
  newInputs?: any;
  setNewInputs?: any;
};

const SetGithubModal = ({
  handleClose,
  link,
  submission,
  open,
  store,
  newInputs,
  setNewInputs,
}: SetGithubModalProps) => {
  const linkRef = useRef<HTMLInputElement | null>(null);
  const [inputs, setInputs] = useState<any>({});
  const [linkState, setLinkState] = useState(link ? link : "");

  const handleChange = (event: any) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values: any) => ({ ...values, [name]: value }));
    console.log("inputs", inputs);
  };
  const handleNewChange = (event: any) => {
    const name = event.target.name;
    const value = event.target.value;
    setNewInputs((values: any) => ({ ...values, [name]: value }));
    console.log("inputs", newInputs);
  };

  const handleBlurLink = (value: any) => {
    if (link) {
      store.setGithubLink(submission.id, value);
    }
  };
  const handleCreateLink = () => {
    store.setGithubLink(submission.id, inputs.github_link);
    handleClose();
    setInputs({});
  };

  useEffect(() => {
    if (link) {
      setLinkState(link);
    }
  }, [link]);

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
        className="translate-x-[-5%] md:-translate-x-1/2 -translate-y-1/2 top-1/2 left-[10%] md:left-1/2 py-3 px-5 md:py-10 md:px-14 lg:w-[640px]"
      >
        <div className="flex justify-between items-center text-offblack">
          <h1 className="text-[28px] text-blue-alt font-semibold">{link ? "Edit" : "Add"} Github Repo</h1>

          <button
            onClick={handleClose}
            className="p-6 text-offblack hover:text-[#979797] transition-colors duration-200 ease-in-out transform"
          >
            <Close className="fill-current" />
          </button>
        </div>

        <div>
          <p className="font-bold pt-7 pb-1">Link</p>
          <input
            ref={linkRef}
            type="text"
            name="github_link"
            className="appearance-none w-full px-4 py-2 rounded-lg border border-gray focus:outline-none"
            placeholder="https://github.com/protocol/research"
            value={submission ? (link ? linkState || "" : inputs.github_link || "") : newInputs.github_link || ""}
            onChange={submission ? (link ? (e) => setLinkState(e.target.value) : handleChange) : handleNewChange}
            onBlur={(e) => handleBlurLink(e.target.value)}
          />
        </div>
        <hr className="my-6 border-[#f0f0f0]" />
        <div className="flex justify-evenly">
          <div>
            <Button small alt text="Cancel" onClick={handleClose} />
          </div>
          <div>
            <button
              onClick={submission ? (link ? handleClose : handleCreateLink) : handleClose}
              className={`transition-colors duration-200 ease-in-out transform  outline-none focus:outline-none flex flex-row items-center justify-center rounded-md font-bold mx-auto border border-blue bg-blue text-white text-lg px-3 py-1
               `}
            >
              Save Link
            </button>
          </div>
        </div>
      </Box>
    </Modal>
  );
};

export default SetGithubModal;
