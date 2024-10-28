import app from "./app.js";
import connectDB from "./src/Database/index.js";
import dotenv from "dotenv"
dotenv.config()

const startServer = async () => {
  const port = process.env.PORT || 3000;
  try {
    await connectDB();
    console.log("Database connected successfully");

    app.listen(port, () => {
      console.log("This app is running on the port of ", port);
    });
  } catch (error) {
    console.error("Error starting the server:",error.message);
    process.exit(1);
  }
};

startServer();
