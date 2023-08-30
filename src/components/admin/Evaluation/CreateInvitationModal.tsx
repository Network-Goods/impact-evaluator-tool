import { useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "src/components/shared/Button";
import EvaluationSubTitle from "./EvaluationSubTitle";

const style = {
  position: "absolute",
  bgcolor: "white",
  boxShadow: 24,
  borderRadius: "9.31292px",
};

type CreateInvitationModalProps = {
  handleClose: () => void;
  open: boolean;
  store: any;
};

const CreateInvitationModal = ({ handleClose, open, store }: CreateInvitationModalProps) => {
  const [inputs, setInputs] = useState<any>({ is_sme: false });
  const [error, setError] = useState("");

  const handleChange = (event: any) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values: any) => ({ ...values, [name]: value }));
  };

  const handleChecked = () => {
    setInputs((values: any) => ({ ...values, is_sme: !values.is_sme }));
  };
  const handleSubmit = async () => {
    const sanitizedInputs = {
      ...inputs,
      voice_credits: parseInt(inputs.voice_credits, 10),
      remaining_uses: parseInt(inputs.remaining_uses, 10),
    };
    const res = await store.createInvitation(sanitizedInputs);
    if (res && res.error) {
      setError(res.error);
    } else {
      handleClose();
      setInputs({});
    }
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
        className="translate-x-[-5%] md:-translate-x-1/2 -translate-y-1/2 top-1/2 left-[10%] md:left-1/2 py-3 px-5 md:py-10 md:px-14 lg:w-[750px]"
      >
        <h1 className="text-xl md:text-[28px] text-blue-alt font-semibold text-center">Create Code</h1>
        <div className="pb-10">
          <h4 className="font-bold pt-5 pb-3">Create unique code for Impact Evaluator round.</h4>
          <div className="grid lg:grid-cols-6 lg:gap-[18px]">
            <div className="col-span-3">
              <EvaluationSubTitle small text="Round code" />
              <input
                type="text"
                name="code"
                className="appearance-none w-full px-4 py-2 rounded-lg border border-gray focus:outline-none"
                placeholder="ExampleCode123"
                value={inputs.code || ""}
                onChange={handleChange}
              />
            </div>
            <div className="mr-4 lg:mr-0">
              <EvaluationSubTitle small text="Voice Credits" />
              <input
                type="number"
                name="voice_credits"
                className="appearance-none w-full px-4 py-2 rounded-lg border border-gray focus:outline-none"
                value={inputs.voice_credits || 0}
                onChange={handleChange}
              />
            </div>
            <div>
              <EvaluationSubTitle small text="Code Limit" />
              <input
                type="number"
                name="remaining_uses"
                className="appearance-none w-full px-4 py-2 rounded-lg border border-gray focus:outline-none"
                value={inputs.remaining_uses || 0}
                onChange={handleChange}
              />
            </div>
            {store.evaluation?.is_upload === false ? (
              <div>
                <EvaluationSubTitle small text="Form Submission" />
                <input
                  type="checkbox"
                  name="form"
                  checked={!inputs.is_sme || false}
                  onChange={() => handleChecked()}
                />{" "}
                <span className="text-sm">Required</span>
              </div>
            ) : null}
          </div>

          {error ? <p className="text-red text-sm">{error}</p> : null}
        </div>
        <div className="flex justify-evenly">
          <div>
            <Button small alt text="Cancel" onClick={handleClose} />
          </div>
          <div>
            <button
              onClick={() => handleSubmit()}
              className={`transition-colors duration-200 ease-in-out transform  outline-none focus:outline-none flex flex-row items-center justify-center rounded-md font-bold mx-auto border border-blue bg-blue text-white text-lg px-3 py-1
                ${
                  inputs.code && inputs.voice_credits && inputs.remaining_uses
                    ? "cursor-pointer hover:bg-blue-darkest hover:border-blue-darkest"
                    : "opacity-50 cursor-not-allowed"
                }
                `}
              disabled={inputs.code && inputs.voice_credits && inputs.remaining_uses ? false : true}
            >
              Create
            </button>
          </div>
        </div>
      </Box>
    </Modal>
  );
};

export default CreateInvitationModal;
