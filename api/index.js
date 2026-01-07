import express from "express";
import bodyParser from "body-parser";
import ingest from "./routes/ingest.js";

const app = express();
app.use(bodyParser.json());

app.use("/ingest", ingest);

app.get("/", (_, res) => res.send("AI Inbox Automation Running"));

app.listen(process.env.PORT || 3000);
