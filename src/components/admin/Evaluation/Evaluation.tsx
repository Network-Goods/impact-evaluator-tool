import { useEffect } from "react";
import { useRouter } from "next/router";
import LoadingSpinner from "src/components/shared/LoadingSpinner";
import { useEvaluationStore } from "./EvaluationStore";
import EditEvaluation from "./EditEvaluation";
import CreateEvaluation from "./CreateEvaluation";

export default function Evaluation() {
  const router = useRouter();
  const { evaluation_id } = router.query;
  const store = useEvaluationStore();

  useEffect(() => {
    if (!evaluation_id || Array.isArray(evaluation_id)) {
      return;
    }
    store.load(evaluation_id);
  }, [evaluation_id, store.fetching]);

  if (store.fetching) return <LoadingSpinner />;
  // if (store.error) return <p>Oh no... {store.error.message}</p>;

  console.log("HEHEHEHEH");

  return (
    <>
      {store.evaluation.status === "draft" ? (
        <CreateEvaluation store={store} />
      ) : (
        <EditEvaluation evaluation_id={evaluation_id} store={store} />
      )}
    </>
  );
}
