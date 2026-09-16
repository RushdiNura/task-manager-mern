import mongoose from "mongoose";
import { env } from "./env.js";
import { logger } from "../utils/logger.js";

export const connectDb = async () => {
  try {
    const conn = await mongoose.connect(env.MONGO_URI);
    logger.info("database Connected Successfully!!");
    return conn;
  } catch (error) {
    logger.error("database Disconnected", error.message);
    process.exit(1);
  }
};

export const disconnectDb = async () => {
  await mongoose.connection.close();
};
