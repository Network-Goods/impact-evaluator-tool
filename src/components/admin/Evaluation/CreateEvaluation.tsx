import { useState, useEffect } from "react";
import Link from "next/link";
import LeftArrow from "public/images/svg/LeftArrow";
import { DateTimePicker } from "./DateTimePicker";

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
  const [formInputs, setFormInputs] = useState<EvaluationDetailsType>({
    name: store.evaluation?.name,
    evaluation_type: store.evaluation?.evaluation_type,
    status: store.evaluation?.status,
    description: store.evaluation?.description,
    start_time: store.evaluation?.start_time,
    end_time: store.evaluation?.end_time,
  });
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const handleFormChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    fieldName: keyof EvaluationDetailsType,
  ) => {
    const value = event.target.value;
    setFormInputs((values: EvaluationDetailsType) => ({ ...values, [fieldName]: value }));
  };
  const handleStartDateChange = (date: Date) => {
    setStartDate(date);
    store.setEvaluationStartTime(date);
  };

  const handleEndDateChange = (date: Date) => {
    setEndDate(date);
    store.setEvaluationEndTime(date);
  };

  console.log(store);
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
          <h1 className="text-3xl">{formInputs.name || ""}</h1>
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
          <textarea
            className="w-full min-h-[112px] px-4 py-2 rounded-lg border border-gray focus:outline-none"
            placeholder="Q1 Retroactive Quadratic Funding"
            name="description"
            maxLength={280}
            value={formInputs.description || ""}
            onChange={(e) => handleFormChange(e, "description")}
            onBlur={(e) => store.setEvaluationDescription(e.target.value)}
          />
        </div>
        <div className="mb-14">
          <h3 className="text-lg text-offblack font-bold mb-4">
            When will this round be open to evaluation submissions?
          </h3>
          <div className="flex flex-col sm:flex-row">
            <div className="flex flex-col w-full">
              <h5 className="text-offblack font-bold mb-1">Start date</h5>
              <DateTimePicker
                date={startDate}
                setDate={handleStartDateChange}
                classes="w-full px-4 py-2 rounded-l-lg border border-gray focus:outline-none"
              />
            </div>
            <div className="flex flex-col w-full">
              <h5 className="text-offblack font-bold mb-1">End date</h5>
              <DateTimePicker
                date={endDate}
                setDate={handleEndDateChange}
                classes="w-full px-4 py-2 rounded-r-lg border border-gray border-l-0 focus:outline-none"
              />
            </div>
          </div>
        </div>
        <div className="mb-14">
          <h3 className="text-lg text-offblack font-bold mb-4">What type of evaluation do you want to set up?</h3>
          <h5 className="text-offblack font-bold mb-1">Type of evaluation</h5>
          <select className="w-full px-4 py-2 rounded-lg border border-gray bg-white focus:outline-none text-offblack ">
            <option selected>Select type</option>
            <option value="quadratic">Quadratic Voting</option>
          </select>
        </div>
      </div>
    </>
  );
}
