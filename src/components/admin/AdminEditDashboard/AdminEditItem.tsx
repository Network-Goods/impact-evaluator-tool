import { Evaluation } from "@prisma/client";
import Link from "next/link";
import { returnTime, returnDate } from "src/lib/utils";

enum RoundStatus {
  "draft" = "Draft",
  "staging" = "Staging",
  "started" = "In Progress",
  "closed" = "Closed",
}

enum RoundTiming {
  "draft" = "BEGINS",
  "staging" = "BEGINS",
  "started" = "ENDS",
  "closed" = "ENDED",
}

type EvaluationItemProps = {
  first: boolean;
  last: boolean;
  evaluation: Evaluation;
};
export const AdminEditItem = ({ evaluation, first, last }: EvaluationItemProps) => {
  return (
    <div
      className={`flex flex-col md:flex-row justify-between items-center px-9 bg-white border border-gray py-4 md:py-0 ${
        last ? "rounded-b-lg" : ""
      }
      ${first ? "rounded-t-lg md:rounded-t-none border-t md:border-t-0" : "border-t-0"}
      
      `}
    >
      <div className="">
        <div className="text-[20px] text-charcoal pb-4 md:py-[21.5px] text-center">
          {evaluation.name || "Unnamed round"}
        </div>
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
            {evaluation.status === "staging" || evaluation.status === "draft"
              ? returnDate(evaluation.start_time)
              : returnDate(evaluation.end_time)}
          </div>
          <div className="text-[9px] text-offblack tracking-widest">
            {evaluation.status === "staging" || evaluation.status === "draft"
              ? returnTime(evaluation.start_time)
              : returnTime(evaluation.end_time)}
          </div>
        </div>
        <div className="pl-4 md:pl-10 border-l border-gray">
          <Link href={`/admin/evaluation/${evaluation.id}`}>
            <div className="transition-colors duration-200 ease-in-out transform  outline-none focus:outline-none flex flex-row items-center justify-center rounded-md font-bold mx-auto  border border-blue bg-blue hover:bg-blue-darkest hover:border-blue-darkest  text-white text-sm md:text-base py-1 w-16 md:w-20">
              Edit
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};
