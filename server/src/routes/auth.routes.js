import express from "express";
import { getMe, login, refresh, register } from "../controllers/auth.controller.js";
import { protect } from "../middleware/auth.js";

export const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.get("/me",protect,getMe);
authRouter.post("/refresh",refresh)

