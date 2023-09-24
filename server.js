import express from "express";
import bodyParser from "body-parser";
import {
  connectToDatabase,
  disconnectFromDatabase,
} from "./connect/serverConnect.js";
import cors from "cors";
import routes from "./routes/routes.js";

const app = express();
const port = process.env.PORT || 4000;
const databaseName = "ReactNotes";

// Middlewares

// Parse URL-encoded data from the request body
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the "public" directory
app.use(express.static("public"));

// Log request path and method for each incoming request
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// Enable CORS to allow cross-origin requests
app.use(cors());

// Parse JSON data from the request body
app.use(express.json());

// Connecting to the database and then opening our server

// Connect to the database and start listening on the specified port
connectToDatabase(databaseName).then(() => {
  app.listen(port, () => {
    console.log(`Listening to port: ${port}`);
  });
});

// Routes

// Use the defined routes from the routes.js file
app.use(routes);

// Handle SIGINT event to gracefully disconnect from the database before exiting
process.on("SIGINT", async () => {
  try {
    await disconnectFromDatabase();
    process.exit(0);
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
});
