import { useState, useEffect } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Close from "public/images/svg/Close";
import Submission from "src/components/shared/Submission";
import { SubmissionFormInputs } from "src/lib";
import Button from "src/components/shared/Button";
import { submissionFormCustomFieldsCheck } from "src/lib/utils";

const style = {
  position: "absolute",
  bgcolor: "white",
  boxShadow: 24,
  borderRadius: "9.31292px",
  height: "90%",
};

type OutcomeModalProps = {
  handleClose: () => void;
  open: boolean;
  submission?: any;
  store: any;
  evaluation_id: string | string[] | undefined;
};

const OutcomeModal = ({ handleClose, open, submission, store }: OutcomeModalProps) => {
  const storeSubmissionExists = submission && store.evaluation.submission.find((e: any) => e.id === submission.id);

  const [formInputs, setFormInputs] = useState<SubmissionFormInputs>({
    name: storeSubmissionExists?.name,
    evaluation_field: store.evaluation.evaluation_field || [],
    description: storeSubmissionExists?.description.description,
    summary: storeSubmissionExists?.description.summary,
    specs: storeSubmissionExists?.description.specs,
    github_link: storeSubmissionExists?.github_link,
    links: storeSubmissionExists?.links || [],
    githubHandle: storeSubmissionExists?.github_handle || "",
    user_id: storeSubmissionExists?.user_id,
  });

  const handleSubmit = () => {
    store.setSubmission(submission?.id);
    handleClose();
  };
  const handleDeleteSubmission = () => {
    store.deleteSubmission(submission?.id);
    handleClose();
  };
  useEffect(() => {
    setFormInputs({
      name: storeSubmissionExists?.name,
      evaluation_field: store.evaluation.evaluation_field,
      description: storeSubmissionExists?.description.description,
      summary: storeSubmissionExists?.description.summary,
      specs: storeSubmissionExists?.description.specs,
      github_link: storeSubmissionExists?.github_link,
      links: storeSubmissionExists?.links || [],
      githubHandle: storeSubmissionExists?.github_handle || "",
      user_id: storeSubmissionExists?.user_id,
    });
  }, [storeSubmissionExists]);

  const isDisabled =
    !formInputs.name ||
    !formInputs.github_link ||
    !formInputs.githubHandle ||
    !formInputs.user_id ||
    !submissionFormCustomFieldsCheck(formInputs, submission?.id);
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
        className="translate-x-[-5%] xl:-translate-x-1/2 -translate-y-1/2 top-1/2 left-[10%] xl:left-1/2 py-3 px-5 xl:py-10 xl:px-14 xl:w-[1166px] text-offblack overflow-y-auto"
      >
        <h1 className="text-center text-xl md:text-[28px] text-blue-alt font-semibold">Edit Outcome</h1>

        <button
          onClick={handleClose}
          className="absolute top-0 right-0 p-4 md:p-8 text-offblack hover:text-[#979797] transition-colors duration-200 ease-in-out transform"
        >
          <Close className="fill-current" />
        </button>
        <Submission
          store={store}
          formInputs={formInputs}
          setFormInputs={setFormInputs}
          submission={submission}
          submission_id={submission?.id}
        />
        <div className="flex justify-between mt-14">
          <div>
            <Button small secondary text="Delete" onClick={() => handleDeleteSubmission()} />
          </div>
          <div className="flex">
            <div>
              <Button small alt text="Cancel" onClick={handleClose} />
            </div>
            <div className="ml-4">
              <button
                onClick={handleSubmit}
                className={`transition-colors duration-200 ease-in-out transform  outline-none focus:outline-none flex flex-row items-center justify-center rounded-md font-bold mx-auto border border-blue bg-blue  text-white text-lg px-3 py-1
                ${
                  isDisabled
                    ? "opacity-50 cursor-not-allowed"
                    : "cursor-pointer hover:bg-blue-darkest hover:border-blue-darkest"
                }
                `}
                disabled={isDisabled}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      </Box>
    </Modal>
  );
};

export default OutcomeModal;
