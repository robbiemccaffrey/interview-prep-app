import Editor, { OnMount } from '@monaco-editor/react';
import { useRef } from 'react';

interface Props {
  value: string;
  onChange: (val: string) => void;
  onEditorMount?: (getCode: () => string) => void;
}

export default function CodeEditor({ value, onChange, onEditorMount }: Props) {
  const editorRef = useRef<unknown>(null);

  const handleMount: OnMount = (editor) => {
    editorRef.current = editor;
    if (onEditorMount) {
      // @ts-ignore
      onEditorMount(() => editor.getValue());
    }
  };

  return (
    <div className="h-full w-full overflow-hidden rounded-lg">
      <Editor
        height="100%"
        defaultLanguage="python"
        value={value}
        onChange={(val) => onChange(val ?? '')}
        onMount={handleMount}
        theme="vs-dark"
        options={{
          fontSize: 13,
          fontFamily: '"JetBrains Mono", "Fira Code", monospace',
          fontLigatures: true,
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          lineNumbers: 'on',
          renderLineHighlight: 'line',
          tabSize: 4,
          insertSpaces: true,
          wordWrap: 'on',
          automaticLayout: true,
          padding: { top: 12, bottom: 12 },
        }}
      />
    </div>
  );
}
