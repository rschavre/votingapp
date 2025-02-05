import { MongoClient } from "mongodb";

export const dbParams = {
    db:null,
    usersCollection:null,
    votesCollection:null,
    validVoteOptionsCollection:null,
    validVoteOptions : [],
}


// Connect to MongoDB
async function SMongoConnect() {
  try {
    const client = await MongoClient.connect(process.env.DB_MONGO_URI, {})
    dbParams.db = client.db(process.env.DB_NAME);
    dbParams.usersCollection = dbParams.db.collection("users");
    dbParams.votesCollection = dbParams.db.collection("votes");
    dbParams.validVoteOptionsCollection = dbParams.db.collection("validVoteOptions");
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error(err)
  }
}


async function SVoteOptions() {
  try {
    const validVoteOptionsl = await dbParams.validVoteOptionsCollection.find({},{ projection: { _id: 0 }}).toArray();
    dbParams.validVoteOptions = validVoteOptionsl;
    console.log(dbParams.validVoteOptions);
    if (!dbParams.validVoteOptions.length) {
      console.log("Empty Vote Options, Create Vote Options in Database for proper voting");
    }
  } catch (err) {
    console.error(err);
  }
}
// Function to run both functions in order
export async function SMongoInit() {
  await SMongoConnect();
  await SVoteOptions();
}

// MongoClient.connect(DB_MONGO_URI, { useNewUrlParser: true,useUnifiedTopology: true }) // use new server  
//   .then((client) => {
//     db = client.db(DB_NAME);
//     usersCollection = db.collection("users");
//     votesCollection = db.collection("votes");
//     console.log("Connected to MongoDB");
//   })
//   .catch((err) => console.error(err));

