// src/middleware/error.js
import { env } from "../config/env.js";
import { ApiError } from "../utils/ApiError.js";
// import { logger } from "../utils/logger.js";

export const errorHandler = (err, req, res, next) => {
  let error = err;

  if (res.headersSent) {
    return next(err);
  }
  if (err instanceof ApiError) {
    // nothing to do
  } else if (err.name === "ValidationError" && err.errors) {
    const details = Object.values(err.errors).map((e) => ({
      field: e.path,
      message: e.message,
    }));
    error = ApiError.badRequest("Validation failed", details);
  } else if (err.name === "CastError") {
    error = ApiError.badRequest(`Invalid ${err.path}: ${err.value}`);
  } else if (err.code === 11000) {
    const field = Object.keys(err.keyValue || {})[0] || "field";
    error = ApiError.conflict(`Duplicate value for ${field}`);
  } else {
    error = new ApiError(
      err.statusCode || 500,
      err.message || "Internal Server Error",
    );
    error.isOperational = false;
    error.stack = err.stack;
  }

  const statusCode = error.statusCode || 500;

  if (error.isOperational) {
    req.log.warn(
      { statusCode, path: req.originalUrl, msg: error.message },
      "Operational error",
    );
  } else {
    req.log.error({ err, path: req.originalUrl }, "Unhandled error");
  }

  const message =
    error.isOperational || env.NODE_ENV !== "production"
      ? error.message
      : "Internal Server Error";

  const body = { success: false, message };
  if (error.details) body.errors = error.details;

  res.status(statusCode).json(body);
};
