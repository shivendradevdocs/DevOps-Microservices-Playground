import logger from "../utils/logger.js";

export default function errorHandler(err, req, res, next) {
  logger.error({
    msg: "Unhandled error",
    error: err.message,
    stack: err.stack,
  });

  return res.status(err.statusCode || 500).json({
    status: "error",
    message: err.message || "Internal Server Error",
  });
}
