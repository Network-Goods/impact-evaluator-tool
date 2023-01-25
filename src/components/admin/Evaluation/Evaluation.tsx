import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import LoadingSpinner from "src/components/shared/LoadingSpinner";
import { useEvaluationStore } from "./EvaluationStore";
import Title from "src/components/shared/Title";
import EvaluationSubTitle from "./EvaluationSubTitle";
import Edit from "public/images/svg/Edit";
import OutcomeEditModal from "./OutcomeEditModal";
import EvaluatorEditModal from "./EvaluatorEditModal";

export default function Evaluation() {
  const [openOutcomeModal, setOpenOutcomeModal] = useState(false);
  const [outcomeModalContent, setOutcomeModalContent] = useState({});
  const [openEvaluatorModal, setOpenEvaluatorModal] = useState(false);
  const [evaluatorModalContent, setEvaluatorModalContent] = useState({});
  const router = useRouter();
  const { evaluation_id } = router.query;
  const store = useEvaluationStore();

  useEffect(() => {
    if (!evaluation_id || Array.isArray(evaluation_id)) {
      return;
    }
    store.load(evaluation_id);
    console.log("store", store);
  }, [evaluation_id, store.fetching]);

  const handleOpenOutcomeModal = (submission: any) => {
    setOpenOutcomeModal(true);
    setOutcomeModalContent(submission);
  };
  const handleCloseOutcomeModal = () => {
    setOpenOutcomeModal(false);
    setOutcomeModalContent({});
  };
  const handleOpenEvaluatorModal = (evaluator: any) => {
    setOpenEvaluatorModal(true);
    setEvaluatorModalContent(evaluator);
  };
  const handleCloseEvaluatorModal = () => {
    setOpenEvaluatorModal(false);
    setEvaluatorModalContent({});
  };

  if (store.fetching) return <LoadingSpinner />;
  // if (store.error) return <p>Oh no... {store.error.message}</p>;

  return (
    <div className="max-w-3xl mx-auto">
      <Title text="Admin Edit Dashboard" />
      <div className="bg-white text-lg font-semibold rounded-lg py-10 px-14 mt-7 mb-20">
        <div className="flex justify-between mb-4">
          <EvaluationSubTitle text="Title" />
          <div>
            <button onClick={() => console.log("name")} className="border border-blue rounded p-1">
              <Edit />
            </button>
          </div>
        </div>
        <div>{store.evaluation.name}</div>
        <hr className="my-10 border-gray" />
        <div className="flex justify-between mb-4">
          <EvaluationSubTitle text="Evaluation Period" />
          <div>
            <button onClick={() => console.log("period")} className="border border-blue rounded p-1">
              <Edit />
            </button>
          </div>
        </div>
        <div>
          {store.evaluation.start_time} to {store.evaluation.end_time}
        </div>
        <hr className="my-10 border-gray" />
        <div className="pb-4">
          <EvaluationSubTitle text="Evaluators and voice credits" />
        </div>
        <EvaluationSubTitle small text="Codes:" />
        {store.evaluation.invitation.map((invitation: any) => {
          return (
            <div className="flex justify-between" key={invitation.id}>
              <div>{invitation.code}</div>
              <div className="inline-flex flex-row w-auto items-center justify-center font-bold rounded-lg text-xs py-2 bg-gray-lighter text-blue min-w-[45px]">
                {invitation.voice_credits}
              </div>
            </div>
          );
        })}
        <EvaluationSubTitle small text="Evaluators:" />
        {store.evaluation.evaluator.map((evaluator: any) => {
          return (
            <div className="flex justify-between" key={evaluator.id}>
              <div>@{evaluator.user.github_handle}</div>
              <div className="underline">{evaluator.user.preferred_email}</div>
              <div className="flex">
                <div className="mr-2">{evaluator.voice_credits}</div>
                <div>
                  <button
                    onClick={() => handleOpenEvaluatorModal(evaluator)}
                    className="border border-blue rounded p-1"
                  >
                    <Edit />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
        <hr className="my-10 border-gray" />
        <EvaluationSubTitle text="Outcomes" />
        <ol className="list-decimal ml-5">
          {store.evaluation.submission.map((submission: any) => {
            return (
              <div className="flex justify-between py-1" key={submission.id}>
                <li className="text-blue font-bold">
                  <div className="inline-block text-offblack font-semibold">{submission.name}</div>
                </li>
                <div>
                  <button onClick={() => handleOpenOutcomeModal(submission)} className="border border-blue rounded p-1">
                    <Edit />
                  </button>
                </div>
              </div>
            );
          })}
        </ol>
      </div>
      <OutcomeEditModal
        open={openOutcomeModal}
        handleClose={handleCloseOutcomeModal}
        submission={outcomeModalContent}
      />
      <EvaluatorEditModal
        open={openEvaluatorModal}
        handleClose={handleCloseEvaluatorModal}
        evaluator={evaluatorModalContent}
      />
    </div>
  );
}
