import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URL || "mongodb://localhost:27017/devops";
    await mongoose.connect(uri);
    console.log("Auth Service: MongoDB connected");
  } catch (error) {
    console.error("MongoDB error:", error);
  }
};

export default connectDB;
