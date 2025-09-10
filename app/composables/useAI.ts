// gemini
import { GoogleGenAI } from "@google/genai";

const useAI = () => {
  const runtimeConfig = useRuntimeConfig();
  const ai = new GoogleGenAI({
    apiKey: `${runtimeConfig.public.apiKey}`,
  });

  const chat = async () => {
    const prompt = `
    Generate a random story in HTML format with the following structure:
    
    <h1>[A creative title for the story]</h1>
    
    <p>[The story content in one or more full paragraphs. 
    The length can be short or long, but it must read like a natural story. 
    Do not output lists, explanations, or introductions — only the title and the story in HTML tags.]</p>
    `;

    const payload = {
      model: "gemini-2.5-flash",
      contents: {
        text: prompt,
      },
    };

    try {
      const response = await ai.models.generateContent(payload);
      return response.text;
    } catch (error) {
      console.error("Error generating AI response:", error);
      return "Sorry, I couldn't process your request at the moment.";
    }
  };

  return { chat };
};

export default useAI;
