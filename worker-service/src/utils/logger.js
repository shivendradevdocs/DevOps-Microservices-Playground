import winston from "winston";
import path from "path";

const { combine, timestamp, errors, json } = winston.format;

const serviceName = process.env.SERVICE_NAME || "worker-service";

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || "info",
  format: combine(timestamp(), errors({ stack: true }), json()),
  defaultMeta: { service: serviceName },
  transports: [new winston.transports.Console()],
});

// Optional file logging
if (process.env.ENABLE_FILE_LOGS === "true") {
  const logsDir = path.resolve(process.cwd(), "logs");

  logger.add(
    new winston.transports.File({
      filename: `${logsDir}/${serviceName}.log`,
    })
  );

  logger.add(
    new winston.transports.File({
      filename: `${logsDir}/${serviceName}-error.log`,
      level: "error",
    })
  );
}

export default logger;
