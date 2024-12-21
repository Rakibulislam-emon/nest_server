const express = require("express");
const router = express.Router(); // Initialize the router
const connectCollection = require("../helper/connectCollection");
const moment = require("moment"); // Using moment.js to handle date comparisons (optional)

router.get("/deals", async (req, res) => {
  try {
    const products = await connectCollection();
    if (!products || products.length === 0) {
      return res.status(404).json({ message: "No deals found." });
    }
    const today = moment().format("YYYY-MM-DD");
    const dealsOfTheDay = products?.filter(
      (product) =>
        product.discount >= 10 && // Filter products with discount >= 10%
        product.available === "In Stock" && // Ensure product is in stock
        // product.special === "Trending Product" && // Only trending products
        moment(product.exp).isAfter(today) && // Product is not expired
        product.rating >= 4 // Only products with ratings >= 4 stars
    );
    if (dealsOfTheDay.length === 0) {
      return res.status(404).json({ message: "No deals found." });
    }
    const sort = dealsOfTheDay.sort((a, b) => {
      // Sort deals based on their discount (highest to lowest)
      return b.discount - a.discount;
    });
    // limit the number of deals
    const result = sort.slice(0, 15);

    res.status(200).json(result);
  } catch (error) {
    console.error("Error fetching deals:", error);
    res.status(500).json({ error: "An error occurred while fetching deals." });
  }
});

module.exports = router; // Export the router
