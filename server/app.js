import express from "express";
import cors from "cors";

import { notFound } from "./src/middleware/notFound.js";
import { errorHandler } from "./src/middleware/error.js";
import { httpLogger } from "./src/utils/logger.js";
import { ApiError } from "./src/utils/ApiError.js";
import { apiRouter } from "./src/routes/index.js";
import { env } from "./src/config/env.js";

export const app = express();

app.use(httpLogger);
app.use(express.json());

app.use(cors({ origin: env.CLIENT_URL, credentials: true }));
app.get("/health", (_req, res) => {
  res.json({ status: "ok", ts: new Date().toISOString() });
});

app.use("/api", apiRouter);

app.use(notFound);
app.use(errorHandler);
