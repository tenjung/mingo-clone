import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import "@blocknote/core/fonts/inter.css";
import { ko } from "@blocknote/core/locales";
import type { Block } from "@blocknote/core";

interface Props {
  props: Block[];
  onSetContent: (params: Block[]) => void;
}

function AppTextEditor({ props, onSetContent }: Props) {
  // Creates a new editor instance.
  const editor = useCreateBlockNote({
    dictionary: ko,
  });

  // Renders the editor instance using a React component.
  return <BlockNoteView editor={editor} onChange={() => onSetContent(editor.document)} />;
}

export { AppTextEditor };
