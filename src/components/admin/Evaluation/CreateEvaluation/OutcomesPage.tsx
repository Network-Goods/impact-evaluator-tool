import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Papa from "papaparse";
import { useUserProfileStore } from "src/lib/UserProfileStore";
import { EvaluationDetailsType, EvaluationFieldType } from ".";
import ConfirmUploadModal from "../EvaluatorModal/ConfirmUploadModal";

const EvaluationFormDescription = dynamic(() => import("../EvaluationFormDescription"), {
  ssr: false,
});

type OutcomesPageProps = {
  store: any;
  formInputs: EvaluationDetailsType;
  setFormInputs: (formInputs: EvaluationDetailsType) => void;
};
export default function OutcomesPage({ store, formInputs, setFormInputs }: OutcomesPageProps) {
  const userProfileStore = useUserProfileStore();
  const [loading, setLoading] = useState(false);
  const [csvData, setCsvData] = useState<Array<Record<string, any>>>([]);
  const [openConfirmUploadModal, setOpenConfirmUploadModal] = useState(false);
  const handleFormFieldChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    id: string,
    field: keyof EvaluationFieldType,
  ) => {
    const newFormInputs: any = { ...formInputs };
    const fieldIndex = newFormInputs.evaluation_field.findIndex((field: any) => field.id === id);
    newFormInputs.evaluation_field[fieldIndex][field] = event.target.value;
    setFormInputs(newFormInputs);
  };

  useEffect(() => {
    setFormInputs({ ...formInputs, evaluation_field: store.evaluation?.evaluation_field });
  }, [store.evaluation?.evaluation_field]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      Papa.parse(file, {
        header: true,
        complete: (result) => {
          setCsvData(result.data as Record<string, any>[]);
        },
      });
    }
  };

  const handleUploadClick = async () => {
    setLoading(true);
    const user_id = userProfileStore.profile?.id;

    if (!user_id) {
      console.error("Profile is not defined.");
      setLoading(false);
      return;
    }

    await store.uploadSubmissions(csvData, user_id);
    setCsvData([]);
    setLoading(false);
  };

  return (
    <>
      <div className="mb-6">
        <h5 className="text-offblack font-bold">Form Description</h5>
        <h5 className="text-[#979797] text-sm mb-1">Summary of form, round, and/or instructions. </h5>
        <EvaluationFormDescription store={store} />
      </div>
      <div className="mb-6">
        <h3 className="text-lg text-offblack font-bold mb-2">Create a form to collect submissions for your round</h3>
      </div>

      <div className="mb-6">
        <h5 className="text-offblack font-bold mb-1">Form Fields</h5>
        {store.evaluation?.evaluation_field.map((field: any, index: number) => (
          <div key={index} className="flex pb-1">
            <div className="flex flex-col w-full">
              <h5 className="text-[#979797] text-sm mb-1">Heading</h5>
              <input
                type="text"
                className="appearance-none w-full px-4 py-2 rounded-lg border border-gray focus:outline-none"
                placeholder="Project Overview"
                value={field.heading || ""}
                onChange={(e) => handleFormFieldChange(e, field.id, "heading")}
                onBlur={(e) => store.setFormFieldHeading(e.target.value, field.id)}
              />
              <h5 className="text-[#979797] text-sm mb-1 mt-2">Subheading (optional)</h5>
              <input
                type="text"
                className="appearance-none w-full px-4 py-2 rounded-lg border border-gray focus:outline-none"
                placeholder="Using 280 characters or less, describe your project."
                value={field.subheading || ""}
                onChange={(e) => handleFormFieldChange(e, field.id, "subheading")}
                onBlur={(e) => store.setFormFieldSubheading(e.target.value, field.id)}
              />
              <h5 className="text-[#979797] text-sm mb-1">Placeholder</h5>
              <input
                type="text"
                className="appearance-none w-full px-4 py-2 rounded-lg border border-gray focus:outline-none"
                placeholder="My project is..."
                value={field.placeholder || ""}
                onChange={(e) => handleFormFieldChange(e, field.id, "placeholder")}
                onBlur={(e) => store.setFormFieldPlaceholder(e.target.value, field.id)}
              />
            </div>
            <div className="flex flex-col justify-between ml-2">
              <div>
                <h5 className="text-[#979797] text-sm mb-1">Max length (characters)</h5>
                <input
                  type="number"
                  className="appearance-none w-full px-4 py-2 rounded-lg border border-gray focus:outline-none"
                  placeholder="280"
                  value={field.char_count || ""}
                  onChange={(e) => handleFormFieldChange(e, field.id, "char_count")}
                  onBlur={(e) => store.setFormFieldCharCount(Number(e.target.value), field.id)}
                />
              </div>
              <button
                onClick={() => store.deleteFormField(field.id)}
                className="text-blue text-lg font-bold border border-blue rounded-lg px-4 py-[6px] ml-auto"
              >
                Delete Field
              </button>
            </div>
          </div>
        ))}
        <button
          className="transition-colors duration-200 ease-in-out transform outline-none focus:outline-none flex flex-row items-center justify-center rounded-md font-bold border border-blue hover:bg-white focus:bg-white text-blue text-lg px-4 py-1"
          onClick={() => store.createFormField()}
        >
          <span>Add Field</span>
        </button>
      </div>
      <div className="mb-6">or</div>
      <h5 className="text-offblack font-bold mb-1">Upload submissions</h5>

      <div className="flex">
        <input type="file" accept=".csv" onChange={handleFileChange} />
        {csvData.length > 0 ? (
          <button
            className="transition-colors duration-200 ease-in-out transform  outline-none focus:outline-none flex flex-row items-center justify-center rounded-md font-bold border border-blue bg-blue hover:bg-blue-darkest hover:border-blue-darkest  text-white text-sm md:text-base py-1 w-20"
            onClick={() => setOpenConfirmUploadModal(true)}
          >
            {loading ? "Uploading" : "Upload"}
          </button>
        ) : null}
      </div>
      <ConfirmUploadModal
        open={openConfirmUploadModal}
        handleClose={() => setOpenConfirmUploadModal(false)}
        handleUpload={handleUploadClick}
      />
    </>
  );
}
