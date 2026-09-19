import express from "express";
import { getMe, login, refresh, register } from "../controllers/auth.controller.js";
import { protect } from "../middleware/auth.js";
import { validate } from "../middleware/validate.js";
import { loginSchema, registerSchema } from "../validators/auth.validator.js";

export const authRouter = express.Router();

authRouter.post("/register",validate({body:registerSchema}), register);
authRouter.post("/login", validate({body:loginSchema}), login);
authRouter.get("/me",protect,getMe);
authRouter.post("/refresh",refresh)

