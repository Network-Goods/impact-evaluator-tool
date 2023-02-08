import { useState, useRef } from "react";
import EvaluationSubTitle from "./EvaluationSubTitle";
import Edit from "public/images/svg/Edit";

type EvaluationTitleProps = {
  store: any;
};
export default function EvaluationTitle({ store }: EvaluationTitleProps) {
  const ref = useRef<HTMLInputElement | null>(null);
  const [name, setName] = useState(store.evaluation.name);

  return (
    <>
      <div className="flex justify-between mb-4">
        <EvaluationSubTitle text="Title" />
        <div>
          <button onClick={() => ref.current?.focus()} className="border border-blue rounded p-1">
            <Edit className="fill-blue-alt" />
          </button>
        </div>
      </div>
      <input
        ref={ref}
        type="text"
        className="appearance-none w-full focus:px-4 py-2 rounded-lg border border-transparent focus:border-gray focus:outline-none"
        value={name}
        onChange={(e) => setName(e.target.value)}
        onBlur={(e) => store.setEvaluationName(e.target.value)}
      />
    </>
  );
}
