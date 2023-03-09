import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { EditorState, ContentState, convertToRaw, convertFromHTML } from "draft-js";
import { EvaluationDetailsType, EvaluationFieldType } from ".";
import draftToHtml from "draftjs-to-html";
import Delete from "public/images/svg/Delete";

const RichTextEditor = dynamic(() => import("./RichTextEditor"), {
  ssr: false,
});

type OutcomesPageProps = {
  store: any;
  formInputs: EvaluationDetailsType;
  setFormInputs: (formInputs: EvaluationDetailsType) => void;
};
export default function OutcomesPage({ store, formInputs, setFormInputs }: OutcomesPageProps) {
  const [editorState, setEditorState] = useState(
    store.evaluation?.form_description
      ? EditorState.createWithContent(
          ContentState.createFromBlockArray(
            convertFromHTML(store.evaluation?.form_description).contentBlocks,
            convertFromHTML(store.evaluation?.form_description).entityMap,
          ),
        )
      : EditorState.createEmpty(),
  );

  const [text, setText] = useState(draftToHtml(convertToRaw(editorState.getCurrentContent())));

  const handleEditorStateChange = (editorState: EditorState) => {
    setEditorState(editorState);
    setText(draftToHtml(convertToRaw(editorState.getCurrentContent())));
  };

  const handleEditorBlur = () => {
    store.setFormDescription(draftToHtml(convertToRaw(editorState.getCurrentContent())));
  };
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

  return (
    <>
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
              <h5 className="text-[#979797] text-sm mb-1 mt-2">Subheading</h5>
              <input
                type="text"
                className="appearance-none w-full px-4 py-2 rounded-lg border border-gray focus:outline-none"
                placeholder="Using 280 characters or less, describe your project."
                value={field.subheading || ""}
                onChange={(e) => handleFormFieldChange(e, field.id, "subheading")}
                onBlur={(e) => store.setFormFieldSubheading(e.target.value, field.id)}
              />
            </div>
            <div className="flex flex-col justify-between ml-2">
              <div>
                <h5 className="text-[#979797] text-sm mb-1">Max length (characters)</h5>
                <input
                  type="text"
                  className="appearance-none w-full px-4 py-2 rounded-lg border border-gray focus:outline-none"
                  placeholder="Project Overview"
                  value={field.char_count || ""}
                  onChange={(e) => handleFormFieldChange(e, field.id, "char_count")}
                  onBlur={(e) => store.setFormFieldCharCount(e.target.value, field.id)}
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
      <div className="mb-6">
        <h5 className="text-offblack font-bold">Form Description</h5>
        <h5 className="text-[#979797] text-sm mb-1">Summary of form, round, and/or instructions. </h5>
        <RichTextEditor
          text={text}
          editorState={editorState}
          handleEditorStateChange={handleEditorStateChange}
          handleEditorBlur={handleEditorBlur}
        />
      </div>
    </>
  );
}
