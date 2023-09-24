import mongoose from "mongoose";
import "dotenv/config";

// Connect to the specified database
const connectToDatabase = async (databaseName) => {
  try {
    // Use mongoose to connect to MongoDB
    // connect to local database "mongodb://127.0.0.1:27017/"
    await mongoose.connect(process.env.URL);

    // Log successful connection to the database
    console.log("Connected to MongoDB: " + databaseName);
  } catch (error) {
    // Handle error by logging an error message
    console.error(
      `Error in connecting to Database: ${databaseName}`,
      error.message
    );
  }
};

// Disconnect from the MongoDB
const disconnectFromDatabase = async () => {
  try {
    // Use mongoose to disconnect from the database
    await mongoose.disconnect();

    // Log successful disconnection from the database
    console.log(`Disconnected from MongoDB`);
  } catch (error) {
    // Handle error by logging an error message
    console.log(`Error in disconnecting from MongoDB: `, error.message);
  }
};

// Export the functions for use in other modules
export { connectToDatabase, disconnectFromDatabase };
