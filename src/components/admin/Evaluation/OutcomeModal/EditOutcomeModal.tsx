import { useState, useEffect, useRef } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Close from "public/images/svg/Close";
import Button from "src/components/shared/Button";
import Add from "public/images/svg/Add";
import Delete from "public/images/svg/Delete";
import Edit from "public/images/svg/Edit";
import SetLinkModal from "./SetLinkModal";
import SetGithubModal from "./SetGithubModal";

const style = {
  position: "absolute",
  bgcolor: "white",
  boxShadow: 24,
  borderRadius: "9.31292px",
};

type OutcomeModalProps = {
  handleClose: () => void;
  open: boolean;
  submission?: any;
  store: any;
};

const OutcomeModal = ({ handleClose, open, submission, store }: OutcomeModalProps) => {
  const storeSubmissionExists = submission && store.evaluation.submission.find((e: any) => e.id === submission.id);

  const nameRef = useRef<HTMLInputElement | null>(null);
  const summaryRef = useRef<HTMLTextAreaElement | null>(null);
  const descriptionRef = useRef<HTMLTextAreaElement | null>(null);
  const specsRef = useRef<HTMLTextAreaElement | null>(null);
  const [inputs, setInputs] = useState<any>({});
  const [openLinkModal, setOpenLinkModal] = useState(false);
  const [linkModalContent, setLinkModalContent] = useState({});
  const [openGithubModal, setOpenGithubModal] = useState(false);
  const [githubModalContent, setGithubModalContent] = useState({});
  const [titleState, setTitleState] = useState(storeSubmissionExists?.name);
  const [links, setLinks] = useState<any>(storeSubmissionExists?.links);
  const [githubLink, setGithubLink] = useState<any>(storeSubmissionExists?.github_link);
  const [githubHandle, setGithubHandle] = useState<any>(storeSubmissionExists?.github_link);
  const [summary, setSummary] = useState<any>(storeSubmissionExists?.description.summary);
  const [description, setDescription] = useState<any>(storeSubmissionExists?.description.description);
  const [specs, setSpecs] = useState<any>(storeSubmissionExists?.description.specs);

  const handleOpenLinkModal = (link?: any) => {
    setLinkModalContent(link ? link : null);
    setOpenLinkModal(true);
  };
  const handleCloseLinkModal = () => {
    setOpenLinkModal(false);
    setLinkModalContent({});
  };
  const handleOpenGithubModal = (link?: any) => {
    setGithubModalContent(link ? link : null);
    setOpenGithubModal(true);
  };
  const handleCloseGithubModal = () => {
    setOpenGithubModal(false);
    setGithubModalContent({});
  };

  const handleDeleteSubmission = () => {
    store.deleteSubmission(submission.id);
    handleClose();
    setInputs({});
  };

  useEffect(() => {
    setLinks(storeSubmissionExists?.links);
    setGithubLink(storeSubmissionExists?.github_link);
    setGithubHandle(storeSubmissionExists?.github_handle);
    setTitleState(storeSubmissionExists?.name);
    setSummary(storeSubmissionExists?.description.summary);
    setDescription(storeSubmissionExists?.description.description);
    setSpecs(storeSubmissionExists?.description.specs);
  }, [storeSubmissionExists]);

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
        className="translate-x-[-5%] md:-translate-x-1/2 -translate-y-1/2 top-1/2 left-[10%] md:left-1/2 py-3 px-5 md:py-10 md:px-14 lg:w-[1166px] text-offblack"
      >
        <h1 className="text-center text-xl md:text-[28px] text-blue-alt font-semibold">Edit Outcome</h1>

        <button
          onClick={handleClose}
          className="absolute top-0 right-0 p-4 md:p-8 text-offblack hover:text-[#979797] transition-colors duration-200 ease-in-out transform"
        >
          <Close className="fill-current" />
        </button>
        <div className="flex py-8">
          <div className="flex-1 md:text-lg">
            <div className="flex items-center pb-7">
              <div className="font-bold py-2 px-4 border border-gray border-r-0 rounded-l-lg bg-blue bg-opacity-5">
                Title
              </div>
              <input
                ref={nameRef}
                type="text"
                name="name"
                className="appearance-none w-full px-4 py-2 rounded-r-lg border border-gray focus:outline-none"
                placeholder="Example Title"
                value={titleState || ""}
                onChange={(e) => setTitleState(e.target.value)}
                onBlur={(e) => store.setSubmissionTitle(submission.id, e.target.value)}
              />
            </div>
            <p className="font-bold pb-1">Project Description</p>
            <textarea
              ref={descriptionRef}
              className="w-full min-h-[112px] px-8 py-3 rounded-lg border border-gray focus:outline-none"
              placeholder="XYZ is..."
              name="description"
              value={description || ""}
              onChange={(e) => setDescription(e.target.value)}
              onBlur={(e) => store.setSubmissionDescription("description", submission.id, e.target.value)}
            />
            <p className="font-bold pb-1">Progress Summary</p>

            <textarea
              ref={summaryRef}
              className="w-full min-h-[112px] px-8 py-3 rounded-lg border border-gray focus:outline-none"
              placeholder="XYZ is..."
              name="summary"
              value={summary || ""}
              onChange={(e) => setSummary(e.target.value)}
              onBlur={(e) => store.setSubmissionDescription("summary", submission.id, e.target.value)}
            />
            <p className="font-bold pb-1">FVM Tech Specs</p>
            <textarea
              ref={specsRef}
              className="w-full min-h-[112px] px-8 py-3 rounded-lg border border-gray focus:outline-none"
              placeholder="XYZ is..."
              name="specs"
              value={specs || ""}
              onChange={(e) => setSpecs(e.target.value)}
              onBlur={(e) => store.setSubmissionDescription("specs", submission.id, e.target.value)}
            />
          </div>
          <div className="flex flex-col justify-between ml-8 lg:min-w-[240px]">
            <div>
              <div className="pb-7">
                <button
                  className="transition-colors duration-200 ease-in-out transform  outline-none focus:outline-none flex flex-row items-center justify-center rounded-md font-bold border border-blue hover:bg-white focus:bg-white text-blue text-lg px-4 py-2"
                  onClick={() => handleOpenLinkModal()}
                >
                  <span className="mr-3">
                    <Add className="fill-current" />
                  </span>

                  <span>Add Link</span>
                </button>
              </div>
              <p className="font-bold pb-1">Links</p>
              <div className="py-1">
                <button
                  className="flex items-center justify-center px-3 py-1 border border-[#dbdbdb] rounded-lg"
                  onClick={() => handleOpenGithubModal(githubLink)}
                >
                  <span className="mr-3">
                    <Edit className="w-3 h-3 fill-offblack" />
                  </span>
                  <span>Github</span>
                </button>
              </div>
              {links &&
                links.map((link: any, idx: number) => {
                  return (
                    <div className="flex justify-between py-1" key={idx}>
                      <button
                        className="flex items-center justify-center px-3 py-1 border border-[#dbdbdb] rounded-lg"
                        onClick={() => handleOpenLinkModal(link)}
                      >
                        <span className="mr-3">
                          <Edit className="w-3 h-3 fill-offblack" />
                        </span>
                        <span>{link.name}</span>
                      </button>
                      <div>
                        <button
                          onClick={() => store.deleteSubmissionLink(link.name, submission.id)}
                          className="bg-blue bg-opacity-5 px-3 py-[6.5px] rounded-lg"
                        >
                          <Delete className="w-3 h-5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
            </div>
            <div>
              <p className="font-bold pb-1">GitHub handle for representative:</p>
              <input
                type="text"
                name="github_handle"
                className="appearance-none w-full px-4 py-2 rounded-lg border border-gray focus:outline-none"
                placeholder="geohot"
                value={githubHandle || ""}
                onChange={(e) => setGithubHandle(e.target.value)}
                onBlur={(e) => store.setGithubHandle(submission.id, e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="flex justify-between">
          <div>
            <Button small secondary text="Delete" onClick={() => handleDeleteSubmission()} />
          </div>
          <div className="flex">
            <div>
              <Button small alt text="Cancel" onClick={handleClose} />
            </div>
            <div className="ml-4">
              <button
                onClick={handleClose}
                className="transition-colors duration-200 ease-in-out transform  outline-none focus:outline-none flex flex-row items-center justify-center rounded-md font-bold mx-auto border border-blue bg-blue hover:bg-blue-darkest hover:border-blue-darkest focus:bg-blue-darkest text-white text-lg px-3 py-1"
              >
                Save
              </button>
            </div>
          </div>
        </div>
        <SetLinkModal
          store={store}
          submission={submission}
          open={openLinkModal}
          link={linkModalContent}
          handleClose={() => handleCloseLinkModal()}
        />

        <SetGithubModal
          store={store}
          submission={submission}
          open={openGithubModal}
          link={githubModalContent}
          handleClose={() => handleCloseGithubModal()}
          newInputs={inputs}
          setNewInputs={setInputs}
        />
      </Box>
    </Modal>
  );
};

export default OutcomeModal;
