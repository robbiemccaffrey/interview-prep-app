import Editor from '@monaco-editor/react';
import { useRef, useCallback } from 'react';

export interface EditorFile {
  filename: string;
  code: string;
  language: 'typescript' | 'python';
  readOnly?: boolean;
}

interface Props {
  files: EditorFile[];
  activeFileIndex: number;
  onActiveFileChange: (index: number) => void;
  onCodeChange: (filename: string, code: string) => void;
}

export default function MultiFileEditor({
  files,
  activeFileIndex,
  onActiveFileChange,
  onCodeChange,
}: Props) {
  const editorRef = useRef<unknown>(null);

  const activeFile = files[activeFileIndex];

  const handleEditorMount = useCallback((editor: unknown) => {
    editorRef.current = editor;
  }, []);

  const monacoLanguage =
    activeFile?.language === 'python' ? 'python' : 'typescript';

  return (
    <div className="flex flex-col h-full">
      {/* Tab bar */}
      <div className="flex items-center bg-gray-900 border-b border-gray-800 overflow-x-auto shrink-0">
        <div className="flex items-center gap-1 px-2 py-1.5">
          {files.map((file, i) => (
            <button
              key={file.filename}
              onClick={() => onActiveFileChange(i)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-mono transition-colors whitespace-nowrap ${
                i === activeFileIndex
                  ? 'bg-gray-700 text-white'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800'
              }`}
            >
              <span>{file.filename}</span>
              {file.readOnly && (
                <span className="text-[10px] text-gray-500 bg-gray-800 px-1 rounded" title="Read-only">
                  lock
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Editor */}
      <div className="flex-1 overflow-hidden">
        {activeFile && (
          <Editor
            key={activeFile.filename}
            height="100%"
            language={monacoLanguage}
            value={activeFile.code}
            onChange={(val) => {
              if (!activeFile.readOnly) {
                onCodeChange(activeFile.filename, val ?? '');
              }
            }}
            onMount={handleEditorMount}
            theme="vs-dark"
            options={{
              fontSize: 13,
              fontFamily: '"JetBrains Mono", "Fira Code", monospace',
              fontLigatures: true,
              minimap: { enabled: false },
              scrollBeyondLastLine: false,
              lineNumbers: 'on',
              renderLineHighlight: 'line',
              tabSize: 2,
              insertSpaces: true,
              wordWrap: 'on',
              automaticLayout: true,
              padding: { top: 12, bottom: 12 },
              readOnly: activeFile.readOnly ?? false,
            }}
          />
        )}
      </div>
    </div>
  );
}
