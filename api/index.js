import express from "express";
import bodyParser from "body-parser";

import ingest from "./routes/ingest.js";
import messages from "./routes/messages.js"; // ✅ make sure this file exists
import { initDb } from "./db.js";

const app = express(); // ✅ app must be created BEFORE app.use calls

// ✅ CORS for Render -> Railway
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") return res.sendStatus(204);
  next();
});

app.use(bodyParser.json());

// ✅ routes
app.use("/ingest", ingest);
app.use("/messages", messages);

// ✅ health check
app.get("/", (_, res) => res.send("AI Inbox Automation Running"));

// ✅ init DB (won't crash if DATABASE_URL missing)
initDb()
  .then(() => console.log("✅ DB ready"))
  .catch((e) => console.error("❌ DB init error:", e));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`✅ Server listening on ${port}`));






