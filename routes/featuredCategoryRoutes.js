// routes/productRoutes.js
const express = require("express");
const connectToDatabase = require("../config/db");
const router = express.Router();

// GET /api/products/featured-categories
// Fetch featured categories with products
router.get("/products/featured-categories", async (req, res) => {
  try {
    const db = await connectToDatabase();
    const products = await db.collection("all_products").find().toArray();

    // Extract categories and remove duplicates using Set
    const categories = [
      ...new Set(products.map((product) => product.category)),
    ];

    // Create an array to hold results by category
    const categoryResults = categories.map((category) => {
      const categoryProducts = products
        .filter((product) => product.category === category)
        .slice(0, 1); // Limit to 1 product per category
      return {
        category,
        products: categoryProducts,
      };
    });

    res.status(200).json(categoryResults);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
