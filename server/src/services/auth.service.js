import { User } from "../models/User.js";
import { ApiError } from "../utils/ApiError.js";
import { signAccessToken, signRefreshToken } from "../utils/jwt.js";
import { toSafeUser } from "../utils/toSafeUser.js";

export const registerUser = async ({ name, email, password }) => {
  const existing = await User.findOne({ email });
  if (existing) throw ApiError.conflict("Email already in use");

  const user = await User.create({ name, email, password, role: "user" });
  const accessToken = signAccessToken(user);
  const refreshToken = signRefreshToken(user);

  return { user: toSafeUser(user), accessToken, refreshToken };
};

export const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email }).select("+password");
  if (!user) throw ApiError.unauthorized("Invalid credentials");

  const isMatch = await user.comparePassword(password);
  if (!isMatch) throw ApiError.unauthorized("Invalid credentials");

  const accessToken = signAccessToken(user);
  const refreshToken = signRefreshToken(user);
  return { user: toSafeUser(user), accessToken, refreshToken };
};
