
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
