// src/middleware/validate.js
import { ApiError } from "../utils/ApiError.js";


export const validate = (schemas) => (req, res, next) => {
  try {
    for (const key of ["params", "query", "body"]) {
      const schema = schemas[key];
      if (!schema) continue;

      const result = schema.safeParse(req[key]);
      if (!result.success) {
        const details = result.error.issues.map((issue) => ({
          field: issue.path.join(".") || key,
          message: issue.message,
        }));
        throw ApiError.badRequest("Validation failed", details);
      }

    
      if (key === "query") {
        Object.defineProperty(req, "query", {
          value: result.data,
          writable: true,
          configurable: true,
        });
      } else {
        req[key] = result.data;
      }
    }
    next();
  } catch (err) {
    next(err);
  }
};
