import { DocumentType } from "src/gql";
import LinkButton from "../../LinkButton";
import { EvaluationStubFragment } from "./queries";

type EvaluationItemProps = {
  evaluation: DocumentType<typeof EvaluationStubFragment>;
};
export const EvaluationItem = ({ evaluation }: EvaluationItemProps) => {
  return (
    <>
      <div className="flex justify-between items-center">
        <div>{evaluation.name}</div>
        <div className="flex items-center">
          <div className="pr-10">
            <div className="inline-flex flex-row w-auto items-center justify-start font-bold rounded uppercase text-sm px-4 py-2 bg-gray-light text-blue">
              EVAL
            </div>
          </div>
          <div className="pl-10 border border-gray  border-y-0 border-r-0 min-w-[137.67px]">
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
    </>
  );
};
