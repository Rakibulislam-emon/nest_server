
const connectToDatabase = require("../config/db.js");

const connectCollection = async () => {
  try {
    const db = await connectToDatabase();
    const collection = db.collection("all_products"); // Fixed collection
    const userCollection = db.collection("user"); // Fixed collection

    // Fetch all products directly
    const products = await collection.find().toArray();

    return { collection, products , userCollection }; // Return both the collection and the products
  } catch (error) {
    console.error("Error connecting to the database or fetching products:", error);
    throw new Error("Unable to connect to the database or fetch products");
  }
};

module.exports = connectCollection;

