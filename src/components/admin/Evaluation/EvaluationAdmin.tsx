import { Button } from "@mui/material";
import { useRouter } from "next/router";
import { ComponentType, FC, ReactNode, useEffect } from "react";
import LinkButton from "src/components/LinkButton";
import { useEvaluationStore } from "./EvaluationStore";

type Props = {
  evaluation_id: string | string[] | undefined;
  page: "details" | "submissions";
  children: ReactNode;
};

export const EvaluationAdmin: FC<Props> = ({
  evaluation_id,
  page,
  children,
}) => {
  const store = useEvaluationStore();

  useEffect(() => {
    if (!evaluation_id || Array.isArray(evaluation_id)) {
      return;
    }
    store.load(evaluation_id);
  }, [evaluation_id]);

  if (!evaluation_id) {
    return <div>Error: No evaluation id</div>;
  }

  if (Array.isArray(evaluation_id)) {
    return <div>Error: evaluationId is array</div>;
  }

  if (store.fetching) return <p>Loading...</p>;
  // if (store.error) return <p>Oh no... {store.error.message}</p>;
  if (!store.evaluation) return <p>no evaluation</p>;

  return (
    <div className="flex flex-col">
      <EvaluationNav evaluationId={store.evaluation.id} page={page} />
      <div>
        <LinkButton text="Dashboard" link="/" />
        <div className="flex justify-between">
          <span className="text-xl">{store.evaluation.name}</span>
          <span className="text-l">{store.evaluation.status}</span>
        </div>
      </div>
      {children}
    </div>
  );
};

type Props2 = {
  evaluationId: string;
  page: "details" | "submissions";
};

const EvaluationNav: FC<Props2> = ({ evaluationId, page }: Props2) => {
  return (
    <div className="absolute left-0">
      <NavButton
        text="Details"
        disabled={page == "details"}
        link={`/admin/evaluation/${evaluationId}`}
      />
      <NavButton
        text="Submissions"
        disabled={page == "submissions"}
        link={`/admin/evaluation/${evaluationId}/submission`}
      />
    </div>
  );
};

type Props3 = {
  disabled: boolean;
  link: string;
  text: string;
};

const NavButton: FC<Props3> = ({ disabled, link, text }: Props3) => {
  const router = useRouter();

  function onClick() {
    router.push(link);
  }

  return (
    <div>
      <Button disabled={disabled} className="" onClick={() => onClick()}>
        {text}
      </Button>
    </div>
  );
};
