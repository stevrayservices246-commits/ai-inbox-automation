import express from "express";
import bodyParser from "body-parser";
import ingest from "./routes/ingest.js";
import { initDb } from "./db.js";
import messages from "./routes/messages.js";
app.use("/messages", messages);


const app = express();

// ✅ CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") return res.sendStatus(204);
  next();
});

app.use(bodyParser.json());

app.use("/ingest", ingest);

app.get("/", (_, res) => res.send("AI Inbox Automation Running"));

// ✅ Add this:
initDb()
  .then(() => console.log("✅ DB ready"))
  .catch((e) => console.error("❌ DB init error:", e));

app.listen(process.env.PORT || 3000);




