import { useState } from "react";
import dynamic from "next/dynamic";
import { EditorState, ContentState, convertToRaw, convertFromHTML } from "draft-js";
import draftToHtml from "draftjs-to-html";

const RichTextEditor = dynamic(() => import("./CreateEvaluation/RichTextEditor"), {
  ssr: false,
});

type EvaluationShortDescriptionProps = {
  store: any;
};
export default function EvaluationShortDescription({ store }: EvaluationShortDescriptionProps) {
  const [editorState, setEditorState] = useState(
    store.evaluation?.description
      ? EditorState.createWithContent(
          ContentState.createFromBlockArray(
            convertFromHTML(store.evaluation?.description).contentBlocks,
            convertFromHTML(store.evaluation?.description).entityMap,
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
    store.setEvaluationDescription(draftToHtml(convertToRaw(editorState.getCurrentContent())));
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
