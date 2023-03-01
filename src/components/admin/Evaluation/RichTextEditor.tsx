import { useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, ContentState, convertToRaw, convertFromHTML } from "draft-js";
import draftToHtml from "draftjs-to-html";
import parse from "html-react-parser";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

type RichTextEditorProps = {
  store: any;
};

export default function RichTextEditor({ store }: RichTextEditorProps) {
  const blocksFromHTML = convertFromHTML(store.evaluation?.description);
  const state = ContentState.createFromBlockArray(blocksFromHTML.contentBlocks, blocksFromHTML.entityMap);
  const [editorState, setEditorState] = useState(
    store.evaluation?.description ? EditorState.createWithContent(state) : EditorState.createEmpty(),
  );

  const [text, setText] = useState(draftToHtml(convertToRaw(editorState.getCurrentContent())));

  const onEditorStateChange = (editorState: EditorState) => {
    setEditorState(editorState);
    setText(draftToHtml(convertToRaw(editorState.getCurrentContent())));
  };

  return (
    <>
      <Editor
        placeholder="Q1 Retroactive Quadratic Funding"
        editorState={editorState}
        editorClassName="!min-h-[112px] !appearance-none !w-full !px-4 !py-2 !bg-white !rounded-lg !border !border-gray !focus:outline-none"
        toolbarClassName="!border-t-0 !border-l-0 !border-r-0 !w-[326px]"
        toolbar={{
          fontFamily: { options: [], className: "hidden" },
          inline: { options: ["bold", "italic", "underline"] },
          list: { options: ["unordered", "ordered"] },
          embedded: { className: "!hidden" },
          blockType: { className: "!hidden" },
          fontSize: { className: "!hidden" },
          textAlign: { className: "!hidden" },
          colorPicker: { className: "!hidden" },
          image: { className: "!hidden" },
          history: { className: "!hidden" },
        }}
        onEditorStateChange={onEditorStateChange}
        onBlur={() => store.setEvaluationDescription(draftToHtml(convertToRaw(editorState.getCurrentContent())))}
      />
      <h5 className="text-offblack font-bold mb-1 mt-4">Preview</h5>
      <div className="min-h-[112px] pb-8 rich-text-display">{parse(text)}</div>
    </>
  );
}
