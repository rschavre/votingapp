import { app } from "./app.js";

app.listen(process.env.APP_PORT, () => {
  console.log(`Server running on http://localhost:${process.env.APP_PORT}`);
});

// // old syntax ,can also use import * as express from express
// const express = require("express"); // For server and routes
// const { MongoClient } = require("mongodb"); // For Db
// const bcrypt = require("bcrypt"); // For Hashing
// const jwt = require("jsonwebtoken"); // Webtokens
// const cors = require("cors");
// const bodyParser = require("body-parser"); // For middleware

// /* Phase 1  Creation of app*/
// const app = express();
// app.use(cors()); // Middleware
// app.use(bodyParser.json()); // Middleware

// /* Phase 2 Db initialization*/
// const APP_PORT = 5000;
// const DB_MONGO_URI = "mongodb://127.0.0.1:27017"; // copied string from connection url
// const DB_NAME = "voting";
// const JWT_SECRET = "secret_key"




// // Routes






