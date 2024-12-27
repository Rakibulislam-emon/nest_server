const express = require("express");
const router = express.Router(); // Initialize the router
const moment = require("moment"); // Using moment.js to handle date comparisons (optional)
const connectCollection = require("../helper/connectCollection");

router.get("/deals", async (req, res) => {
  try {
    const { products } = await connectCollection();
    if (!products || products.length === 0) {
      return res.status(404).json({ message: "No deals found." });
    }

    const today = moment().format("YYYY-MM-DD");

    // Filter products, ensuring 'exp' is a valid date format
    const dealsOfTheDay = products.filter((product) => {
      const isValidDate = moment(product.exp, ["YYYY-MM-DD", "MM/DD/YYYY"], true).isValid();
      const normalizedExpDate = isValidDate ? moment(product.exp, ["YYYY-MM-DD", "MM/DD/YYYY"], true).format("YYYY-MM-DD") : null;

      return (
        product.discount >= 10 && // Filter products with discount >= 10%
        product.available === "In Stock" && // Ensure product is in stock
        normalizedExpDate && moment(normalizedExpDate).isAfter(today) && // Product is not expired
        product.rating >= 4 // Only products with ratings >= 4 stars
      );
    });

    if (dealsOfTheDay.length === 0) {
      return res.status(404).json({ message: "No deals found." });
    }

    // Sort deals based on discount (highest to lowest)
    const sortedDeals = dealsOfTheDay.sort((a, b) => b.price - a.price);

    // Limit the number of deals
    const result = sortedDeals.slice(0, 15);

    res.status(200).json(result);
  } catch (error) {
    console.error("Error fetching deals:", error);
    res.status(500).json({ error: "An error occurred while fetching deals." });
  }
});

module.exports = router; // Export the router