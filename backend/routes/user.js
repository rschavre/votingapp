import { Router } from "express";
import { dbParams } from "../database/db.js";
import { registerUser ,loginUser} from "../controller/user.js";

const userrouter = Router();

// Fetch Votes
userrouter.post("/login", loginUser);
userrouter.post("/register", registerUser);

export default userrouter;