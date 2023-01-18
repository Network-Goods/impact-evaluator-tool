import { Evaluation } from "src/lib";
import LinkButton from "../../LinkButton";

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
        <div>in progess</div>
      </div>
      <div className="flex items-center">
        <div className="pr-10">
          <div className="inline-flex flex-row w-auto items-center justify-start font-bold rounded uppercase text-sm px-4 py-2 bg-gray-light text-blue">
            EVAL
          </div>
        </div>
        <div className="pl-10 border border-gray border-y-0 border-r-0">
          {evaluation.status === "started" ? (
            <LinkButton
              small
              text="Evaluate"
              link={`/evaluation/${evaluation.id}`}
            />
          ) : (
            <LinkButton
              small
              text="Details"
              link={`/admin/evaluation/${evaluation.id}`}
            />
          )}
        </div>
      </div>
    </div>
  );
};
