import Link from "next/link";
import { DashboardEvaluation } from "src/lib";
import EvaluationLinkButton from "./EvaluationLinkButton";
import { returnTime, returnDate } from "src/lib/utils";

enum RoundStatus {
  "staging" = "Staging",
  "started" = "In Progress",
  "closed" = "Closed",
}

enum RoundTiming {
  "staging" = "BEGINS",
  "started" = "ENDS",
  "closed" = "ENDED",
}

type EvaluationItemProps = {
  first: boolean;
  last: boolean;
  evaluation: DashboardEvaluation;
};
export const EvaluationItem = ({ evaluation, first, last }: EvaluationItemProps) => {
  return (
    <div
      className={`flex flex-col md:flex-row justify-between items-center px-9 bg-white border border-gray py-4 md:py-0 ${
        last ? "rounded-b-lg" : ""
      }
      ${first ? "rounded-t-lg md:rounded-t-none border-t md:border-t-0" : "border-t-0"}
      
      `}
    >
      <div className="">
        <div className="text-[20px] text-charcoal pb-4 md:py-[21.5px] text-center">{evaluation.name}</div>
      </div>
      <div className="flex items-center">
        <div className="pr-4 md:pr-7 text-center min-w-[109px]">
          <div className="text-blue text-xs italic mb-1 mr-1">
            {RoundStatus[evaluation.status as keyof typeof RoundStatus]}
          </div>
          <div className="text-[9px] text-offblack tracking-widest">
            {`ROUND ${RoundTiming[evaluation.status as keyof typeof RoundTiming]}`}
          </div>
          <div className="text-[9px] text-offblack tracking-widest">
            {evaluation.status === "staging" ? returnDate(evaluation.start_time) : returnDate(evaluation.end_time)}
          </div>
          <div className="text-[9px] text-offblack tracking-widest">
            {evaluation.status === "staging" ? returnTime(evaluation.start_time) : returnTime(evaluation.end_time)}
          </div>
        </div>
        <div className="text-center py-[9px] font-bold text-sm text-gray-dark border-l border-gray px-4 min-w-[79px] md:min-w-[100px]">
          EVAL
        </div>

        <div className="pl-4 md:pl-10 border-l border-gray">
          {evaluation.status === "staging" ? (
            <Link href={`/evaluation/${evaluation.id}/submission`}>
              <div className="transition-colors duration-200 ease-in-out transform  outline-none focus:outline-none flex flex-row items-center justify-center rounded-md font-bold mx-auto  border border-red bg-red hover:bg-dark-red hover:border-dark-red  text-white text-xs md:text-base py-1 w-24 md:w-32">
                Submit Project
              </div>
            </Link>
          ) : null}
          {evaluation.status === "started" && !evaluation.is_submitted ? (
            <>
              <EvaluationLinkButton text="Evaluate" link={`/evaluation/${evaluation.id}`} />
            </>
          ) : null}
          {(evaluation.status === "started" && evaluation.is_submitted) || evaluation.status === "closed" ? (
            <div className="transition-colors duration-200 ease-in-out transform  outline-none focus:outline-none flex flex-row items-center justify-center rounded-md font-bold mx-auto border border-[#DADADA] bg-[#DADADA] text-gray-dark text-xs md:text-base py-1 w-24 md:w-32">
              Done
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};
