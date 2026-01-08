import express from "express";
import classify from "../services/classifier.js";
import respond from "../services/responder.js";
import { insertMessage } from "../db.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { message, sender } = req.body || {};
    if (!message) return res.status(400).json({ error: "Missing 'message'" });

    const classification = await classify(message);
    const reply = await respond(message, classification);

    const saved = await insertMessage({
      sender,
      message,
      classification,
      reply
    });

    return res.json({
      status: "processed",
      saved: saved || null,
      classification,
      reply
    });
  } catch (err) {
    console.error("ingest error:", err);
    return res.status(500).json({ error: "Server error", details: String(err?.message || err) });
  }
});

export default router;

