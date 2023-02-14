import { useRouter } from "next/router";
import LoadingSpinner from "src/components/shared/LoadingSpinner";
import { useSubmissionStore } from "./SubmissionStore";

export default function SubmissionOverview() {
  const router = useRouter();
  const store = useSubmissionStore();

  const { evaluation_id } = router.query;

  // if (store.fetching) return <LoadingSpinner />;
  // if (store.error) return <p>Oh no... {store.error.message}</p>;

  return (
    <>
      <div>Evaluation ID: {evaluation_id}</div>
    </>
  );
}
