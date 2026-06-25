import { genkit } from 'genkit';
import { googleAI } from '@genkit-ai/google-genai';

const ai = genkit({
  plugins: [googleAI()],
});

async function listMyModels() {
  try {
    // This calls the API to get a list of models available to your current key
    const models = await ai.listModels();
    console.log("Available models for your account:");
    models.forEach(m => console.log(`- ${m.name}`));
  } catch (err) {
    console.error("Error fetching model list:", err);
  }
}

listMyModels();