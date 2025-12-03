import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./config/db.js";
import { swaggerDocs } from "./swagger.js";
const PORT = process.env.PORT || 5000;
swaggerDocs(app, PORT);
dotenv.config();

async function start() {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Backend API running on port ${PORT}`);
  });
}

start();
