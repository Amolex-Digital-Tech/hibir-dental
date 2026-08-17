"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";

type BlogEditorProps = {
  value: string;
  onChange: (value: string) => void;
};

export default function BlogEditor({
  value,
  onChange,
}: BlogEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,

      Link.configure({
        openOnClick: false,
      }),

      Image.configure({
        inline: false,
        allowBase64: false,
      }),
    ],

    content: value,

    immediatelyRender: false,

    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
  });

  if (!editor) {
    return (
      <div className="min-h-[400px] rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-sm text-slate-400">
        Loading editor...
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-slate-200 overflow-hidden bg-white">

      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-1 p-3 bg-slate-50 border-b border-slate-200">

        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleBold().run()
          }
          className={`px-3 py-2 rounded-lg text-sm font-bold ${
            editor.isActive("bold")
              ? "bg-slate-900 text-white"
              : "hover:bg-slate-200"
          }`}
        >
          B
        </button>

        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleItalic().run()
          }
          className={`px-3 py-2 rounded-lg text-sm italic ${
            editor.isActive("italic")
              ? "bg-slate-900 text-white"
              : "hover:bg-slate-200"
          }`}
        >
          I
        </button>

        <div className="w-px h-6 bg-slate-300 mx-1" />

        <button
          type="button"
          onClick={() =>
            editor
              .chain()
              .focus()
              .toggleHeading({ level: 2 })
              .run()
          }
          className={`px-3 py-2 rounded-lg text-xs font-bold ${
            editor.isActive("heading", { level: 2 })
              ? "bg-slate-900 text-white"
              : "hover:bg-slate-200"
          }`}
        >
          H2
        </button>

        <button
          type="button"
          onClick={() =>
            editor
              .chain()
              .focus()
              .toggleHeading({ level: 3 })
              .run()
          }
          className={`px-3 py-2 rounded-lg text-xs font-bold ${
            editor.isActive("heading", { level: 3 })
              ? "bg-slate-900 text-white"
              : "hover:bg-slate-200"
          }`}
        >
          H3
        </button>

        <div className="w-px h-6 bg-slate-300 mx-1" />

        <button
          type="button"
          onClick={() =>
            editor
              .chain()
              .focus()
              .toggleBulletList()
              .run()
          }
          className="px-3 py-2 rounded-lg text-sm hover:bg-slate-200"
        >
          • List
        </button>

        <button
          type="button"
          onClick={() =>
            editor
              .chain()
              .focus()
              .toggleOrderedList()
              .run()
          }
          className="px-3 py-2 rounded-lg text-sm hover:bg-slate-200"
        >
          1. List
        </button>

        <button
          type="button"
          onClick={() =>
            editor
              .chain()
              .focus()
              .toggleBlockquote()
              .run()
          }
          className="px-3 py-2 rounded-lg text-sm hover:bg-slate-200"
        >
          Quote
        </button>

      </div>

      {/* Editor */}
      <EditorContent
        editor={editor}
        className="
          min-h-[400px]
          px-5
          py-5

          prose
          prose-slate
          max-w-none

          prose-headings:text-slate-900
          prose-headings:font-bold

          prose-p:text-slate-700
          prose-p:leading-8

          prose-a:text-amber-600

          prose-strong:text-slate-900

          focus:outline-none
        "
      />

    </div>
  );
}