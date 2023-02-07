import { useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Close from "public/images/svg/Close";
import Button from "src/components/shared/Button";
import Add from "public/images/svg/Add";
import Delete from "public/images/svg/Delete";
import Edit from "public/images/svg/Edit";
import { useUserProfileStore } from "src/lib/UserProfileStore";
import AddLinkModal from "./AddLinkModal";
import AddGithubModal from "./AddGithubModal";

const style = {
  position: "absolute",
  bgcolor: "white",
  boxShadow: 24,
  borderRadius: "9.31292px",
};

type AddOutcomeModalProps = {
  handleClose: () => void;
  open: boolean;
  submission?: any;
  store: any;
};

export default function AddOutcomeModal({ handleClose, open, submission, store }: AddOutcomeModalProps) {
  const [inputs, setInputs] = useState<any>({});
  const [index, setIndex] = useState(0);
  const [newLinks, setNewLinks] = useState<any>([]);
  const [openAddLinkModal, setOpenAddLinkModal] = useState(false);
  const [linkModalContent, setLinkModalContent] = useState(null);
  const [openGithubModal, setOpenGithubModal] = useState(false);
  const [githubModalContent, setGithubModalContent] = useState(null);

  const userProfileStore = useUserProfileStore();

  const handleChange = (event: any) => {
    const name = event.target.name;
    const value = event.target.value;
    if (event.target.name === "summary" || event.target.name === "description" || event.target.name === "specs") {
      setInputs((values: any) => ({ ...values, description: { ...values.description, [name]: value } }));
    } else {
      setInputs((values: any) => ({ ...values, [name]: value }));
    }
  };

  const handleOpenLinkModal = (link: any, idx: number) => {
    setLinkModalContent(link);
    setIndex(idx);
    setOpenAddLinkModal(true);
  };
  const handleCloseLinkModal = () => {
    setOpenAddLinkModal(false);
    setLinkModalContent(null);
  };
  const handleOpenGithubModal = (link?: any) => {
    setGithubModalContent(link ? link : null);
    setOpenGithubModal(true);
  };
  const handleCloseGithubModal = () => {
    setOpenGithubModal(false);
    setGithubModalContent(null);
  };

  const handleSubmit = () => {
    const submissionInputs = newLinks[0]
      ? { ...inputs, links: newLinks.reduce((a: any, v: any) => ({ ...a, ...v }), {}) }
      : inputs;

    store.createLiveSubmission(submissionInputs, userProfileStore.profile?.id);
    handleClose();
    setInputs({});
  };

  const handleDeleteSubmission = () => {
    handleClose();
    setInputs({});
  };

  const checkIfDisabled = () => {
    return (
      !inputs.name ||
      !inputs.description?.summary ||
      !inputs.description?.description ||
      !inputs.description?.specs ||
      !inputs.github_link
    );
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
        className="translate-x-[-5%] md:-translate-x-1/2 -translate-y-1/2 top-1/2 left-[10%] md:left-1/2 py-3 px-5 md:py-10 md:px-14 lg:w-[1166px] text-offblack"
      >
        <h1 className="text-center text-xl md:text-[28px] text-blue-alt font-semibold">Create Outcome</h1>

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
                type="text"
                name="name"
                className="appearance-none w-full px-4 py-2 rounded-r-lg border border-gray focus:outline-none"
                placeholder="Example Title 1"
                value={inputs.name || ""}
                onChange={handleChange}
              />
            </div>
            <p className="font-bold pb-1">Project Description</p>
            <textarea
              className="w-full min-h-[112px] px-8 py-3 rounded-lg border border-gray focus:outline-none"
              placeholder="XYZ is..."
              name="summary"
              value={inputs.description?.summary || ""}
              onChange={handleChange}
            />
            <p className="font-bold pb-1">Progress Summary</p>

            <textarea
              className="w-full min-h-[112px] px-8 py-3 rounded-lg border border-gray focus:outline-none"
              placeholder="So far we have..."
              name="description"
              value={inputs.description?.description || ""}
              onChange={handleChange}
            />
            <p className="font-bold pb-1">FVM Tech Specs</p>
            <textarea
              className="w-full min-h-[112px] px-8 py-3 rounded-lg border border-gray focus:outline-none"
              placeholder="XYZ utilizes..."
              name="specs"
              value={inputs.description?.specs || ""}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col justify-between ml-8 lg:min-w-[240px]">
            <div>
              <div className="pb-7">
                <button
                  className="transition-colors duration-200 ease-in-out transform  outline-none focus:outline-none flex flex-row items-center justify-center rounded-md font-bold border border-blue hover:bg-white focus:bg-white text-blue text-lg px-4 py-2"
                  onClick={() => setOpenAddLinkModal(true)}
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
                  onClick={() => handleOpenGithubModal()}
                >
                  <span className="mr-3">
                    <Edit className="w-3 h-3 fill-charcoal" />
                  </span>
                  <span>Github</span>
                </button>
              </div>
              {newLinks &&
                newLinks.map((link: any, idx: number) => {
                  return (
                    <div className="flex justify-between py-1" key={idx}>
                      <button
                        className="flex items-center justify-center px-3 py-1 border border-[#dbdbdb] rounded-lg"
                        onClick={() => handleOpenLinkModal(link, idx)}
                      >
                        <span className="mr-3">
                          <Edit className="w-3 h-3 fill-charcoal" />
                        </span>
                        <span>{Object.keys(link)[0]}</span>
                      </button>
                      <div>
                        <button
                          onClick={() => {
                            setNewLinks(newLinks.filter((link: any, index: number) => idx !== index));
                          }}
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
                onClick={handleSubmit}
                className={`transition-colors duration-200 ease-in-out transform  outline-none focus:outline-none flex flex-row items-center justify-center rounded-md font-bold mx-auto border border-blue bg-blue  text-white text-lg px-3 py-1
                ${
                  checkIfDisabled()
                    ? "opacity-50 cursor-not-allowed"
                    : "cursor-pointer hover:bg-blue-darkest hover:border-blue-darkest"
                }
                `}
                disabled={checkIfDisabled()}
              >
                Add
              </button>
            </div>
          </div>
        </div>

        <AddLinkModal
          open={openAddLinkModal}
          link={linkModalContent}
          handleClose={() => handleCloseLinkModal()}
          index={index}
          newLinks={newLinks}
          setNewLinks={setNewLinks}
        />

        <AddGithubModal
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
}
