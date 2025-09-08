// vue
import { ref, onMounted, onBeforeUnmount } from "vue";

// tiptap [base]
import { Editor } from "@tiptap/vue-3";

// tiptap [extensions]
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import FileHandler from "@tiptap/extension-file-handler";

const useTiptap = () => {
  const editor = ref<Editor | null>(null);

  onMounted(() => {
    editor.value = new Editor({
      extensions: [
        StarterKit,
        Image,
        FileHandler.configure({
          allowedMimeTypes: [
            "image/png",
            "image/jpeg",
            "image/gif",
            "image/webp",
          ],
          onDrop: (currentEditor, files, pos) => {
            files.forEach((file) => {
              const fileReader = new FileReader();

              fileReader.readAsDataURL(file);
              fileReader.onload = () => {
                currentEditor
                  .chain()
                  .insertContentAt(pos, {
                    type: "image",
                    attrs: {
                      src: fileReader.result,
                    },
                  })
                  .focus()
                  .run();
              };
            });
          },
          onPaste: (currentEditor, files) => {
            files.forEach((file) => {
              const fileReader = new FileReader();

              fileReader.readAsDataURL(file);
              fileReader.onload = () => {
                currentEditor
                  .chain()
                  .insertContentAt(currentEditor.state.selection.anchor, {
                    type: "image",
                    attrs: {
                      src: fileReader.result,
                    },
                  })
                  .focus()
                  .run();
              };
            });
          },
        }),
      ],
      editorProps: {
        attributes: {
          class:
            "prose prose-sm sm:prose lg:prose-lg xl:prose-2xl focus:outline-none shadow p-24 min-h-[1123px] max-w-4xl mx-auto bg-white",
        },
      },
    });
  });

  onBeforeUnmount(() => {
    editor.value?.destroy();
  });

  return { editor };
};

export default useTiptap;
