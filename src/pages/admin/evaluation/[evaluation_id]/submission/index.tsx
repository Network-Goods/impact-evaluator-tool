import { useRouter } from "next/router";
import { FC, useState } from "react";
import { EvaluationAdmin } from "src/components/admin/Evaluation/EvaluationAdmin";
import { SubmissionsPage } from "src/components/admin/Evaluation/SubmissionsPage";

const Home: FC = () => {
  const router = useRouter();
  const { evaluation_id } = router.query;

  return (
    <EvaluationAdmin evaluation_id={evaluation_id} page="submissions">
      <SubmissionsPage />
    </EvaluationAdmin>
  );
};

export default Home;
