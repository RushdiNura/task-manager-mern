import express from "express";
import {authRouter} from "./auth.routes.js";
export const apiRouter = express.Router();

apiRouter.use("/auth", authRouter);


