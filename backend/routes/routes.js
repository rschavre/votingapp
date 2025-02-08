import { Router } from "express";
import { dbParams } from "../database/db.js";
import { getAllVotes,castVote } from "../controller/votes.js";
import { authenticateToken } from "../middleware/auth.js";

const mainrouter = Router();

// Fetch Votes
mainrouter.get("/votes",getAllVotes );
mainrouter.post("/vote", authenticateToken,castVote); 


export default mainrouter;