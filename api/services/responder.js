import client from "./openai.js";

export default async function respond(text, intent) {
  const r = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: "Draft a professional business reply."
      },
      {
        role: "user",
        content: `Message: ${text}\nIntent: ${intent}`
      }
    ]
  });

  return r.choices[0].message.content;
}
