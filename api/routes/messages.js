import express from "express";
import { getRecentMessages } from "../db.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const limit = Math.min(parseInt(req.query.limit || "20", 10), 100);
  const rows = await getRecentMessages(limit);
  res.json({ count: rows.length, rows });
});

export default router;
