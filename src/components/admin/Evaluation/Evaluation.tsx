import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import LeftArrow from "public/images/svg/LeftArrow";
import LoadingSpinner from "src/components/shared/LoadingSpinner";
import { useEvaluationStore } from "./EvaluationStore";
import EvaluationSubTitle from "./EvaluationSubTitle";
import Edit from "public/images/svg/Edit";
import OutcomeEditModal from "./OutcomeEditModal";
import EvaluatorEditModal from "./EvaluatorEditModal";
import EditTitle from "./Edit/EditTitle";
import Delete from "public/images/svg/Delete";

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
    setOutcomeModalContent(submission);
    setOpenOutcomeModal(true);
  };
  const handleCloseOutcomeModal = () => {
    setOpenOutcomeModal(false);
    setOutcomeModalContent({});
  };
  const handleOpenEvaluatorModal = (evaluator: any) => {
    setEvaluatorModalContent(evaluator);
    setOpenEvaluatorModal(true);
  };
  const handleCloseEvaluatorModal = () => {
    setOpenEvaluatorModal(false);
    setEvaluatorModalContent({});
  };

  const handleDeleteInvitation = (id: string) => {
    store.deleteInvitation(id);
  };

  if (store.fetching) return <LoadingSpinner />;
  // if (store.error) return <p>Oh no... {store.error.message}</p>;

  return (
    <>
      <div className="flex items-center pb-10">
        <div className="hidden md:flex mr-6">
          <Link href="/">
            <div className="rounded-lg bg-gray-light h-12 w-12 flex justify-center items-center">
              <LeftArrow />
            </div>
          </Link>
        </div>
        <div className="flex-1">
          <h1 className="text-3xl">{store.evaluation.name}</h1>
        </div>
      </div>
      <div className="max-w-3xl mx-auto">
        <div className="text-lg font-bold">Review the evaluation round</div>
        <div className="bg-white text-lg font-semibold rounded-lg py-10 px-14 mt-7 mb-20">
          <EditTitle store={store} />
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
              <div className="grid md:grid-cols-2 py-1" key={invitation.id}>
                <div>{invitation.code}</div>
                <div className="flex md:justify-end">
                  <div className="inline-flex flex-row w-auto items-center justify-center font-bold rounded-lg text-xs py-1 bg-gray-lighter text-blue min-w-[45px] mr-16">
                    {invitation.voice_credits}
                  </div>
                  <div>
                    <button
                      onClick={() => handleDeleteInvitation(invitation.id)}
                      className="border border-blue rounded p-1"
                    >
                      <Delete />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
          <EvaluationSubTitle small text="Evaluators:" />
          {store.evaluation.evaluator.map((evaluator: any) => {
            return (
              <div className="grid md:grid-cols-3 py-1" key={evaluator.id}>
                <div>@{evaluator.user.github_handle}</div>
                <div className="underline">{evaluator.user.preferred_email}</div>
                <div className="flex md:justify-end">
                  <div className="inline-flex flex-row w-auto items-center justify-center font-bold rounded-lg text-xs py-1 bg-gray-lighter text-blue min-w-[45px] mr-16">
                    {evaluator.voice_credits}
                  </div>
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
                    <button
                      onClick={() => handleOpenOutcomeModal(submission)}
                      className="border border-blue rounded p-1"
                    >
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
          store={store}
          open={openEvaluatorModal}
          handleClose={handleCloseEvaluatorModal}
          evaluator={evaluatorModalContent}
          handleReset={store.resetVotes}
        />
      </div>
    </>
  );
}
