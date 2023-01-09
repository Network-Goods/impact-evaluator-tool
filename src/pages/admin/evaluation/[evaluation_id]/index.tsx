import { useRouter } from "next/router";
import { Dispatch, FC, SetStateAction, useState } from "react";

import { setEvaluationName } from "src/lib/dbUtils";
import { EvaluationAdmin } from "src/components/admin/Evaluation/EvaluationAdmin";
import { DetailsPage } from "src/components/admin/Evaluation/DetailsPage";

const Home: FC = () => {
  const router = useRouter();
  const { evaluation_id } = router.query;

  return (
    <EvaluationAdmin
      evaluation_id={evaluation_id}
      page="details"
      loadOptions={{}}
    >
      <DetailsPage />
    </EvaluationAdmin>
  );
};

export default Home;
