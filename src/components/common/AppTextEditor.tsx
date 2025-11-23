import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import "@blocknote/core/fonts/inter.css";
import { ko } from "@blocknote/core/locales";

function AppTextEditor({ value, onChange }) {
  const editor = useCreateBlockNote({
    dictionary: ko,
    initialContent: value ?? "",
  });

  return (
    <BlockNoteView
      editor={editor}
      onChange={() => {
        onChange(editor.document);
      }}
    />
  );
}
export { AppTextEditor };
