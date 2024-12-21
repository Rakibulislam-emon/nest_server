// // routes/productRoutes.js
// const express = require("express");
// const router = express.Router();

// const connectToDatabase = require("../config/db");

// router.get("/products", async (req, res) => {
//   try {
//     const db = await connectToDatabase();
//     const allProductsCollection = db.collection("all_products");
//     const products = await allProductsCollection.find().toArray();

//     if (products.length > 0) {
//       res.json(products);
//     } else {
//       res.status(404).json({ message: "No products found." });
//     }
//   } catch (err) {
//     console.error("Error fetching products:", err);
//     res
//       .status(500)
//       .json({ message: "Server Error: Unable to fetch products." });
//   }
// });

// module.exports = router;



const express = require("express");
const router = express.Router();
// const connectToDatabase = require("../config/db");
const connectCollection = require("../helper/connectCollection");

router.get("/products", async (req, res) => {
  try {
    const {products} = await connectCollection()

    // Filter out products with invalid image URLs
    const validProducts = products.filter(product => product.image && product.image !== "");

    // Send the valid products to the response
    if (validProducts.length > 0) {
      res.json(validProducts);
    } else {
      res.status(404).json({ message: "No valid products found." });
    }
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).json({ message: "Server error while fetching products." });
  }
});

module.exports = router;
