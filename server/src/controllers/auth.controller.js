import { User } from "../models/User.js";
import { loginUser, registerUser } from "../services/auth.service.js";
import { ApiError } from "../utils/ApiError.js";
import { signAccessToken, verifyRefreshToken } from "../utils/jwt.js";
import { toSafeUser } from "../utils/toSafeUser.js";

export const register = async (req, res) => {
  const { name, email, password } = req.body;

  const data = await registerUser({ name, email, password });
  res.status(201).json({
    success: true,
    data: data,
  });
};
export const login = async (req, res) => {
  const { email, password } = req.body;

  const data = await loginUser({ email, password });
  res.status(200).json({
    success: true,
    data: data,
  });
};

export const getMe = async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) throw ApiError.unauthorized("User no longer exist");

  res.status(200).json({
    success: true,
    data: toSafeUser(user),
  });
};

export const refresh = async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) throw ApiError.unauthorized("Refresh token required");

  let payload;
  try {
    payload = verifyRefreshToken(refreshToken);
  } catch {
    throw ApiError.unauthorized("Invalid or expired refresh token");
  }
  const user = await User.findById(payload.sub);

  if (!user) throw ApiError.unauthorized("User no longer exists");

  const accessToken = signAccessToken(user);
  res.status(200).json({ success: true, data: { accessToken } });
};
