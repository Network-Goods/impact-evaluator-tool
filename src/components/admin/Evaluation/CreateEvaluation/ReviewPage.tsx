import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import moment from "moment";
import SmallTitle from "src/components/shared/SmallTitle";
import { EvaluationDetailsType } from ".";
import EvaluationSubTitle from "../EvaluationSubTitle";
import parse from "html-react-parser";

type ReviewPageProps = {
  store: any;
  formInputs: EvaluationDetailsType;
};
export default function ReviewPage({ store, formInputs }: ReviewPageProps) {
  console.log("store", store);
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
        <ol className="list-decimal ml-5">
          {formInputs.evaluation_field.map((field: any) => {
            return (
              <div className=" py-1" key={field.id}>
                <li className="text-blue font-bold">
                  <div className="inline-block text-offblack font-semibold">{field.field_name}</div>
                </li>
              </div>
            );
          })}
        </ol>
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
