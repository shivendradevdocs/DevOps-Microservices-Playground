// backend-api/src/utils/logger.js
import winston from "winston";
import path from "path";

const { combine, timestamp, printf, json, errors } = winston.format;

const serviceName = process.env.SERVICE_NAME || "backend-api";

const logFormat = combine(
  timestamp(),
  errors({ stack: true }), // capture stack
  json() // emit logs as JSON
);

const transports = [new winston.transports.Console({ format: logFormat })];

// Optional: write to files for local debugging (mounted volume)
if (process.env.ENABLE_FILE_LOGS === "true") {
  const logsDir = path.resolve(process.cwd(), "logs");
  transports.push(
    new winston.transports.File({
      filename: `${logsDir}/${serviceName}-error.log`,
      level: "error",
    }),
    new winston.transports.File({ filename: `${logsDir}/${serviceName}.log` })
  );
}

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || "info",
  defaultMeta: { service: serviceName, env: process.env.NODE_ENV || "dev" },
  transports,
  exitOnError: false,
});

export default logger;
