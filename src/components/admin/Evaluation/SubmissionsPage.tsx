import { FC } from "react";
import LinkButton from "src/components/LinkButton";
import { Evaluation, Submission } from "src/gql/graphql";
import { FromGraphQL } from "src/lib/dbUtils";
import { useEvaluationStore } from "./EvaluationStore";

export const SubmissionsPage: FC = () => {
  const store = useEvaluationStore();
  if (!store.evaluation) {
    return <div>Error: Evaluation not defined</div>;
  }

  return (
    <div>
      {store.submissions.map((submission) => (
        <SubmissionCard
          key={submission.id}
          submission={submission}
          evaluationId={store.evaluation!.id}
        />
      ))}
      {/* <CreateSubmissionButton evaluation={evaluation} /> */}
    </div>
  );
};

type Props = {
  submission: FromGraphQL<Submission>;
  evaluationId: string;
};

const SubmissionCard: FC<Props> = ({ submission, evaluationId }: Props) => {
  return (
    <div
      className="border-2 border-t-0 p-4 flex justify-between"
      key={submission.id}
    >
      <div>{submission.name}</div>
      <LinkButton
        text="Manage"
        link={`/admin/evaluation/${evaluationId}/submission/${submission.id}`}
      />
    </div>
  );
};
