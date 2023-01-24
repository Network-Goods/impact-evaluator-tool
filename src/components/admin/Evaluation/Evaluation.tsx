import { useEffect } from "react";
import { useRouter } from "next/router";
import LoadingSpinner from "src/components/shared/LoadingSpinner";
import { useEvaluationStore } from "./EvaluationStore";
import Title from "src/components/shared/Title";
import SmallTitle from "src/components/shared/SmallTitle";
import SubTitle from "src/components/shared/SubTitle";

export default function Evaluation() {
  const router = useRouter();
  const { evaluation_id } = router.query;
  const store = useEvaluationStore();

  useEffect(() => {
    if (!evaluation_id || Array.isArray(evaluation_id)) {
      return;
    }
    store.load(evaluation_id);
    console.log("store", store);
  }, [evaluation_id, store.fetching]);

  if (store.fetching) return <LoadingSpinner />;
  // if (store.error) return <p>Oh no... {store.error.message}</p>;

  return (
    <>
      <div className="pb-20">
        <Title text="Admin Edit Dashboard" />
        <div className="bg-white rounded-lg py-10 px-14">
          <SubTitle text="Title" />
          <div>{store.evaluation.name}</div>
          <hr className="my-8 border-gray" />
          <SubTitle text="Evaluation Period" />
          <div>
            {store.evaluation.start_time} to {store.evaluation.end_time}
          </div>
          <hr className="my-8 border-gray" />
          <SubTitle text="Evaluators and voice credits" />
          <SubTitle text="Codes:" />
          {store.evaluation.invitation.map((invitation: any) => {
            return (
              <div className="flex justify-between" key={invitation.id}>
                <div>{invitation.code}</div>
                <div>{invitation.voice_credits}</div>
              </div>
            );
          })}
          <SubTitle text="Evaluators:" />
          {store.evaluation.evaluator.map((evaluator: any) => {
            return (
              <div className="flex justify-between" key={evaluator.id}>
                <div>{evaluator.user.github_handle}</div>
                <div>{evaluator.user.preferred_email}</div>
                <div>{evaluator.voice_credits}</div>
              </div>
            );
          })}
          <hr className="my-8 border-gray" />
          <SubTitle text="Outcomes" />
          {store.evaluation.submission.map((submission: any) => {
            return (
              <div className="flex justify-between" key={submission.id}>
                <div>{submission.name}</div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
