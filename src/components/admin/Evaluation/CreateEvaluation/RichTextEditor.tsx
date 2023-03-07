import { Editor } from "react-draft-wysiwyg";
import { EditorState } from "draft-js";
import parse from "html-react-parser";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

type RichTextEditorProps = {
  text: string;
  editorState: EditorState;
  handleEditorStateChange: (editorState: EditorState) => void;
  handleEditorBlur: () => void;
};

export default function RichTextEditor({
  text,
  editorState,
  handleEditorStateChange,
  handleEditorBlur,
}: RichTextEditorProps) {
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
        onEditorStateChange={handleEditorStateChange}
        onBlur={handleEditorBlur}
      />
      <h5 className="text-offblack font-bold mb-1 mt-4">Preview</h5>
      <div className="min-h-[112px] pb-8 rich-text-display">{parse(text)}</div>
    </>
  );
}
