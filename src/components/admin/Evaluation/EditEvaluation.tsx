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
import moment from "moment";
import parse from "html-react-parser";
import EvaluationShortDescription from "./EvaluationShortDescription";
import EvaluationFormDescription from "./EvaluationFormDescription";

type EditEvaluationProps = {
  evaluation_id: string | string[] | undefined;
  store: any;
};

export default function EditEvaluation({ evaluation_id, store }: EditEvaluationProps) {
  const ref = useRef<HTMLInputElement | null>(null);
  const [openOutcomeModal, setOpenOutcomeModal] = useState(false);
  const [outcomeModalContent, setOutcomeModalContent] = useState({});
  const [openEvaluatorModal, setOpenEvaluatorModal] = useState(false);
  const [evaluatorModalContent, setEvaluatorModalContent] = useState({});
  const [openInvitationModal, setOpenInvitationModal] = useState(false);
  const [isNewOutcomePending, setIsNewOutcomePending] = useState<boolean>(false);
  const [showShortDescription, setShowShortDescription] = useState<boolean>(false);
  const [showFormDescription, setShowFormDescription] = useState<boolean>(false);
  const [startDate, setStartDate] = useState(store.evaluation?.start_time ? moment(store.evaluation?.start_time) : "");
  const [endDate, setEndDate] = useState(store.evaluation?.end_time ? moment(store.evaluation?.end_time) : "");

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

  const handleStartDateChange = (date: string) => {
    setStartDate(date);
    store.setEvaluationStartTime(date);
  };

  const handleEndDateChange = (date: string) => {
    setEndDate(date);
    store.setEvaluationEndTime(date);
  };
  const actionButton = () => {
    switch (store.evaluation.status) {
      case "staging":
        return (
          <button
            onClick={() => store.setEvaluationStatus("started")}
            className="transition-colors duration-200 ease-in-out transform  outline-none focus:outline-none flex flex-row items-center justify-center rounded-md font-bold border border-blue bg-blue  text-white text-lg px-3 py-1 cursor-pointer hover:bg-blue-darkest hover:border-blue-darkest"
          >
            Launch Round &#8594;
          </button>
        );
      case "started":
        return (
          <button
            onClick={() => store.setEvaluationStatus("closed")}
            className="transition-colors duration-200 ease-in-out transform  outline-none focus:outline-none flex flex-row items-center justify-center rounded-md font-bold border border-blue bg-blue  text-white text-lg px-3 py-1 cursor-pointer hover:bg-blue-darkest hover:border-blue-darkest"
          >
            Close Round
          </button>
        );
      case "closed":
        return (
          <div className="transition-colors duration-200 ease-in-out transform  outline-none focus:outline-none flex flex-row items-center justify-center rounded-md font-bold border border-[#DADADA] bg-[#DADADA] text-gray-dark text-lg px-3 py-1 cursor-pointer">
            Round Closed
          </div>
        );
      default:
        return null;
    }
  };

  useEffect(() => {
    setStartDate(store.evaluation?.start_time ? moment(store.evaluation?.start_time) : "");
    setEndDate(store.evaluation?.end_time ? moment(store.evaluation?.end_time) : "");
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
        <div className="flex-1 flex justify-between">
          <h1 className="text-3xl">{store.evaluation.name}</h1>
          {actionButton()}
        </div>
      </div>
      <div className="max-w-3xl mx-auto">
        <div className="text-lg font-bold">Review the evaluation round</div>
        <div className="bg-white text-lg font-semibold rounded-lg py-10 px-14 mt-7 mb-20">
          <EvaluationTitle store={store} />
          <hr className="my-10 border-gray" />
          <div className="flex justify-between mb-4">
            <EvaluationSubTitle text="Short description" />
            <div>
              <button
                onClick={() => setShowShortDescription((prev) => !prev)}
                className="border border-blue rounded p-1"
              >
                <Edit className="fill-blue-alt" />
              </button>
            </div>
          </div>
          {showShortDescription ? (
            <div className="flex flex-col font-normal">
              <EvaluationShortDescription store={store} />
            </div>
          ) : (
            <div className="rich-text-display font-normal">{parse(store.evaluation.description || "EMPTY")}</div>
          )}
          <hr className="my-10 border-gray" />
          <div className="flex justify-between mb-4">
            <EvaluationSubTitle text="Evaluation Period" />
            <div>
              <button onClick={() => ref.current?.focus()} className="border border-blue rounded p-1">
                <Edit className="fill-blue-alt" />
              </button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row">
            <DateTimePicker ref={ref} date={startDate} setDate={handleStartDateChange} classes="" />

            <span className="sm:mx-2">to</span>
            <DateTimePicker date={endDate} setDate={handleEndDateChange} classes="" />
          </div>
          <hr className="my-10 border-gray" />
          <div className="mb-4">
            <EvaluationSubTitle text="Type of evaluation" />
          </div>
          <div className="font-semibold">Quadratic voting</div>
          <hr className="my-10 border-gray" />
          <div className="flex justify-between mb-4">
            <EvaluationSubTitle text="Form description" />
            <div>
              <button
                onClick={() => setShowFormDescription((prev) => !prev)}
                className="border border-blue rounded p-1"
              >
                <Edit className="fill-blue-alt" />
              </button>
            </div>
          </div>

          {showFormDescription ? (
            <div className="flex flex-col font-normal">
              <EvaluationFormDescription store={store} />
            </div>
          ) : (
            <div className="rich-text-display font-normal">{parse(store.evaluation.form_description || "EMPTY")}</div>
          )}

          <hr className="my-10 border-gray" />
          <div className="mb-4">
            <EvaluationSubTitle text="Fields" />
          </div>
          <ul className="list-disc ml-5">
            {store.evaluation.evaluation_field.map((field: any) => {
              return (
                <div className="flex flex-col py-1" key={field.id}>
                  <li className="text-blue font-bold">
                    <div className="inline-block text-offblack font-semibold">Heading: {field.heading}</div>
                  </li>
                  <div className="inline-block text-offblack font-semibold">Subheading: {field.subheading}</div>
                  <div className="inline-block text-offblack font-semibold">Placeholder: {field.placeholder}</div>
                  <div className="inline-block text-offblack font-semibold">Character count: {field.char_count}</div>
                </div>
              );
            })}
          </ul>
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
              <div className="grid md:grid-cols-3 py-1" key={invitation.id}>
                <div>{invitation.code}</div>
                <div className="text-base text-gray-subtitle font-normal mr-10">
                  Remaining: <span className="text-offblack font-semibold">{invitation.remaining_uses}</span>
                </div>
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
