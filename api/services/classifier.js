import client from "./openai.js";

export default async function classify(text) {
  if (!client) {
    return "ERROR: OPENAI_API_KEY missing (set Railway env var).";
  }

  const r = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: "Classify business inquiry intent." },
      { role: "user", content: text }
    ]
  });

  return r.choices[0].message.content;
}

