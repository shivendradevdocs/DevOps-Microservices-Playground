import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./config/db.js";
import { swaggerDocs } from "./swagger.js";
dotenv.config();
const PORT = process.env.PORT || 5005;
swaggerDocs(app, PORT);

async function start() {
  await connectDB().then(() => {
    app.locals.dbConnected = true;
  });
  app.listen(PORT, () => {
    console.log(`Backend API running on port ${PORT}`);
  });
}

start();

//http://localhost:5005/api/health
