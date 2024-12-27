const express = require("express");
const router = express.Router();
const connectCollection = require("../helper/connectCollection");

router.get("/products", async (req, res) => {
  try {
    const { products } = await connectCollection();

    // Get filter, sorting, and pagination parameters from the request query
    const {
      category,
      minPrice,
      maxPrice,
      rating,
      availability,
      minDiscount,
      minDate,
      sortField,
      sortOrder,
      page = 1,
      limit = 10,
      searchQuery,
    } = req.query;

   
    // Decode and normalize category and availability
    let decodedCategory = category
      ? decodeURIComponent(category).trim().toLowerCase()
      : null;
    let decodedAvailability = availability
      ? decodeURIComponent(availability).trim().toLowerCase()
      : null;

    // Convert minDiscount from string to number if it exists
    const minDiscountNum = minDiscount ? parseFloat(minDiscount) : null;

    // Filter products based on the parameters
    let filteredProducts = products.filter((product) => {
      // category product from shop page carousel

      let productCategory = product.category.trim().toLowerCase();
      let productAvailability = product.available.trim().toLowerCase();
      // Search functionality: check if searchQuery matches product name or description
      const matchesSearchQuery =
        searchQuery &&
        (product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description
            .toLowerCase()
            .includes(searchQuery.toLowerCase()));

      if (decodedCategory && productCategory !== decodedCategory) return false;
      if (minPrice && product.price < minPrice) return false;
      if (maxPrice && product.price > maxPrice) return false;
      if (rating && product.rating < parseFloat(rating)) return false;
      if (decodedAvailability && productAvailability !== decodedAvailability)
        return false;
      if (minDiscountNum && product.discount < minDiscountNum) return false;
      if (minDate && new Date(product.exp) < new Date(minDate)) return false;
      if (!product.image) return false;
      // If searchQuery is provided, ensure product matches the search query
      if (searchQuery && !matchesSearchQuery) return false;

      return true;
    });

    // Apply sorting
    if (sortField) {
      const order = sortOrder === "desc" ? -1 : 1;
      filteredProducts = filteredProducts.sort((a, b) => {
        if (a[sortField] < b[sortField]) return -1 * order;
        if (a[sortField] > b[sortField]) return 1 * order;
        return 0;
      });
    }

    // Apply pagination
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const paginatedProducts = filteredProducts.slice(startIndex, endIndex);
    // console.log(filteredProducts, "from 73");
    res.json({
      totalProducts: filteredProducts.length,
      currentPage: page,
      totalPages: Math.ceil(filteredProducts.length / limit),
      products: paginatedProducts,
    });
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).json({ message: "Server error while fetching products." });
  }
});

module.exports = router;
