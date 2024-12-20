// routes/productRoutes.js
const express = require("express");
const router = express.Router();

const connectToDatabase = require("../config/db");

router.get("/products", async (req, res) => {
  try {
    const db = await connectToDatabase();
    const allProductsCollection = db.collection("all_products");
    const products = await allProductsCollection.find().toArray();

    if (products.length > 0) {
      res.json(products);
    } else {
      res.status(404).json({ message: "No products found." });
    }
  } catch (err) {
    console.error("Error fetching products:", err);
    res
      .status(500)
      .json({ message: "Server Error: Unable to fetch products." });
  }
});

module.exports = router;
