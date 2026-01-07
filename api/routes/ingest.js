import express from "express";
import classify from "../services/classifier.js";
import respond from "../services/responder.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { message, sender } = req.body;

  const classification = await classify(message);
  const reply = await respond(message, classification);

  res.json({
    status: "processed",
    classification,
    reply
  });
});

export default router;
