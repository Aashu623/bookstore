import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || "your-mongodb-connection-string";

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable.");
}

async function connectToDatabase() {
  try {
    const connection = await mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
    });
    console.log("Successfully connected to MongoDB.");
    return connection;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    throw error;
  }
}

export default connectToDatabase;
