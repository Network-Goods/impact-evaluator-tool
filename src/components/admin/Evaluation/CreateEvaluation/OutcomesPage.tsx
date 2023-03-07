import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { EditorState, ContentState, convertToRaw, convertFromHTML } from "draft-js";
import { EvaluationDetailsType } from ".";
import draftToHtml from "draftjs-to-html";
import Edit from "public/images/svg/Edit";
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
  const handleFormFieldNameChange = (e: React.ChangeEvent<HTMLInputElement>, id: number) => {
    const newFormFields = formInputs.evaluation_field.map((field: any) => {
      if (field.id === id) {
        field.field_name = e.target.value;
      }
      return field;
    });
    setFormInputs({ ...formInputs, evaluation_field: newFormFields });
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
        <h5 className="text-offblack font-bold mb-1">Fields</h5>
        {store.evaluation?.evaluation_field.map((field: any, index: number) => (
          <div key={index} className="flex items-center pb-1">
            <div className="flex justify-center items-center w-5 h-5 -ml-5 ">
              <Edit className="h-4 w-4 fill-gray mr-1" />
            </div>
            <input
              type="text"
              className="appearance-none w-full px-4 py-2 rounded-lg border border-gray focus:outline-none"
              placeholder="Project Overview"
              value={field.field_name || ""}
              onChange={(e) => handleFormFieldNameChange(e, field.id)}
              onBlur={(e) => store.setFormFieldName(e.target.value, field.id)}
            />
            <div>
              <button
                onClick={() => store.deleteFormField(field.id)}
                className="border border-blue rounded-lg p-2 ml-2"
              >
                <Delete className="w-5 h-5" />
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
