import express from "express";
import bodyParser from "body-parser";
import ingest from "./routes/ingest.js";

const app = express();

// ✅ CORS (allow calls from your Render dashboard)
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // later you can restrict to your Render domain
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") return res.sendStatus(204);
  next();
});

app.use(bodyParser.json());

app.use("/ingest", ingest);

app.get("/", (_, res) => res.send("AI Inbox Automation Running"));

app.listen(process.env.PORT || 3000);

