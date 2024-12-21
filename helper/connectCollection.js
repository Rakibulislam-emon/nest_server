// const connectToDatabase = require("../config/db");

// const connectToDatabase = require("../config/db.js");
// const getProducts = async (req, res) => {
//   try {
//     const db = await connectToDatabase();
//     const allProductsCollection = db.collection("all_products");
//     const products = await allProductsCollection.find().toArray();
//     if (!products || products.length === 0) {
//       return res.status(404).json({ message: "No deals found." });
//     }
//     res.json(products);
//   } catch (error) {
//     console.error("Error fetching products:", error);
//     res.status(500).json({ error: error.message });
//   }
// };

// module.exports = getProducts;


const connectToDatabase = require("../config/db.js");

const connectCollection = async () => {
  try {
    const db = await connectToDatabase();
    const collection = db.collection("all_products"); // Fixed collection

    // Fetch all products directly
    const products = await collection.find().toArray();

    return { collection, products }; // Return both the collection and the products
  } catch (error) {
    console.error("Error connecting to the database or fetching products:", error);
    throw new Error("Unable to connect to the database or fetch products");
  }
};

module.exports = connectCollection;

