import express from "express";
import { notFound } from "./src/middleware/notFound.js";
import { errorHandler } from "./src/middleware/error.js";
import { httpLogger } from "./src/utils/logger.js";
import { ApiError } from "./src/utils/ApiError.js";

export const app = express();

app.use(httpLogger);
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok", ts: new Date().toISOString() });
});

// ─── TEMP TEST ROUTES ─────────────────────────────
app.get("/boom", () => {
  throw ApiError.badRequest("Test error");
});

app.get("/crash", () => {
  throw new Error("Something broke");
});
// ──────────────────────────────────────────────────

app.use(notFound);
app.use(errorHandler);
