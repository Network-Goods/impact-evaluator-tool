import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import LeftArrow from "public/images/svg/LeftArrow";
import EvaluationSubTitle from "./EvaluationSubTitle";
import Edit from "public/images/svg/Edit";
import OutcomeModal from "./OutcomeModal/OutcomeModal";
import EvaluatorModal from "./EvaluatorModal/EvaluatorModal";
import CreateInvitationModal from "./CreateInvitationModal";
import EvaluationTitle from "./EvaluationTitle";
import Delete from "public/images/svg/Delete";
import Plus from "public/images/svg/Plus";
import { DateTimePicker } from "./DateTimePicker";

type EditEvaluationProps = {
  evaluation_id: string | string[] | undefined;
  store: any;
};

export default function EditEvaluation({ evaluation_id, store }: EditEvaluationProps) {
  const ref = useRef<any>(null);
  const [openOutcomeModal, setOpenOutcomeModal] = useState(false);
  const [outcomeModalContent, setOutcomeModalContent] = useState({});
  const [openEvaluatorModal, setOpenEvaluatorModal] = useState(false);
  const [evaluatorModalContent, setEvaluatorModalContent] = useState({});
  const [openInvitationModal, setOpenInvitationModal] = useState(false);
  const [isNewOutcomePending, setIsNewOutcomePending] = useState<boolean>(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const handleOpenOutcomeModal = (submission: any) => {
    setOutcomeModalContent(submission);
    setOpenOutcomeModal(true);
  };
  const handleCloseEditOutcomeModal = () => {
    setOpenOutcomeModal(false);
    setOutcomeModalContent({});
  };

  const handleCreateNewOutcome = async () => {
    setIsNewOutcomePending(true);
    const submission = await store.createSubmission();
    if (!submission) {
      return;
    }
    handleOpenOutcomeModal(submission);
    setIsNewOutcomePending(false);
  };

  const handleOpenEvaluatorModal = (evaluator?: any) => {
    setEvaluatorModalContent(evaluator ? evaluator : null);
    setOpenEvaluatorModal(true);
  };
  const handleCloseEvaluatorModal = () => {
    setOpenEvaluatorModal(false);
    setEvaluatorModalContent({});
  };

  const handleStartDateChange = (date: Date) => {
    setStartDate(date);
    store.setEvaluationStartTime(date);
  };

  const handleEndDateChange = (date: Date) => {
    setEndDate(date);
    store.setEvaluationEndTime(date);
  };

  useEffect(() => {
    setStartDate(new Date(store.evaluation?.start_time));
    setEndDate(new Date(store.evaluation?.end_time));
  }, [store.evaluation?.start_time, store.evaluation?.end_time]);

  return (
    <>
      <div className="flex items-center pb-10">
        <div className="hidden md:flex mr-6">
          <Link href="/admin">
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
          <EvaluationTitle store={store} />
          <hr className="my-10 border-gray" />
          <div className="flex justify-between mb-4">
            <EvaluationSubTitle text="Evaluation Period" />
            <div>
              <button onClick={() => ref.current?.input.focus()} className="border border-blue rounded p-1">
                <Edit className="fill-blue-alt" />
              </button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row">
            <div className="w-[120px]">
              <DateTimePicker ref={ref} date={startDate} setDate={handleStartDateChange} classes="w-[100px]" />
            </div>
            <span className="sm:mx-2">to</span>
            <DateTimePicker date={endDate} setDate={handleEndDateChange} classes="w-[100px]" />
          </div>
          <hr className="my-10 border-gray" />
          <div className="pb-4">
            <EvaluationSubTitle text="Evaluators and voice credits" />
          </div>
          <div className="flex justify-between items-center">
            <EvaluationSubTitle small text="Codes:" />
            <div>
              <button
                onClick={() => setOpenInvitationModal(true)}
                className="flex items-center justify-center border border-blue rounded w-[19px] h-5"
              >
                <Plus className="stroke-blue w-3 h-3" />
              </button>
            </div>
          </div>
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
                      onClick={() => store.deleteInvitation(invitation.id)}
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
                <div className="text-base text-gray-subtitle underline font-normal">
                  {evaluator.user.preferred_email}
                </div>
                <div className="flex md:justify-end">
                  <div className="inline-flex flex-row w-auto items-center justify-center font-bold rounded-lg text-xs py-1 bg-gray-lighter text-blue min-w-[45px] mr-16">
                    {evaluator.voice_credits}
                  </div>
                  <div>
                    <button
                      onClick={() => handleOpenEvaluatorModal(evaluator)}
                      className="border border-blue rounded p-1"
                    >
                      <Edit className="fill-blue-alt" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
          <hr className="my-10 border-gray" />
          <div className="flex justify-between items-center">
            <EvaluationSubTitle text="Outcomes" />
            <div>
              <button
                onClick={() => handleCreateNewOutcome()}
                className="flex items-center justify-center border border-blue rounded w-[19px] h-5"
                disabled={isNewOutcomePending}
              >
                <Plus className="stroke-blue w-3 h-3" />
              </button>
            </div>
          </div>
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
                      <Edit className="fill-blue-alt" />
                    </button>
                  </div>
                </div>
              );
            })}
          </ol>
        </div>
        <OutcomeModal
          store={store}
          open={openOutcomeModal}
          handleClose={handleCloseEditOutcomeModal}
          submission={outcomeModalContent}
          evaluation_id={evaluation_id}
        />

        <EvaluatorModal
          store={store}
          open={openEvaluatorModal}
          handleClose={handleCloseEvaluatorModal}
          evaluator={evaluatorModalContent}
          handleReset={store.resetVotes}
        />
        <CreateInvitationModal
          store={store}
          open={openInvitationModal}
          handleClose={() => setOpenInvitationModal(false)}
        />
      </div>
    </>
  );
}
