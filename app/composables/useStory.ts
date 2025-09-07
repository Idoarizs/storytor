// tiptap [types]
import type { Editor } from "@tiptap/vue-3";

export const useStory = () => {
  const STORAGE_KEY = "stories";

  function getAllStories() {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  }

  function createStory(editor: Editor) {
    if (!editor) return;
    const stories = getAllStories();

    const json = editor.getJSON();
    const title = json.content[0].content[0]?.text;

    const newStory = {
      id: crypto.randomUUID(),
      title,
      content: json.content,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    stories.push(newStory);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stories));
  }

  function readStory(editor: Editor, id: string) {
    if (!editor) return;
    const stories = getAllStories();
    const story = stories.find((s: any) => s.id === id);

    if (story) {
      editor.commands.setContent(story.content);
      return story;
    }
    return null;
  }

  function updateStory(editor: Editor, id: string, title?: string) {
    if (!editor) return;
    const stories = getAllStories();
    const index = stories.findIndex((s: any) => s.id === id);

    if (index >= 0) {
      stories[index].content = editor.getJSON();
      if (title) stories[index].title = title;
      stories[index].updatedAt = new Date().toISOString();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stories));
      return stories[index];
    }
    return null;
  }

  function deleteStory(id: string) {
    const stories = getAllStories().filter((s: any) => s.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stories));
    return stories;
  }

  return { createStory, readStory, updateStory, deleteStory, getAllStories };
};

export default useStory;
