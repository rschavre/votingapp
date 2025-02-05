// can be used with --clear arg for clearing users

const args = process.argv.slice(2);
let clearUsers = false;
if (args.includes('--clear')) {
    console.log("Clear Users flag is enabled!");
    clearUsers = true;
} else {
    console.log("Clear Users flag is not enabled.");
}


const fs = require('fs');
let lines = [];
try {
    const data = fs.readFileSync('./conf_validvotes.txt', 'utf8');
    // Split the content by newlines and store it in an array
    lines = data.split(/\r?\n/);
    console.log("Vote options:", lines);
    lines = lines.map((item) => { return { option: item } })
} catch (err) {
    console.error("Error reading the file:", err);
}

const dotenv = require("dotenv");
dotenv.config({path:"./config.env"});
const { MongoClient } = require("mongodb");
const { exit } = require('process');
const DB_MONGO_URI = process.env.DB_MONGO_URI //|| "mongodb://127.0.0.1:27017";
const DB_NAME = process.env.DB_NAME;

// Connect to MongoDB
async function SMongoConnectAndFillOptions() {
    try {
        const client = await MongoClient.connect(DB_MONGO_URI, {})
        console.log("Connected to MongoDB");
        console.log("Filling DB with options:", lines);

        let db = client.db(DB_NAME);

        let validVoteOptionsCollection = db.collection("validVoteOptions");
        await validVoteOptionsCollection.deleteMany();
        await validVoteOptionsCollection.insertMany(lines);

        console.log("Clearing existing votes");
        await db.collection("votes").deleteMany();

        if (clearUsers) {
            console.log("Clear existing USERS?");
            const prompt = require('prompt-sync')();
            const sure = prompt('Are You SURE? [Y/N][y/n] ');
            if (sure === "y" || sure === "Y") {
                console.log("Clearing existing USERS");
                await db.collection("users").deleteMany();
            } else{
                console.log("NOT Clearing existing USERS");
            }
        }
    } catch (err) {
        console.error(err)
    }
    exit(0);
}

SMongoConnectAndFillOptions();