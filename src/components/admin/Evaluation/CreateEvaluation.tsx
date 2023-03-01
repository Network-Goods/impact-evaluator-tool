import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import dynamic from "next/dynamic";
import LeftArrow from "public/images/svg/LeftArrow";
import { DateTimePicker } from "./DateTimePicker";
import Button from "src/components/shared/Button";
import moment from "moment";

const RichTextEditor = dynamic(() => import("./RichTextEditor"), {
  ssr: false,
});

interface EvaluationDetailsType {
  name: string;
  evaluation_type: string;
  status: string;
  description: string;
  start_time: string;
  end_time: string;
}

type CreateEvaluationProps = {
  store: any;
};

export default function CreateEvaluation({ store }: CreateEvaluationProps) {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [formInputs, setFormInputs] = useState<EvaluationDetailsType>({
    name: store.evaluation?.name,
    evaluation_type: store.evaluation?.evaluation_type,
    status: store.evaluation?.status,
    description: store.evaluation?.description,
    start_time: store.evaluation?.start_time,
    end_time: store.evaluation?.end_time,
  });
  const [startDate, setStartDate] = useState(store.evaluation?.start_time ? moment(store.evaluation?.start_time) : "");
  const [endDate, setEndDate] = useState(store.evaluation?.end_time ? moment(store.evaluation?.end_time) : "");
  const [evaluationType, setEvaluationType] = useState("");

  const handleFormChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    fieldName: keyof EvaluationDetailsType,
  ) => {
    const value = event.target.value;
    setFormInputs((values: EvaluationDetailsType) => ({ ...values, [fieldName]: value }));
  };
  const handleStartDateChange = (date: string) => {
    setStartDate(date);
    store.setEvaluationStartTime(date);
  };

  const handleEndDateChange = (date: string) => {
    setEndDate(date);
    store.setEvaluationEndTime(date);
  };

  const handleDeleteEvaluation = () => {
    store.deleteEvaluation();
    router.push("/");
  };
  useEffect(() => {
    setFormInputs({
      name: store.evaluation?.name,
      evaluation_type: store.evaluation?.evaluation_type,
      status: store.evaluation?.status,
      description: store.evaluation?.description,
      start_time: store.evaluation?.start_time,
      end_time: store.evaluation?.end_time,
    });
  }, [store.evaluation]);

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
        <div className="flex-1">
          <h1 className="text-3xl">{formInputs.name || ""}</h1>
        </div>
      </div>
      <div className="max-w-[840px] mx-auto">
        <div className="flex justify-between my-12">
          <div className="w-[100px]">
            <div className="flex flex-col items-center mb-4">
              <div className="rounded-full bg-blue-alt h-8 w-8 flex justify-center items-center text-white font-bold">
                1
              </div>
              <h2 className="text-xl">Details</h2>
            </div>
          </div>
          <div className="w-[100px]">
            <div className="flex flex-col items-center mb-4">
              <div className="rounded-full bg-blue-alt h-8 w-8 flex justify-center items-center text-white font-bold">
                2
              </div>
              <h2 className="text-xl">Outcomes</h2>
            </div>
          </div>
          <div className="w-[100px]">
            <div className="flex flex-col items-center mb-4">
              <div className="rounded-full bg-blue-alt h-8 w-8 flex justify-center items-center text-white font-bold">
                3
              </div>
              <h2 className="text-xl">Evaluators</h2>
            </div>
          </div>
          <div className="w-[100px]">
            <div className="flex flex-col items-center mb-4">
              <div className="rounded-full bg-blue-alt h-8 w-8 flex justify-center items-center text-white font-bold">
                4
              </div>
              <h2 className="text-xl">Review</h2>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-3xl mx-auto">
        <div className="mb-6">
          <h3 className="text-lg text-offblack font-bold mb-2">Title</h3>
          <input
            type="text"
            className="appearance-none w-full px-4 py-2 rounded-lg border border-gray focus:outline-none"
            placeholder="New Impact Evaluator"
            value={formInputs.name || ""}
            onChange={(e) => handleFormChange(e, "name")}
            onBlur={(e) => store.setEvaluationName(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <h3 className="text-lg text-offblack font-bold mb-2">Round Description</h3>
          <RichTextEditor store={store} />
        </div>
        <div className="mb-14">
          <h3 className="text-lg text-offblack font-bold mb-4">
            When will this round be open to evaluation submissions?
          </h3>
          <div className="flex flex-col sm:flex-row">
            <div className="flex flex-col w-full">
              <h5 className="text-offblack font-bold mb-1">Start date</h5>
              <DateTimePicker date={startDate} setDate={handleStartDateChange} classes="left create" />
            </div>
            <div className="flex flex-col w-full">
              <h5 className="text-offblack font-bold mb-1">End date</h5>
              <DateTimePicker date={endDate} setDate={handleEndDateChange} classes="right create" />
            </div>
          </div>
        </div>
        <div className="mb-14">
          <h3 className="text-lg text-offblack font-bold mb-4">What type of evaluation do you want to set up?</h3>
          <h5 className="text-offblack font-bold mb-1">Type of evaluation</h5>
          <select
            className="w-full px-4 py-2 rounded-lg border border-gray bg-white focus:outline-none text-offblack"
            value={evaluationType}
            onChange={(e) => setEvaluationType(e.currentTarget.value)}
          >
            <option value="">Select type</option>
            <option value="quadratic">Quadratic Voting</option>
          </select>
        </div>
      </div>
      <div className="flex justify-between mt-14">
        <div>
          <Button small secondary text="Delete" onClick={() => handleDeleteEvaluation()} />
        </div>
        <div className="flex">
          <div>
            <Button small alt text="Save & Exit" onClick={() => router.push("/")} />
          </div>
          <div className="ml-4">
            <button
              onClick={() => setPage((prev) => prev + 1)}
              className="transition-colors duration-200 ease-in-out transform  outline-none focus:outline-none flex flex-row items-center justify-center rounded-md font-bold mx-auto border border-blue bg-blue  text-white text-lg px-3 py-1 cursor-pointer hover:bg-blue-darkest hover:border-blue-darkest"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
