import { useRouter } from "next/router";
import Add from "public/images/svg/Add";
import { useState } from "react";
import Button from "src/components/shared/Button";

type CreateEvaluationButtonProps = {
  store: any;
};

export default function CreateEvaluationButton({ store }: CreateEvaluationButtonProps) {
  const [isNewEvaluationPending, setIsNewEvaluationPending] = useState<boolean>(false);
  const router = useRouter();

  const handleCreateNewEvaluation = async () => {
    setIsNewEvaluationPending(true);

    const evaluation = await store.createEvaluation();
    if (!evaluation) {
      return;
    }
    router.push(`/admin/evaluation/${evaluation.id}`);
  };

  return (
    <div>
      <Button
        text="Create a Round"
        icon={<Add className="fill-white" />}
        onClick={() => handleCreateNewEvaluation()}
        disabled={isNewEvaluationPending}
      />
    </div>
  );
}
