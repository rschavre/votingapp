
import { dbParams } from '../database/db.js';

export const getAllVotes = async (req, res) => {
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
}

// Cast Vote
export const castVote = async (req, res) => {
  const { option } = req.body;
  try {
    const existingVote = await dbParams.votesCollection.findOne({ userId: req.user.id });
    if (existingVote) return res.status(400).send("User has already voted");
    
    if(!dbParams.validVoteOptions.find((opt) => option==opt.option)){
      return res.status(400).send("Send Valid Option for Vote");
    }
    await dbParams.votesCollection.insertOne({ userId: req.user.id, option });
    res.status(201).send("Vote casted");
  } catch (err) {
    // console.log(err);
    res.status(500).send("Error casting vote");
  }
};
