// backend-api/src/middleware/loggerMiddleware.js
import morgan from "morgan";
import logger from "../utils/logger.js";

const stream = {
  write: (message) => {
    // Morgan emits trailing newline; strip it
    try {
      logger.info(JSON.parse(message)); // if colon-delimited JSON, this may fail
    } catch (e) {
      logger.info(message.trim());
    }
  },
};

// Use combined format or custom token
export const httpLogger = morgan(
  ':remote-addr - :remote-user ":method :url HTTP/:http-version" :status :res[content-length] - :response-time ms',
  { stream }
);
