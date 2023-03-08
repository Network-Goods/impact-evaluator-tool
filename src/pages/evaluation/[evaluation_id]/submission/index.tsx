import { useState, useEffect } from "react";
import { useRoundDetailsStore } from "../../../../components/roundDetails/RoundDetailsStore";
import { useRouter } from "next/router";
import { useUserProfileStore } from "src/lib/UserProfileStore";
import LoadingSpinner from "src/components/shared/LoadingSpinner";
import Container from "src/components/layout/Container";
import Layout from "src/components/layout/Layout";
import AuthNavbar from "src/components/navBar/AuthNavbar";
import RoundDetails from "src/components/roundDetails/RoundDetails";

export default function Index() {
  const router = useRouter();
  const store = useRoundDetailsStore();
  const userProfileStore = useUserProfileStore();
  const [isNewSubmissionPending, setIsNewSubmissionPending] = useState<boolean>(false);
  const { evaluation_id } = router.query;
  useEffect(() => {
    if (!evaluation_id || Array.isArray(evaluation_id) || !userProfileStore.profile) {
      return;
    }
    store.load(userProfileStore.profile.id, evaluation_id, userProfileStore.profile.github_handle);
  }, [evaluation_id, store.fetching, userProfileStore.profile]);

  const clickNewSubmission = async () => {
    setIsNewSubmissionPending(true);
    const submission = await store.createSubmission();
    if (!submission) {
      return;
    }

    router.push(`/evaluation/${evaluation_id}/submission/${submission.id}`);
  };

  if (store.fetching) return <LoadingSpinner />;

  return (
    <Layout>
      <AuthNavbar />
      {Array.isArray(store.submissions) && store.submissions.length > 0 ? null : (
        <button
          className="bg-blue w-full text-white font-semibold text-center py-3"
          onClick={clickNewSubmission}
          disabled={isNewSubmissionPending}
        >
          Submission is required to join round. Go to Round Form &#8594;
        </button>
      )}
      <main>
        <Container>
          <RoundDetails
            store={store}
            clickNewSubmission={clickNewSubmission}
            isNewSubmissionPending={isNewSubmissionPending}
            evaluation_id={evaluation_id}
          />
        </Container>
      </main>
    </Layout>
  );
}
