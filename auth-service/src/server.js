import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./config/db.js";
import { swaggerDocs } from "./swagger.js";
const PORT = process.env.PORT || 5001;
// after app.listen:
swaggerDocs(app, PORT);

dotenv.config();

async function start() {
  await connectDB()
    .then(() => {
      app.locals.dbConnected = true;
      console.log("Mongo connected for Auth Service");
    })
    .catch((err) => {
      logger.error({ msg: "Mongo connection failed", error: err.message });
    });
  app.listen(PORT, () => {
    console.log(`Auth Service running on port ${PORT}`);
  });
}

start();
