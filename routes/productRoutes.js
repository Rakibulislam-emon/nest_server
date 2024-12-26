const express = require("express");
const router = express.Router();

const connectCollection = require("../helper/connectCollection");

router.get("/products", async (req, res) => {
  try {
    const { products } = await connectCollection();

    // Get filter parameters from the request query
    const {
      category,
      minPrice,
      maxPrice,
      rating,
      availability,
      minDiscount,
      minDate,
    } = req.query;

    // Decode and normalize category
    let decodedCategory = category
      ? decodeURIComponent(category).trim().toLowerCase()
      : null;
    // Decode and normalize availability
    let decodedAvailability = availability
      ? decodeURIComponent(availability).trim().toLowerCase()
      : null;

    // Convert minDiscount from string to number if it exists
    const minDiscountNum = minDiscount ? parseFloat(minDiscount) : null;

    // Filter products based on the parameters
    const filteredProducts = products.filter((product) => {
      // Normalize the product category and availability
      let productCategory = product.category.trim().toLowerCase();
      let productAvailability = product.available.trim().toLowerCase();

      // Apply filters
      if (decodedCategory && productCategory !== decodedCategory) return false;
      if (minPrice && product.price < minPrice) return false;
      if (maxPrice && product.price > maxPrice) return false;
      if (rating && product.rating < parseFloat(rating)) return false;
      if (decodedAvailability && productAvailability !== decodedAvailability)
        return false;

      // Check if the product's discount is greater than or equal to the minDiscount
      if (minDiscountNum && product.discount < minDiscountNum) return false;

      if (minDate && new Date(product.exp) < new Date(minDate)) return false;
      if (!product.image) return false; // Only include products with images

      return true; // Keep the product if all conditions are satisfied
    });

    // If there are matching products, send them in the response
    if (filteredProducts.length > 0) {
      res.json(filteredProducts);
    } else {
      // If no products match the filters, send a 200 with an empty array or a 400 error
      res.status(200).json({ message: "No products found matching the filters.", products: [] });
    }
  } catch (err) {
    // Handle any errors that occur during fetching
    console.error("Error fetching products:", err);
    res.status(500).json({ message: "Server error while fetching products." });
  }
});

module.exports = router;
