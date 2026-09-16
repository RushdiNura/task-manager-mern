import { connectDb, disconnectDb } from "./src/config/db.js";
import { app } from "./app.js";
import { env } from "./src/config/env.js";
import { logger } from "./src/utils/logger.js";

const bootstrap = async () => {
  await connectDb();

  const server = app.listen(env.PORT, () => {
    logger.info(`🚀 Server running on http://localhost:${env.PORT}`);
  });
  let shuttingDown = false;
  const shutdown = async (signal) => {
    if (shuttingDown) return;
    shuttingDown = true;
    logger.info(`\n${signal} received — shutting down gracefully...`);

    setTimeout(() => {
      logger.error("Forced shutdown after 10s");
      process.exit(1);
    }, 10_000).unref();

    server.close(async () => {
      await disconnectDb();
      logger.info("👋 Shutdown complete");
      process.exit(0);
    });
    server.closeAllConnections?.();
  };

  process.on("SIGTERM", () => shutdown("SIGTERM"));
  process.on("SIGINT", () => shutdown("SIGINT"));
};

bootstrap();
