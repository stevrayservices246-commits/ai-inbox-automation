import OpenAI from "openai";

const apiKey = process.env.OPENAI_API_KEY;

let client = null;

if (apiKey && apiKey.trim().length > 0) {
  client = new OpenAI({ apiKey });
} else {
  console.warn("⚠️ OPENAI_API_KEY is missing. OpenAI calls will fail until it's set.");
}

export default client;

