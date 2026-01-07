import client from "./openai.js";

export default async function respond(text, intent) {
  if (!client) {
    return "ERROR: OPENAI_API_KEY missing (set Railway env var).";
  }

  const r = await client.chat.completions.create( {
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: "Draft a professional business reply." },
      { role: "user", content: `Message: ${text}\nIntent: ${intent}` }
    ]
  });

  return r.choices[0].message.content;
}

