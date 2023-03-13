import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import LoadingSpinner from "src/components/shared/LoadingSpinner";
import { useSubmissionStore } from "./SubmissionStore";
import Title from "src/components/shared/Title";
import Link from "next/link";
import LeftArrow from "public/images/svg/LeftArrow";
import SmallTitle from "src/components/shared/SmallTitle";
import { useUserProfileStore } from "src/lib/UserProfileStore";
import QuadraticVotingModal from "../voting/QuadraticVotingModal";
import Submission from "../shared/Submission";
import Button from "../shared/Button";
import IncompleteSubmissionTooltip from "./IncompleteSubmissionTooltip";
import SubmitSubmissionModal from "./SubmitSubmissionModal";
import { SubmissionFormInputs } from "src/lib";
import parse from "html-react-parser";
import { submissionFormCustomFieldsCheck } from "src/lib/utils";

export default function SubmissionPage() {
  const router = useRouter();
  const userProfileStore = useUserProfileStore();
  const { submission_id, evaluation_id } = router.query;
  const store = useSubmissionStore();
  const githubHandleFromProfile = userProfileStore.profile?.github_handle || "";
  const userIDFromProfile = userProfileStore.profile?.id || "";
  const [isNewSubmissionPending, setIsNewSubmissionPending] = useState<boolean>(false);
  const [openQuadraticModal, setOpenQuadraticModal] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    if (!submission_id || Array.isArray(submission_id)) {
      return;
    }
    store.load(submission_id, githubHandleFromProfile);
  }, [submission_id, store.fetching, githubHandleFromProfile]);

  const [isGithubHandleChecked, setIsGithubHandleChecked] = useState(
    githubHandleFromProfile === store.submission?.github_handle,
  );

  const [formInputs, setFormInputs] = useState<SubmissionFormInputs>({
    name: store.submission?.name,
    evaluation_field: store.submission?.evaluation.evaluation_field || [],
    description: store.submission?.description.description,
    summary: store.submission?.description.summary,
    specs: store.submission?.description.specs,
    github_link: store.submission?.github_link,
    links: store.submission?.links || [],
    githubHandle: isGithubHandleChecked ? store.submission?.github_handle : "",
  });

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
      evaluation_field: store.submission?.evaluation.evaluation_field,
      description: store.submission?.description.description,
      summary: store.submission?.description.summary,
      specs: store.submission?.description.specs,
      github_link: store.submission?.github_link,
      links: store.submission?.links,
      githubHandle: store.submission?.github_handle,
    });
    if (githubHandleFromProfile) setIsGithubHandleChecked(githubHandleFromProfile === store.submission?.github_handle);
  }, [store.submission]);

  const isSubmitButtonDisabled =
    !formInputs.name ||
    !formInputs.github_link ||
    (isGithubHandleChecked ? !githubHandleFromProfile : !formInputs.githubHandle) ||
    (formInputs.links && formInputs.links.some((link) => !link.name || !link.value)) ||
    !submissionFormCustomFieldsCheck(formInputs, submission_id);

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
            <Title text={store.submission.evaluation.name} />
          </div>
        </div>
        <h3 className="text-2xl text-blue-alt font-bold">Submission Form</h3>
        <div className="text-xl pt-7">
          <div className="rich-text-display">{parse(store.submission.evaluation.description)}</div>
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
            <Submission
              store={store}
              githubHandleFromProfile={githubHandleFromProfile}
              formInputs={formInputs}
              setFormInputs={setFormInputs}
              isGithubHandleChecked={isGithubHandleChecked}
              setIsGithubHandleChecked={setIsGithubHandleChecked}
              submission_id={submission_id}
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
                    <button className="transition-colors outline-none focus:outline-none flex flex-row items-center justify-center rounded-md font-bold mx-auto border border-blue bg-blue text-white text-lg px-3 py-1 opacity-50 cursor-not-allowed">
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
