// config/db.js
const { MongoClient, ServerApiVersion } = require("mongodb");

const uri = process.env.URI; // Your MongoDB URI from .env file

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function connectToDatabase() {
  try {
    // Connect to MongoDB
    await client.connect();
    console.log("Connected to MongoDB!");
    return client.db('nest_grocery'); // Return the database instance
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
    throw err;
  }
}

module.exports = connectToDatabase;
