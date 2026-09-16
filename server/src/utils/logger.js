import pino from "pino";
import pinoHttp from "pino-http";
import { env } from "../config/env.js";

const isDev = env.NODE_ENV !== "production";

export const logger = pino({
  level: isDev ? "debug" : "info",
  ...(isDev && {
    transport: {
      target: "pino-pretty",
      options: {
        colorize: true,
        translateTime: "HH:MM:ss",
        ignore: "pid,hostname",
      },
    },
  }),
});

// export const logger = pino({
//   level: isDev ? "debug" : "info",
//   transport: isDev
//     ? {
//         target: "pino-pretty",
//         options: { colorize: true, translateTime: "HH:MM:ss" },
//       }
//     : undefined,
// });
export const httpLogger = pinoHttp({
  logger,
  customLogLevel: (req, res, err) => {
    if (err || res.statusCode >= 500) return "error";
    if (res.statusCode >= 400) return "warn";
    return "info";
  },
});
