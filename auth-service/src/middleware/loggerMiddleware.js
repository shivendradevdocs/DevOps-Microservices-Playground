import morgan from "morgan";
import logger from "../utils/logger.js";

export const httpLogger = morgan(function (tokens, req, res) {
  const log = {
    method: tokens.method(req, res),
    url: tokens.url(req, res),
    status: Number(tokens.status(req, res)),
    responseTime: Number(tokens["response-time"](req, res)),
    contentLength: tokens.res(req, res, "content-length") || 0,
    remoteAddr: tokens["remote-addr"](req, res),
  };

  logger.info(log);
  return null;
});
