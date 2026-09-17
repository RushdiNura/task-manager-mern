import { ApiError } from "../utils/ApiError.js";

export const restrictTo =
  (...roles) =>
  (req, res, next) => {
    if (!req.user) {
      throw ApiError.forbidden("You do not have permission");
    }

    if (!roles.includes(req.user.role)) {
      throw ApiError.forbidden("You don't have permission to do that.");
    }
    next();
  };
