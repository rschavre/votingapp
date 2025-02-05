import { Router } from "express";
import { dbParams } from "../database/db.js";
const mainrouter = Router();


// Fetch Votes
mainrouter.get("/votes", async (req, res) => {
  const allOptions = dbParams.validVoteOptions.reduce((acc, item) => {
    acc[item.option] = 0;  // Set the value of each key to 0
    return acc;
  }, {});  // Initialize the accumulator as an empty object
  
  try {
    const votes = await dbParams.votesCollection.find().toArray();
    const voteCounts = votes.reduce((acc, vote) => {
      acc[vote.option] = (acc[vote.option] || 0) + 1;
      return acc;
    }, allOptions);

    res.json(voteCounts);
  } catch (err) {
    res.status(500).send("Error fetching votes");
  }
});


export default mainrouter;