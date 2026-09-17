import { ApiError } from "../utils/ApiError.js";
import { verifyAccessToken } from "../utils/jwt.js";

export function protect(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw ApiError.unauthorized("Not authenticated");
  }

  const token = authHeader.slice(7);

  if (!token) {
    throw ApiError.unauthorized("Not authenticated.");
  }

  try {
    const payload = verifyAccessToken(token);
    req.user = { id: payload.sub, role: payload.role };
  } catch (error) {
    throw ApiError.unauthorized("Invalid or expired token");
  }

  next();
}
