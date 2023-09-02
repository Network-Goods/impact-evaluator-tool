import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Papa from "papaparse";
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
import EvaluationFormFields from "./EvaluationFormFields";

type EditEvaluationProps = {
  evaluation_id: string | string[] | undefined;
  store: any;
};

export default function EditEvaluation({ evaluation_id, store }: EditEvaluationProps) {
  const ref = useRef<HTMLInputElement | null>(null);
  const [evaluationStatus, setEvaluationStatus] = useState(store.evaluation.status);
  const [openOutcomeModal, setOpenOutcomeModal] = useState(false);
  const [outcomeModalContent, setOutcomeModalContent] = useState({});
  const [openEvaluatorModal, setOpenEvaluatorModal] = useState(false);
  const [evaluatorModalContent, setEvaluatorModalContent] = useState({});
  const [openInvitationModal, setOpenInvitationModal] = useState(false);
  const [isNewOutcomePending, setIsNewOutcomePending] = useState<boolean>(false);
  const [showShortDescription, setShowShortDescription] = useState<boolean>(false);
  const [showFormDescription, setShowFormDescription] = useState<boolean>(false);
  const [showFormFields, setShowFormFields] = useState<boolean>(false);
  const [startDate, setStartDate] = useState(store.evaluation?.start_time ? moment(store.evaluation?.start_time) : "");
  const [endDate, setEndDate] = useState(store.evaluation?.end_time ? moment(store.evaluation?.end_time) : "");
  const [loading, setLoading] = useState(false);
  const [csvData, setCsvData] = useState<Array<Record<string, any>>>([]);

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
    await store.load(evaluation_id);
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      Papa.parse(file, {
        header: true,
        complete: (result) => {
          setCsvData(result.data as Record<string, any>[]);
        },
      });
    }
  };

  const handleUploadMetricsClick = async () => {
    setLoading(true);

    await store.uploadMetrics(csvData);
    setCsvData([]);
    setLoading(false);
  };

  useEffect(() => {
    setStartDate(store.evaluation?.start_time ? moment(store.evaluation?.start_time) : "");
    setEndDate(store.evaluation?.end_time ? moment(store.evaluation?.end_time) : "");
  }, [store.evaluation?.start_time, store.evaluation?.end_time]);

  useEffect(() => {
    setEvaluationStatus(store.evaluation?.status);
  }, [store.evaluation?.status]);

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
          <div className="flex flex-col">
            <h5 className="text-offblack font-bold mb-1">Round status</h5>
            <select
              className=" px-4 py-2 rounded-lg border border-gray bg-white focus:outline-none text-offblack"
              value={evaluationStatus}
              onChange={(e) => store.setEvaluationStatus(e.currentTarget.value)}
            >
              <option value="staging">Staging</option>
              <option value="started">Started</option>
              <option value="closed">Closed</option>
            </select>
          </div>
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
          <div className="flex justify-between mb-4">
            <EvaluationSubTitle text="Fields" />
            <div>
              <button onClick={() => setShowFormFields((prev) => !prev)} className="border border-blue rounded p-1">
                <Edit className="fill-blue-alt" />
              </button>
            </div>
          </div>
          <EvaluationFormFields store={store} showFormFields={showFormFields} />
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
          <hr className="my-10 border-gray" />
          <div className="pb-4">
            <EvaluationSubTitle text="Metrics (will only work once submissions exist)" />
          </div>
          <div className="flex justify-between items-center">
            <div>
              <h5 className="text-offblack font-bold mb-1">Metrics Template</h5>
              <button onClick={() => store.getSubmissionsForMetrics(store.evaluation.id)}>
                <div className="transition-colors duration-200 ease-in-out transform  outline-none focus:outline-none flex flex-row items-center justify-center rounded-md font-bold mx-auto  border border-blue bg-blue hover:bg-blue-darkest hover:border-blue-darkest  text-white text-sm md:text-base py-1 px-2">
                  Download
                </div>
              </button>
            </div>
            <div>
              <div>
                <h5 className="text-offblack font-bold mb-1">Upload metrics</h5>
                <div className="flex">
                  <input type="file" accept=".csv" onChange={handleFileChange} />
                  {csvData.length > 0 ? (
                    <button
                      className="transition-colors duration-200 ease-in-out transform  outline-none focus:outline-none flex flex-row items-center justify-center rounded-md font-bold border border-blue bg-blue hover:bg-blue-darkest hover:border-blue-darkest  text-white text-sm md:text-base py-1 w-20"
                      onClick={handleUploadMetricsClick}
                    >
                      {loading ? "Uploading" : "Upload"}
                    </button>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
          <div className="p-4">
            {store.evaluation.evaluation_metric &&
              store.evaluation.evaluation_metric.map((metric: any) => (
                <div key={metric.id} className="mb-4 p-4 border">
                  <h2 className="font-bold mb-2">{metric.name}</h2>
                  <ul>
                    {metric.submission_metric_value.map((submission: any) => (
                      <li key={submission.id} className="mb-1">
                        Submission ID: {submission.submission_id} - Value: {submission.value}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
          </div>
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
