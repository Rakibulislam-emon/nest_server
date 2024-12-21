
// const express = require("express");
// const router = express.Router();
// const connectToDatabase = require("../config/db"); // Your database connection function

// // GET Route for Fetching Popular Products
// router.get("/popular-products", async (req, res) => {
//   try {
//     const db = await connectToDatabase(); // Establish connection to the database
//     const allProductsCollection = db.collection("all_products");

//     // Fetch all products
//     const products = await allProductsCollection.find().toArray();

//     // Filter products with a rating above 4.7
//     const popularProducts = products.filter((product) => product.rating > 4.7);

//     if (popularProducts.length > 0) {
//       res.status(200).json(popularProducts); // Send popular products as JSON response
//     } else {
//       res.status(404).json({ message: "No popular products found." });
//     }
//   } catch (err) {
//     console.error("Error fetching popular products:", err);
//     res.status(500).json({
//       message: "Server Error: Unable to fetch popular products.",
//     });
//   }
// });

// module.exports = router;



const express = require("express");
const router = express.Router();
// const connectToDatabase = require("../config/db"); // Your database connection function
const connectCollection = require('../helper/connectCollection')
// GET Route for Fetching Popular Products
router.get("/popular-products", async (req, res) => {
  try {
   
    const {products} = await connectCollection()

    // Filter products with a rating above 4.7
    const popularProducts = products.filter((product) => product.rating > 4.7);

    if (popularProducts.length > 0) {
      res.status(200).json(popularProducts); // Send popular products as JSON response
    } else {
      res.status(404).json({ message: "No popular products found." });
    }
  } catch (err) {
    console.error("Error fetching popular products:", err);
    res.status(500).json({
      message: "Server Error: Unable to fetch popular products.",
    });
  }
});

module.exports = router;
