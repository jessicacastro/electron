import Highlight from '@tiptap/extension-highlight'
import Typography from '@tiptap/extension-typography'
import StarterKit from '@tiptap/starter-kit'

import { EditorContent, useEditor } from '@tiptap/react'
import Placeholder from '@tiptap/extension-placeholder'
import Document from '@tiptap/extension-document'

/**
 * Editor component that uses the EditorContent component from tiptap.
 * -> w-[65ch] is a tailwindcss class that sets the width of the editor to 65 characters.
 * -> useEditor is a hook that initializes the editor with the given extensions and content.
 * -> autofocus: 'end' sets the focus to the end of the editor.
 */

export type OnContentUpdatedParams = {
  title: string
  content: string
}

type EditorProps = {
  content: string
  onContentUpdated: (params: OnContentUpdatedParams) => void
}

export const Editor = ({ content, onContentUpdated }: EditorProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        document: false,
      }),
      Highlight,
      Typography,
      Placeholder.configure({
        placeholder: 'Untitled document',
        emptyEditorClass:
          'before:content-[attr(data-placeholder)] before:text-gray-500 before:h-0 before:float-left before:pointer-events-none',
      }),
      Document.extend({
        content: 'heading block*', // Only allow headings and blocks as first level content
      }),
    ],
    content: content ?? '',
    autofocus: 'end',
    editorProps: {
      attributes: {
        class: 'focus:outline-none prose prose-invert prose-headings:mt-0',
      },
    },
    onUpdate: ({ editor }) => {
      const contentRegex = /(<h1>(?<title>.+)<\/h1>(?<content>.+)?)/

      const parsedContent = editor.getHTML().match(contentRegex)?.groups

      const title = parsedContent?.title ?? 'Untitled'
      const content = parsedContent?.content ?? ''

      onContentUpdated({ title, content })
    },
  })

  return <EditorContent className="w-[65ch]" editor={editor} />
}
