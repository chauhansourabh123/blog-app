import mongoose from "mongoose";
import { databseName } from "../constant.js";

const connectDB = async () => {
  const URI = `${process.env.MONGODB_URI}/${databseName}`;
  try {
    const connectionInstance = await mongoose.connect(URI);
    console.log("Database connected successfully to host: ", connectionInstance.connection.host);
  } catch (error) {
    console.error("Failed to connect the database:", error);
    process.exit(1);
  }
};

export default connectDB;
