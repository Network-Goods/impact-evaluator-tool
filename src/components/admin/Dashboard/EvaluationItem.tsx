import { Evaluation } from "src/lib";
import LinkButton from "../../LinkButton";
import EvaluationLinkButton from "./EvaluationLinkButton";

type EvaluationItemProps = {
  last: boolean;
  evaluation: Evaluation;
};
export const EvaluationItem = ({ evaluation, last }: EvaluationItemProps) => {
  return (
    <div
      className={`flex justify-between items-center px-9 py-[17px] bg-white border border-t-0 border-gray ${
        last ? "rounded-b-lg" : ""
      }`}
    >
      <div className="w-[80%] flex justify-between items-center">
        <div className="text-[20px] text-charcoal">{evaluation.name}</div>
        <div className="pr-7">
          <div className="w-16 text-blue text-xs italic text-center">
            In Progress
          </div>
        </div>
      </div>
      <div className="w-[8%] text-center py-[9px] font-bold text-sm text-gray-dark border-l border-gray">
        EVAL
      </div>

      <div className="w-[12%] pl-10 border-l border-gray">
        {evaluation.status === "started" ? (
          <EvaluationLinkButton
            text="Evaluate"
            link={`/evaluation/${evaluation.id}`}
          />
        ) : (
          <EvaluationLinkButton
            text="Details"
            link={`/evaluation/${evaluation.id}`}
          />
        )}
      </div>
    </div>
  );
};
