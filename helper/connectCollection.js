const connectToDatabase = require("../config/db");

const getProducts = async () => {
  try {
    // Connect to the database
    const db = await connectToDatabase();
    
    // Access the 'all_products' collection
    const allProductsCollection = db.collection("all_products");
    
    // Fetch the products
    const products = await allProductsCollection.find().toArray();
    
    // Return the products
    return products;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw new Error("Unable to fetch products");
  }
};

module.exports = getProducts;
