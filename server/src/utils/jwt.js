import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

export const signAccessToken = (user) => {
  return jwt.sign(
    { sub: user._id.toString(), role: user.role },
    env.JWT_ACCESS_SECRET,
    {
      expiresIn: env.JWT_ACCESS_EXPIRES || "15m",
    },
  );
};

export const signRefreshToken = (user) => {
  return jwt.sign(
    { sub: user._id.toString(), role: user.role },
    env.JWT_REFRESH_SECRET,
    {
      expiresIn: env.JWT_REFRESH_EXPIRES || "30d",
    },
  );
};

export const verifyAccessToken = (token) =>
  jwt.verify(token, env.JWT_ACCESS_SECRET);

export const verifyRefreshToken = (token) =>
  jwt.verify(token, env.JWT_REFRESH_SECRET);