import { DocumentType } from "src/gql";
import LinkButton from "../../LinkButton";
import { EvaluationStubFragment } from "./queries";

export const EvaluationCard = ({
  evaluation,
}: {
  evaluation: DocumentType<typeof EvaluationStubFragment>;
}) => {
  return (
    <div className="border p-4 flex justify-between rounded-lg bg-[#f5f5f5] ">
      {evaluation ? (
        <>
          <div>{evaluation.name}</div>
          <LinkButton
            text="Manage"
            link={`/admin/evaluation/${evaluation.id}`}
          />
        </>
      ) : (
        <div className="w-full min-h-[165px] flex justify-center items-center">
          <span className="text-lg text-[#4a4a4a]">
            You don’t have any ongoing evaluations.
          </span>
        </div>
      )}
    </div>
  );
};
