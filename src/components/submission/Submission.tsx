import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import LoadingSpinner from "src/components/shared/LoadingSpinner";
import { useSubmissionStore } from "./SubmissionStore";
import Title from "src/components/shared/Title";
import Link from "next/link";
import LeftArrow from "public/images/svg/LeftArrow";
import SmallTitle from "src/components/shared/SmallTitle";
import Add from "public/images/svg/Add";
import Button from "../shared/Button";
import Delete from "public/images/svg/Delete";
import SubmitSubmissionModal from "./SubmitSubmissionModal";
import Edit from "public/images/svg/Edit";
import IncompleteSubmissionTooltip from "./IncompleteSubmissionTooltip";
import { useUserProfileStore } from "src/lib/UserProfileStore";
import QuadraticVotingModal from "../voting/QuadraticVotingModal";

interface FormInputs {
  name: string;
  description: string;
  summary: string;
  specs: string;
  contract_id: string;
  github_link: string;
  links?: LinkInputs[];
  githubHandle: string;
}

interface LinkInputs {
  name: string;
  value: string;
}

export default function Submission() {
  const [openModal, setOpenModal] = useState(false);
  const router = useRouter();
  const userProfileStore = useUserProfileStore();
  const { submission_id, evaluation_id } = router.query;
  const store = useSubmissionStore();
  const githubHandleFromProfile = userProfileStore.profile?.github_handle || "";
  const userIDFromProfile = userProfileStore.profile?.id || "";
  const [isNewSubmissionPending, setIsNewSubmissionPending] = useState<boolean>(false);
  const [openQuadraticModal, setOpenQuadraticModal] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isGithubHandleChecked, setIsGithubHandleChecked] = useState(
    githubHandleFromProfile === store.submission?.github_handle,
  );

  useEffect(() => {
    if (!submission_id || Array.isArray(submission_id)) {
      return;
    }
    store.load(submission_id, githubHandleFromProfile);
  }, [submission_id, store.fetching, githubHandleFromProfile]);

  const [formInputs, setFormInputs] = useState<FormInputs>({
    name: store.submission?.name,
    description: store.submission?.description.description,
    summary: store.submission?.description.summary,
    specs: store.submission?.description.specs,
    github_link: store.submission?.github_link,
    contract_id: store.submission?.contract_id,
    links: store.submission?.links || [],
    githubHandle: isGithubHandleChecked ? store.submission?.github_handle : "",
  });

  const handleFormChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    fieldName: keyof FormInputs,
  ) => {
    const value = event.target.value;
    setFormInputs((values: FormInputs) => ({ ...values, [fieldName]: value }));
  };

  const handleLinkChange = (event: React.ChangeEvent<HTMLInputElement>, index: number, fieldName: keyof LinkInputs) => {
    const value = event.target.value;
    setFormInputs((values: any) => {
      const links = values.links;
      links[index][fieldName] = value;
      return { ...values, links: links };
    });
  };

  const handleChecked = () => {
    const githubHandle = !isGithubHandleChecked ? githubHandleFromProfile : "";
    setIsGithubHandleChecked((prev) => !prev);
    setFormInputs((values: FormInputs) => ({ ...values, githubHandle: githubHandle }));
    store.setGithubHandle(githubHandle);
  };

  const handleSubmitModal = () => {
    store.setSubmission();
    setIsSubmitted(true);
    setOpenModal(false);
  };

  const handleCreateNewSubmission = async () => {
    if (!evaluation_id || Array.isArray(evaluation_id)) {
      return;
    }

    setIsNewSubmissionPending(true);

    const submission = await store.createSubmission(evaluation_id, userIDFromProfile);
    if (!submission) {
      return;
    }
    setIsSubmitted(false);

    router.push(`/evaluation/${evaluation_id}/submission/${submission.id}`);
  };

  useEffect(() => {
    setFormInputs({
      name: store.submission?.name,
      description: store.submission?.description.description,
      summary: store.submission?.description.summary,
      specs: store.submission?.description.specs,
      github_link: store.submission?.github_link,
      contract_id: store.submission?.contract_id,
      links: store.submission?.links,
      githubHandle: store.submission?.github_handle,
    });
    setIsGithubHandleChecked(githubHandleFromProfile === store.submission?.github_handle);
  }, [store.submission]);

  const isSubmitButtonDisabled =
    !formInputs.name ||
    !formInputs.description ||
    !formInputs.summary ||
    !formInputs.specs ||
    !formInputs.contract_id ||
    !formInputs.github_link ||
    (isGithubHandleChecked ? !githubHandleFromProfile : !formInputs.githubHandle) ||
    (formInputs.links && formInputs.links.some((link) => !link.name || !link.value));

  if (store.fetching) return <LoadingSpinner />;
  // if (store.error) return <p>Oh no... {store.error.message}</p>;

  return (
    <>
      <div className="pb-14">
        <div className="flex items-center pb-10">
          <div className="hidden md:flex mr-6">
            <Link href={`/evaluation/${evaluation_id}/submission`}>
              <div className="rounded-lg bg-gray-light h-12 w-12 flex justify-center items-center">
                <LeftArrow />
              </div>
            </Link>
          </div>
          <div className="flex-1">
            <Title text="Space Warp Impact Evaluator | Round 5" />
          </div>
        </div>

        <h3 className="text-2xl text-blue-alt font-bold">Submission Form</h3>
        <div className="text-xl pt-7">
          Submit a project for{" "}
          <a
            className="text-blue hover:text-blue-dark underline"
            href="https://spacewarp.fvm.dev/"
            target="_blank"
            rel="noreferrer"
          >
            Space Warp
          </a>
          &#39;s <b>Impact Evaluator: Round 5</b>, where builders and FVM subject matter experts vote on the top
          projects in the community and direct the allocation of funding. See the{" "}
          <a
            className="text-blue hover:text-blue-dark underline"
            href="https://spacewarp.fvm.dev/#ie"
            target="_blank"
            rel="noreferrer"
          >
            FVM Builders Leaderboard
          </a>{" "}
          for past round results.
          <br />
          <br />
          <u>
            Round 5 details [
            <a
              className="text-blue hover:text-blue-dark underline"
              href="https://network-goods.notion.site/Impact-Evaluators-Builders-Leaderboard-602ea6755b5642e1ad6f9da59a47fa62"
              target="_blank"
              rel="noreferrer"
            >
              full details here
            </a>
            ]:
            <br />
            <br />
          </u>{" "}
          <ul className="list-disc ml-6">
            <li>
              <b>Submission Deadline:</b> Mon., Mar 20 at 23:59 UTC-5
            </li>
            <li>
              <b>Voting Dates:</b> Begins Wed., Mar. 22 at 00:01 UTC-5 and ends Thurs., Mar. 23 at 23:59 UTC-5
            </li>
            <li>
              <b>Voting Method:</b>{" "}
              <button className="text-blue hover:text-blue-dark underline" onClick={() => setOpenQuadraticModal(true)}>
                Quadratic Voting
              </button>
            </li>

            <li>
              <b>Reward Pool:</b> $15,000 USD (denominated in FIL)
            </li>
          </ul>
          <br />
          <u>Eligibility:</u>
          <br />
          <br />
          <ul className="list-disc ml-6">
            <li>
              To receive rewards, each submitted project <u>must have a team member vote on its behalf</u>
            </li>
            <li>
              An evaluator <u>cannot vote</u> on their own project(s). Those votes will not be counted.
            </li>
          </ul>{" "}
          <br />
          With any questions or issues, please email <b>impact-evaluator@protocol.ai</b>.
        </div>
      </div>
      <div className="flex justify-between items-center py-2 px-9 bg-[#f0f0f0] border border-gray rounded-t-lg">
        <div className="py-2">
          <SmallTitle text="SUBMISSION FORM" />
        </div>
      </div>
      <div
        className="flex flex-col md:flex-row justify-between items-center px-8 md:px-24 bg-white border border-gray py-4 md:py-10 rounded-b-lg      
        border-t-0"
      >
        {isSubmitted ? (
          <div className="flex justify-center items-center w-full">
            <div className="text-xl font-bold flex flex-col text-center pt-16 pb-20">
              <p>Your submission is complete.</p>
              <p className="py-8">Would you like to complete another submission? </p>
              <div className="flex justify-between">
                <button
                  className="transition-colors duration-200 ease-in-out transform outline-none focus:outline-none flex flex-row items-center justify-center rounded-md font-bold mx-auto border border-gray-light bg-gray-light  text-lg px-4 py-2 cursor-pointer hover:bg-gray hover:border-gray"
                  onClick={() => router.push(`/evaluation/${evaluation_id}/submission`)}
                >
                  Round Details
                </button>
                <button
                  className="transition-colors duration-200 ease-in-out transform outline-none focus:outline-none flex flex-row items-center justify-center rounded-md font-bold mx-auto border border-blue bg-blue  text-white text-lg px-4 py-2 cursor-pointer hover:bg-blue-darkest hover:border-blue-darkest"
                  onClick={() => handleCreateNewSubmission()}
                  disabled={isNewSubmissionPending}
                >
                  New Submission
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full">
            <div className="mb-9">
              <p className="text-xl font-bold pb-3">Project or Team Title</p>

              <input
                type="text"
                name="name"
                maxLength={100}
                className="appearance-none w-full px-4 py-2 rounded-lg border border-gray focus:outline-none"
                placeholder="Example Title"
                value={formInputs.name || ""}
                onChange={(e) => handleFormChange(e, "name")}
                onBlur={(e) => store.setSubmissionTitle(e.target.value)}
              />
            </div>
            <div className="mb-9">
              <p className="text-xl font-bold">Project Description</p>
              <div className="text-[17px] text-[#898888] py-1">
                Using <b>280 characters</b> or less, describe your project.
              </div>
              <textarea
                className="w-full min-h-[112px] px-4 py-2 rounded-lg border border-gray focus:outline-none"
                placeholder="My project is..."
                name="description"
                maxLength={280}
                value={formInputs.description || ""}
                onChange={(e) => handleFormChange(e, "description")}
                onBlur={(e) => store.setSubmissionDescription("description", e.target.value)}
              />
            </div>
            <div className="mb-9">
              <p className="text-xl font-bold">Progress Summary</p>
              <div className="text-[17px] text-[#898888] py-1">
                Using <b>280 characters</b> or less, describe what your project has accomplished{" "}
                <span className="font-bold italic">in the past 1 month</span>.
              </div>

              <textarea
                className="w-full min-h-[112px] px-4 py-2 rounded-lg border border-gray focus:outline-none"
                placeholder="In the past 1 month, my project has..."
                name="summary"
                maxLength={280}
                value={formInputs.summary || ""}
                onChange={(e) => handleFormChange(e, "summary")}
                onBlur={(e) => store.setSubmissionDescription("summary", e.target.value)}
              />
            </div>
            <div className="mb-9">
              <p className="text-xl font-bold">FVM Tech Specs</p>
              <div className="text-[17px] text-[#898888] py-1">
                Using <b>360 characters</b> or less, describe your F(E)VM smart contract designs as well as the unique
                value your contracts bring to Filecoin.
              </div>
              <textarea
                className="w-full min-h-[112px] px-4 py-2 rounded-lg border border-gray focus:outline-none"
                placeholder="My project is using FVM's functionality to..."
                name="specs"
                maxLength={360}
                value={formInputs.specs || ""}
                onChange={(e) => handleFormChange(e, "specs")}
                onBlur={(e) => store.setSubmissionDescription("specs", e.target.value)}
              />
            </div>
            <div className="mb-9">
              <p className="text-xl font-bold">FVM Contract ID(s)</p>
              <div className="text-[17px] text-[#898888] py-1">
                Please provide the <b>Smart Contract ID(s)</b> for your dApp to authenticate deployment to mainnet,
                which is <b>required</b> to participate in this round.
              </div>
              <textarea
                className="w-full min-h-[112px] px-4 py-2 rounded-lg border border-gray focus:outline-none"
                placeholder="0xfe00000000000000000000000000000000000000"
                name="contract_id"
                maxLength={280}
                value={formInputs.contract_id || ""}
                onChange={(e) => handleFormChange(e, "contract_id")}
                onBlur={(e) => store.setSubmissionContractID(e.target.value)}
              />
            </div>
            <p className="text-xl font-bold pb-3">Links</p>
            <div className="pb-3">
              <p className="text-[17px] text-blue-alt font-bold pb-1">Github Repo</p>
              <input
                type="text"
                name="github_link"
                className="appearance-none w-full px-4 py-2 rounded-lg border border-gray focus:outline-none"
                placeholder="https://github.com/protocol/research"
                value={formInputs.github_link || ""}
                onChange={(e) => handleFormChange(e, "github_link")}
                onBlur={(e) => store.setGithubLink(e.target.value)}
              />
            </div>
            {formInputs.links &&
              formInputs.links.map((link: any, index: number) => {
                return (
                  <div key={index} className="pb-3">
                    <div className="flex items-center pb-1">
                      <div className="flex justify-center items-center w-5 h-5 -ml-5 ">
                        <Edit className="h-4 w-4 fill-gray mr-1" />
                      </div>
                      <input
                        autoFocus
                        type="text"
                        name="website_title"
                        className="appearance-none text-[17px] text-blue-alt font-bold focus:outline-none"
                        placeholder="Add Link Title"
                        value={link.name || ""}
                        onChange={(e) => handleLinkChange(e, index, "name")}
                        onBlur={(e) => store.setSubmissionLinkTitle(e.target.value, index)}
                      />
                    </div>
                    <div className="flex items-center">
                      <input
                        type="text"
                        name="website_link"
                        className="appearance-none w-full px-4 py-2 border border-gray rounded-l-lg focus:outline-none"
                        placeholder="https://protocol.ai/"
                        value={link.value || ""}
                        onChange={(e) => handleLinkChange(e, index, "value")}
                        onBlur={(e) => store.setSubmissionLink(e.target.value, index)}
                      />
                      <button
                        className="font-bold py-[10px] px-4 border border-gray border-l-0 rounded-r-lg bg-blue bg-opacity-5"
                        onClick={() => store.deleteSubmissionLink(index)}
                      >
                        <Delete className="w-3 h-5 fill-offblack" />
                      </button>
                    </div>
                  </div>
                );
              })}
            <div className="pt-4 pb-9">
              <button
                className="transition-colors duration-200 ease-in-out transform  outline-none focus:outline-none flex flex-row items-center justify-center rounded-md font-bold border border-blue hover:bg-white focus:bg-white text-blue text-lg px-4 py-1"
                onClick={() => store.createSubmissionLink()}
              >
                <span className="mr-3">
                  <Add className="fill-current" />
                </span>

                <span>Add Link</span>
              </button>
            </div>
            <p className="text-xl font-bold pb-3">Evaluator Representation</p>

            <div className="flex mt-2 mb-7">
              <input
                className=" text-[#E5E7EB] border-[#E5E7EB] rounded-lg"
                type="checkbox"
                name="emailCheck"
                checked={isGithubHandleChecked}
                onChange={() => handleChecked()}
              />{" "}
              <span className="ml-2">
                I will be evaluating on behalf of this project for the Impact Evaluator round.
              </span>
            </div>
            <p className="text-[17px] font-bold">GitHub handle for representative:</p>

            <input
              className="text-base appearance-none border border-gray rounded-lg w-full py-2 px-3 mt-1 font-medium disabled:text-gray focus:outline-none"
              type="text"
              name="githubHandle"
              value={formInputs.githubHandle || ""}
              onChange={(e) => handleFormChange(e, "githubHandle")}
              onBlur={(e) => store.setGithubHandle(e.target.value)}
              disabled={isGithubHandleChecked}
            />

            <div className="flex justify-between mt-14">
              <div>
                <Button
                  small
                  alt
                  text="Cancel"
                  onClick={() => router.push(`/evaluation/${evaluation_id}/submission`)}
                />
              </div>
              <div>
                {isSubmitButtonDisabled ? (
                  <IncompleteSubmissionTooltip>
                    <button className="transition-colors duration-200 ease-in-out transform  outline-none focus:outline-none flex flex-row items-center justify-center rounded-md font-bold mx-auto border border-blue bg-blue  text-white text-lg px-3 py-1 opacity-50 cursor-not-allowed">
                      Submit
                    </button>
                  </IncompleteSubmissionTooltip>
                ) : (
                  <button
                    onClick={() => setOpenModal(true)}
                    className="transition-colors duration-200 ease-in-out transform  outline-none focus:outline-none flex flex-row items-center justify-center rounded-md font-bold mx-auto border border-blue bg-blue  text-white text-lg px-3 py-1 cursor-pointer hover:bg-blue-darkest hover:border-blue-darkest"
                  >
                    Submit
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
      <SubmitSubmissionModal
        open={openModal}
        handleClose={() => setOpenModal(false)}
        handleSubmit={handleSubmitModal}
      />
      <QuadraticVotingModal open={openQuadraticModal} handleClose={() => setOpenQuadraticModal(false)} />
    </>
  );
}
