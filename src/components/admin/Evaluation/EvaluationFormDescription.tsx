import { useState } from "react";
import dynamic from "next/dynamic";
import { EditorState, ContentState, convertToRaw, convertFromHTML } from "draft-js";
import draftToHtml from "draftjs-to-html";

const RichTextEditor = dynamic(() => import("./CreateEvaluation/RichTextEditor"), {
  ssr: false,
});

type EvaluationFormDescriptionProps = {
  store: any;
};
export default function EvaluationFormDescription({ store }: EvaluationFormDescriptionProps) {
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

  return (
    <RichTextEditor
      text={text}
      editorState={editorState}
      handleEditorStateChange={handleEditorStateChange}
      handleEditorBlur={handleEditorBlur}
    />
  );
}
