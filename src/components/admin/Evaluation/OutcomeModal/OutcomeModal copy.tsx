import { useState, useEffect, useRef } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Close from "public/images/svg/Close";
import Button from "src/components/shared/Button";
import Add from "public/images/svg/Add";
import Delete from "public/images/svg/Delete";
import Edit from "public/images/svg/Edit";
import SetLinkModal from "../SetLinkModal";
import SetGithubModal from "../SetGithubModal";

const style = {
  position: "absolute",
  bgcolor: "white",
  boxShadow: 24,
  borderRadius: "9.31292px",
};

type EditOutcomeModalProps = {
  handleClose: () => void;
  open: boolean;
  submission?: any;
  store: any;
};

const EditOutcomeModal = ({ handleClose, open, submission, store }: EditOutcomeModalProps) => {
  const nameRef = useRef<HTMLInputElement | null>(null);
  const summaryRef = useRef<HTMLTextAreaElement | null>(null);
  const descriptionRef = useRef<HTMLTextAreaElement | null>(null);
  const specsRef = useRef<HTMLTextAreaElement | null>(null);
  const [inputs, setInputs] = useState<any>({});
  const [newLinks, setNewLinks] = useState<any>({});
  const [openLinkModal, setOpenLinkModal] = useState(false);
  const [linkModalContent, setLinkModalContent] = useState({});
  const [openGithubModal, setOpenGithubModal] = useState(false);
  const [githubModalContent, setGithubModalContent] = useState({});
  const [titleState, setTitleState] = useState(
    submission && store.evaluation.submission.find((e: any) => e.id === submission.id)
      ? store.evaluation.submission.find((e: any) => e.id === submission.id).name
      : "",
  );
  const [links, setLinks] = useState<any>(
    submission && store.evaluation.submission.find((e: any) => e.id === submission.id)
      ? store.evaluation.submission.find((e: any) => e.id === submission.id).links
      : null,
  );
  const [githubLink, setGithubLink] = useState<any>(
    submission && store.evaluation.submission.find((e: any) => e.id === submission.id)
      ? store.evaluation.submission.find((e: any) => e.id === submission.id).github_link
      : null,
  );
  const [summary, setSummary] = useState<any>(
    submission && store.evaluation.submission.find((e: any) => e.id === submission.id)
      ? store.evaluation.submission.find((e: any) => e.id === submission.id).description.summary
      : "",
  );
  const [description, setDescription] = useState<any>(
    submission && store.evaluation.submission.find((e: any) => e.id === submission.id)
      ? store.evaluation.submission.find((e: any) => e.id === submission.id).description.description
      : "",
  );
  const [specs, setSpecs] = useState<any>(
    submission && store.evaluation.submission.find((e: any) => e.id === submission.id)
      ? store.evaluation.submission.find((e: any) => e.id === submission.id).description.specs
      : "",
  );

  const handleChange = (event: any) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values: any) => ({ ...values, [name]: value }));
    console.log("inputs", inputs);
  };

  const handleBlurTitle = (value: any) => {
    if (submission) {
      store.setSubmissionTitle(submission.id, value);
    }
  };

  const handleBlurDescription = (type: string, value: any) => {
    if (submission) {
      store.setSubmissionDescription(type, submission.id, value);
    }
  };

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

  const handleSubmit = () => {
    // store.createLiveSubmission(inputs);
    // handleClose();
    // setInputs({});
    console.log("hello");
  };

  const handleDeleteSubmission = () => {
    store.deleteSubmission(submission.id);
    handleClose();
    setInputs({});
  };

  useEffect(() => {
    if (submission) {
      setLinks(
        store.evaluation.submission.find((e: any) => e.id === submission.id) &&
          store.evaluation.submission.find((e: any) => e.id === submission.id).links,
      );
      setGithubLink(
        store.evaluation.submission.find((e: any) => e.id === submission.id) &&
          store.evaluation.submission.find((e: any) => e.id === submission.id).github_link,
      );
      setTitleState(
        store.evaluation.submission.find((e: any) => e.id === submission.id) &&
          store.evaluation.submission.find((e: any) => e.id === submission.id).name,
      );
      setSummary(
        store.evaluation.submission.find((e: any) => e.id === submission.id) &&
          store.evaluation.submission.find((e: any) => e.id === submission.id).description.summary,
      );
      setDescription(
        store.evaluation.submission.find((e: any) => e.id === submission.id) &&
          store.evaluation.submission.find((e: any) => e.id === submission.id).description.description,
      );
      setSpecs(
        store.evaluation.submission.find((e: any) => e.id === submission.id) &&
          store.evaluation.submission.find((e: any) => e.id === submission.id).description.specs,
      );
    }
  }, [store, submission]);

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
        <h1 className="text-center text-xl md:text-[28px] text-blue-alt font-semibold">
          {submission ? "Edit" : "Create"} Outcome
        </h1>

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
                placeholder="Example Title 1"
                value={submission ? titleState || "" : inputs.name || ""}
                onChange={submission ? (e) => setTitleState(e.target.value) : handleChange}
                onBlur={(e) => handleBlurTitle(e.target.value)}
              />
            </div>
            <p className="font-bold pb-1">Project Summary</p>
            <textarea
              ref={summaryRef}
              className="w-full min-h-[112px] px-8 py-3 rounded-lg border border-gray focus:outline-none"
              placeholder="XYZ is..."
              name="summary"
              value={submission ? summary || "" : inputs.summary || ""}
              onChange={submission ? (e) => setSummary(e.target.value) : handleChange}
              onBlur={(e) => handleBlurDescription("summary", e.target.value)}
            />
            <p className="font-bold pb-1">Progress Description</p>

            <textarea
              ref={descriptionRef}
              className="w-full min-h-[112px] px-8 py-3 rounded-lg border border-gray focus:outline-none"
              placeholder="XYZ is..."
              name="description"
              value={submission ? description || "" : inputs.description || ""}
              onChange={submission ? (e) => setDescription(e.target.value) : handleChange}
              onBlur={(e) => handleBlurDescription("description", e.target.value)}
            />
            <p className="font-bold pb-1">FVM Tech Specs</p>
            <textarea
              ref={specsRef}
              className="w-full min-h-[112px] px-8 py-3 rounded-lg border border-gray focus:outline-none"
              placeholder="XYZ is..."
              name="specs"
              value={submission ? specs || "" : inputs.specs || ""}
              onChange={submission ? (e) => setSpecs(e.target.value) : handleChange}
              onBlur={(e) => handleBlurDescription("specs", e.target.value)}
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
                  onClick={() => handleOpenGithubModal(submission ? githubLink : null)}
                >
                  <span className="mr-3">
                    <Edit className="w-3 h-3" />
                  </span>
                  <span>Github</span>
                </button>
              </div>
              {newLinks && JSON.stringify(newLinks)}
              {links &&
                Object.entries(links).map((link, idx) => {
                  return (
                    <div className="flex justify-between py-1" key={idx}>
                      <button
                        className="flex items-center justify-center px-3 py-1 border border-[#dbdbdb] rounded-lg"
                        onClick={() => handleOpenLinkModal(link)}
                      >
                        <span className="mr-3">
                          <Edit className="w-3 h-3" />
                        </span>
                        <span>{link[0]}</span>
                      </button>
                      <div>
                        <button
                          onClick={() => store.deleteSubmissionLink(link[0], submission.id)}
                          className="bg-blue bg-opacity-5 px-3 py-[6.5px] rounded-lg"
                        >
                          <Delete className="w-3 h-5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
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
                onClick={submission ? handleClose : handleSubmit}
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
          newLinks={newLinks}
          setNewLinks={setNewLinks}
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

export default EditOutcomeModal;
