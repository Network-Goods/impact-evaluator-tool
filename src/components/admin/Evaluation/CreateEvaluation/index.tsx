import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import LeftArrow from "public/images/svg/LeftArrow";
import Button from "src/components/shared/Button";
import CreationStageButton from "./CreationStageButton";
import DetailsPage from "./DetailsPage";
import EvaluatorsPage from "./EvaluatorsPage";
import OutcomesPage from "./OutcomesPage";
import ReviewPage from "./ReviewPage";

export interface EvaluationDetailsType {
  name: string;
  description: string;
  start_time: string;
  end_time: string;
  evaluation_type: string;
  evaluation_field: EvaluationFieldType[];
  form_description: string;
  invitation: InvitationType[];
  status: string;
}
export type EvaluationFieldType = {
  id: string;
  evaluation_id: string;
  heading: string;
  subheading: string;
  placeholder: string;
  char_count: number;
};
type InvitationType = {
  code: string;
  evaluation_id: string;
  id: string;
  is_sme: boolean;
  remaining_uses: number;
  voice_credits: number;
};
type CreateEvaluationProps = {
  store: any;
};

const pages = ["Details", "Outcomes", "Evaluators", "Review"];

export default function CreateEvaluation({ store }: CreateEvaluationProps) {
  const router = useRouter();
  const [page, setPage] = useState(0);
  const [formInputs, setFormInputs] = useState<EvaluationDetailsType>({
    name: store.evaluation?.name,
    evaluation_type: store.evaluation?.evaluation_type,
    status: store.evaluation?.status,
    description: store.evaluation?.description,
    start_time: store.evaluation?.start_time,
    end_time: store.evaluation?.end_time,
    form_description: store.evaluation?.form_description,
    invitation: store.evaluation?.invitation,
    evaluation_field: store.evaluation?.evaluation_field,
  });

  const handleFormChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    fieldName: keyof EvaluationDetailsType,
  ) => {
    const value = event.target.value;
    setFormInputs((values: EvaluationDetailsType) => ({ ...values, [fieldName]: value }));
  };

  const handleDeleteEvaluation = () => {
    store.deleteEvaluation();
    router.push("/");
  };

  const handlePublishRound = () => {
    store.setEvaluationStatus("staging");
  };

  useEffect(() => {
    setFormInputs({
      name: store.evaluation?.name,
      evaluation_type: store.evaluation?.evaluation_type,
      status: store.evaluation?.status,
      description: store.evaluation?.description,
      start_time: store.evaluation?.start_time,
      end_time: store.evaluation?.end_time,
      form_description: store.evaluation?.form_description,
      invitation: store.evaluation?.invitation,
      evaluation_field: store.evaluation?.evaluation_field,
    });
  }, [store.evaluation]);

  const renderPage = () => {
    switch (page) {
      case 0:
        return <DetailsPage store={store} formInputs={formInputs} handleFormChange={handleFormChange} />;
      case 1:
        return <OutcomesPage store={store} formInputs={formInputs} setFormInputs={setFormInputs} />;
      case 2:
        return <EvaluatorsPage store={store} formInputs={formInputs} setFormInputs={setFormInputs} />;
      case 3:
        return <ReviewPage store={store} formInputs={formInputs} />;

      default:
        return <div>egads!</div>;
    }
  };

  return (
    <>
      <div className="flex items-center pb-6">
        <div className="hidden md:flex mr-6">
          <Link href="/admin">
            <div className="rounded-lg bg-gray-light h-12 w-12 flex justify-center items-center">
              <LeftArrow />
            </div>
          </Link>
        </div>
        <div className="flex-1">
          <h1 className="text-3xl">{formInputs.name || ""}</h1>
        </div>
      </div>
      <div className="max-w-[840px] mx-auto">
        <div className="flex justify-between my-8">
          {pages.map((label, idx) => {
            return (
              <div key={idx}>
                <CreationStageButton label={label} idx={idx} page={page} setPage={setPage} />
              </div>
            );
          })}
        </div>
      </div>
      <div className="max-w-3xl mx-auto min-h-[350px]">{renderPage()}</div>
      <div className="flex justify-between mt-14">
        <div>
          {page > 0 ? (
            <Button small secondary text="Back" onClick={() => setPage((prev) => prev - 1)} />
          ) : (
            <Button small secondary text="Delete" onClick={() => handleDeleteEvaluation()} />
          )}
        </div>
        <div className="flex">
          <div>
            <Button small alt text="Save & Exit" onClick={() => router.push("/")} />
          </div>
          <div className="ml-4">
            {page === 3 ? (
              <button
                onClick={handlePublishRound}
                className="transition-colors duration-200 ease-in-out transform  outline-none focus:outline-none flex flex-row items-center justify-center rounded-md font-bold mx-auto border border-blue bg-blue  text-white text-lg px-3 py-1 cursor-pointer hover:bg-blue-darkest hover:border-blue-darkest"
              >
                Publish Round
              </button>
            ) : (
              <button
                onClick={() => setPage((prev) => prev + 1)}
                className="transition-colors duration-200 ease-in-out transform  outline-none focus:outline-none flex flex-row items-center justify-center rounded-md font-bold mx-auto border border-blue bg-blue  text-white text-lg px-3 py-1 cursor-pointer hover:bg-blue-darkest hover:border-blue-darkest"
              >
                Next
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
