// tiptap [types]
import type { Editor } from "@tiptap/vue-3";

// icons
import {
  Bold,
  Italic,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  List,
  ListOrdered,
  Quote,
  Code,
  Undo,
  Redo,
} from "lucide-vue-next";

export const toolbarOption = [
  // bold
  {
    title: "Bold",
    icon: Bold,
    action: (editor: Editor) => editor.chain().focus().toggleBold().run(),
    isActive: (editor: Editor) => editor.isActive("bold"),
  },

  // italic
  {
    title: "Italic",
    icon: Italic,
    action: (editor: Editor) => editor.chain().focus().toggleItalic().run(),
    isActive: (editor: Editor) => editor.isActive("italic"),
  },

  // heading
  {
    title: "Heading 1",
    icon: Heading1,
    action: (editor: Editor) =>
      editor.chain().focus().toggleHeading({ level: 1 }).run(),
    isActive: (editor: Editor) => editor.isActive("heading", { level: 1 }),
  },
  {
    title: "Heading 2",
    icon: Heading2,
    action: (editor: Editor) =>
      editor.chain().focus().toggleHeading({ level: 2 }).run(),
    isActive: (editor: Editor) => editor.isActive("heading", { level: 2 }),
  },
  {
    title: "Heading 3",
    icon: Heading3,
    action: (editor: Editor) =>
      editor.chain().focus().toggleHeading({ level: 3 }).run(),
    isActive: (editor: Editor) => editor.isActive("heading", { level: 3 }),
  },
  {
    title: "Heading 4",
    icon: Heading4,
    action: (editor: Editor) =>
      editor.chain().focus().toggleHeading({ level: 4 }).run(),
    isActive: (editor: Editor) => editor.isActive("heading", { level: 4 }),
  },
  {
    title: "Heading 5",
    icon: Heading5,
    action: (editor: Editor) =>
      editor.chain().focus().toggleHeading({ level: 5 }).run(),
    isActive: (editor: Editor) => editor.isActive("heading", { level: 5 }),
  },
  {
    title: "Heading 6",
    icon: Heading6,
    action: (editor: Editor) =>
      editor.chain().focus().toggleHeading({ level: 6 }).run(),
    isActive: (editor: Editor) => editor.isActive("heading", { level: 6 }),
  },

  // list
  {
    title: "Bullet List",
    icon: List,
    action: (editor: Editor) => editor.chain().focus().toggleBulletList().run(),
    isActive: (editor: Editor) => editor.isActive("bulletList"),
  },
  {
    title: "Ordered List",
    icon: ListOrdered,
    action: (editor: Editor) =>
      editor.chain().focus().toggleOrderedList().run(),
    isActive: (editor: Editor) => editor.isActive("orderedList"),
  },

  // quote
  {
    title: "Quote",
    icon: Quote,
    action: (editor: Editor) => editor.chain().focus().toggleBlockquote().run(),
    isActive: (editor: Editor) => editor.isActive("blockquote"),
  },

  // code block
  {
    title: "Code Block",
    icon: Code,
    action: (editor: Editor) => editor.chain().focus().toggleCodeBlock().run(),
    isActive: (editor: Editor) => editor.isActive("codeBlock"),
  },

  // undo redo
  {
    title: "Undo",
    icon: Undo,
    action: (editor: Editor) => editor.chain().focus().undo().run(),
    isActive: (editor: Editor) => !editor.can().undo(),
  },
  {
    title: "Redo",
    icon: Redo,
    action: (editor: Editor) => editor.chain().focus().redo().run(),
    isActive: (editor: Editor) => !editor.can().redo(),
  },
];
