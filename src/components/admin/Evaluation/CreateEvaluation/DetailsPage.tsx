import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { DateTimePicker } from "../DateTimePicker";
import moment from "moment";
import { EvaluationDetailsType } from ".";

const EvaluationShortDescription = dynamic(() => import("../EvaluationShortDescription"), {
  ssr: false,
});

type DetailsPageProps = {
  store: any;
  formInputs: EvaluationDetailsType;
  handleFormChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    fieldName: keyof EvaluationDetailsType,
  ) => void;
};
export default function DetailsPage({ store, formInputs, handleFormChange }: DetailsPageProps) {
  const [startDate, setStartDate] = useState(store.evaluation?.start_time ? moment(store.evaluation?.start_time) : "");
  const [endDate, setEndDate] = useState(store.evaluation?.end_time ? moment(store.evaluation?.end_time) : "");
  const [evaluationType, setEvaluationType] = useState("");

  const handleStartDateChange = (date: string) => {
    setStartDate(date);
    store.setEvaluationStartTime(date);
  };

  const handleEndDateChange = (date: string) => {
    setEndDate(date);
    store.setEvaluationEndTime(date);
  };

  useEffect(() => {
    setStartDate(store.evaluation?.start_time ? moment(store.evaluation?.start_time) : "");
    setEndDate(store.evaluation?.end_time ? moment(store.evaluation?.end_time) : "");
  }, [store.evaluation?.start_time, store.evaluation?.end_time]);

  return (
    <>
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
        <EvaluationShortDescription store={store} />
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
    </>
  );
}
