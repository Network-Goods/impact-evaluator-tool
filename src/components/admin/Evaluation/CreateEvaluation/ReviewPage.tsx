import moment from "moment";
import { EvaluationDetailsType } from ".";
import EvaluationSubTitle from "../EvaluationSubTitle";
import parse from "html-react-parser";

type ReviewPageProps = {
  store: any;
  formInputs: EvaluationDetailsType;
};
export default function ReviewPage({ store, formInputs }: ReviewPageProps) {
  return (
    <>
      <div className="bg-white text-lg rounded-lg py-10 px-14 mt-7 mb-20">
        <div className="mb-4">
          <EvaluationSubTitle text="Title" />
        </div>
        <div className="font-semibold">{formInputs.name || "EMPTY"}</div>
        <hr className="my-10 border-gray" />
        <div className="mb-4">
          <EvaluationSubTitle text="Short description" />
        </div>
        <div className="rich-text-display">{parse(formInputs.description || "EMPTY")}</div>
        <hr className="my-10 border-gray" />
        <div className="mb-4">
          <EvaluationSubTitle text="Evaluation Period" />
        </div>

        <div className="flex flex-col sm:flex-row font-semibold">
          <div className="">
            {formInputs.start_time ? moment(formInputs.start_time).utc().format("yyyy.MM.D HH:mm z") : "EMPTY"}
          </div>
          <span className="sm:mx-2">to</span>
          {formInputs.end_time ? moment(formInputs.end_time).format("yyyy.MM.D HH:mm z") : "EMPTY"}
        </div>
        <hr className="my-10 border-gray" />
        <div className="mb-4">
          <EvaluationSubTitle text="Type of evaluation" />
        </div>
        <div className="font-semibold">Quadratic voting</div>
        <hr className="my-10 border-gray" />
        <div className="mb-4">
          <EvaluationSubTitle text="Form description" />
        </div>
        <div className="rich-text-display">{parse(formInputs.form_description || "EMPTY")}</div>
        <hr className="my-10 border-gray" />
        <div className="mb-4">
          <EvaluationSubTitle text="Fields" />
        </div>
        <ul className="list-disc ml-5">
          {formInputs.evaluation_field.map((field: any) => {
            return (
              <div className="flex flex-col py-1" key={field.id}>
                <li className="text-blue font-bold">
                  <div className="inline-block text-offblack font-semibold">
                    Heading: <span className="font-normal">{field.heading}</span>
                  </div>
                </li>
                <div className="inline-block text-offblack font-semibold">
                  Subheading: <span className="font-normal">{field.subheading}</span>
                </div>
                <div className="inline-block text-offblack font-semibold">
                  Placeholder: <span className="font-normal">{field.placeholder}</span>
                </div>
                <div className="inline-block text-offblack font-semibold">
                  Character count: <span className="font-normal">{field.char_count}</span>
                </div>
              </div>
            );
          })}
        </ul>
        <hr className="my-10 border-gray" />
        <div className="mb-4">
          <EvaluationSubTitle text="Evaluators" />
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
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
