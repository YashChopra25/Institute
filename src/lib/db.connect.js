
import mongoose from "mongoose";

let isConnected = false; // To track the connection status

export const connectToDB = async () => {
  if (isConnected) {
    // Prevents multiple reconnections
    return;
  }

  try {
    await mongoose.connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = true;
    console.log("Database connected successfully.");
  } catch (error) {
    console.error("Database connection error:", error);
  }
};
