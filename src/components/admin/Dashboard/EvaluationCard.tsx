import { DocumentType } from "src/gql";
import LinkButton from "../../LinkButton";
import { EvaluationStubFragment } from "./queries";

export const EvaluationCard = ({
  evaluation,
}: {
  evaluation: DocumentType<typeof EvaluationStubFragment>;
}) => {
  return (
    <div className="border-2 border-t-0 p-4 flex justify-between">
      <div>{evaluation.name}</div>
      <LinkButton text="Manage" link={`/admin/evaluation/${evaluation.id}`} />
    </div>
  );
};
