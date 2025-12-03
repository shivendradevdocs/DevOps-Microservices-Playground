// backend-api/src/middleware/httpJsonLogger.js
import morgan from "morgan";
import logger from "../utils/logger.js";

morgan.token("req-body", (req) => JSON.stringify(req.body || {}));
morgan.token("res-body", (req, res) => JSON.stringify(res.locals.body || {})); // if you set it

export const httpJsonLogger = morgan(function (tokens, req, res) {
  const logObject = {
    remoteAddr: tokens["remote-addr"](req, res),
    method: tokens.method(req, res),
    url: tokens.url(req, res),
    status: Number(tokens.status(req, res)),
    responseTime: Number(tokens["response-time"](req, res)),
    contentLength: tokens.res(req, res, "content-length"),
    reqBody: req.body || {},
  };
  logger.info(logObject);
  return ""; // already logged via winston
});
