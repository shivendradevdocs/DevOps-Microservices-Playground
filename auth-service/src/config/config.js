import dotenv from "dotenv";
dotenv.config();

const config = {
  port: process.env.PORT || 5001,
  mongoUrl: process.env.MONGO_URL || "mongodb://mongo:27017/devops",
  jwtSecret: process.env.JWT_SECRET || "devsecret",
  nodeEnv: process.env.NODE_ENV || "development",
  logLevel: process.env.LOG_LEVEL || "info",
};

export default config;
