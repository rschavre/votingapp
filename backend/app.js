import cookieParser from "cookie-parser"
import cors from "cors"
import { config } from "dotenv"
import express from "express"
import bodyParser from "body-parser"
import { SMongoInit } from "./database/db.js"
import mainrouter from "./routes/routes.js"  

/* Phase 0 Import env*/
config({ path: "./config.env" });

/* Phase 1  Creation of app*/
export const app = express();
app.use(cors(
    {
        origin: [process.env.FRONTEND_URL || "http://localhost:6000"],
        methods: ["GET","POST"],
        credentials: true,
    }
)); // Middleware
app.use(cookieParser())
app.use(bodyParser.json()); // Middleware

app.use("/api",mainrouter);

// await SMongoInit(); // Initialise our database and it's connection
SMongoInit(); // Initialise our database and it's connection

// console.log(dbParams.validVoteOptions)