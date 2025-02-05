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


// // Middleware to authenticate requests using JWT
// const authenticateToken = (req, res, next) => {
//   // console.log(req.headers);
//   const token = req.headers.authorization?.split(" ")[1];
//   if (!token) return res.status(401).send("Access Denied");

//   jwt.verify(token, JWT_SECRET, (err, user) => {
//     if (err) return res.status(403).send("Invalid Token");
//     req.user = user;
//     next();
//   });
// };

// // Routes

// // Register User
// app.post("/api/register", async (req, res) => {
//   const { email, password } = req.body;
//   const hashedPassword = await bcrypt.hash(password, 10);

//   try {
//     const findExisting = await usersCollection.findOne({ email });
//     if (findExisting) return res.status(400).send("Existing User. Try different email!")

//     const user = await usersCollection.insertOne({
//       email,
//       password: hashedPassword,
//     });
//     res.status(201).send("User registered");

//   } catch (err) {
//     res.status(400).send("Error registering user");
//   }
// });

// // Login User
// app.post("/api/login", async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await usersCollection.findOne({ email });
//     if (!user) return res.status(404).send("User not found");

//     const validPassword = await bcrypt.compare(password, user.password);
//     if (!validPassword) return res.status(400).send("Invalid password");

//     // Create a login token for the user
//     // Sign the payload with MongoDb _id field, used to retrieve user when auth header is set to "token <jwt>"
//     const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });
//     res.json({ token });
//   } catch (err) {
//     res.status(500).send("Error logging in");
//   }
// });

// // Cast Vote
// app.post("/api/vote", authenticateToken, async (req, res) => {
//   const { option } = req.body;
//   try {
//     const existingVote = await votesCollection.findOne({ userId: req.user.id });
//     if (existingVote) return res.status(400).send("User has already voted");
    
//     if(!validVoteOptions.find((opt) => option==opt.option)){
//       return res.status(400).send("Send Valid Option for Vote");
//     }
//     await votesCollection.insertOne({ userId: req.user.id, option });
//     res.status(201).send("Vote casted");
//   } catch (err) {
//     res.status(500).send("Error casting vote");
//   }
// });



