// app.js
const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const productRoutes = require("./routes/productRoutes.js");
const featuredRoutes = require("./routes/featuredCategoryRoutes.js");
const popularProducts = require("./routes/popularProductRoutes.js");
// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Middleware to parse JSON bodies in requests

// Use product-related routes
app.use("/api", productRoutes);
app.use("/api", featuredRoutes);
app.use("/api", popularProducts);

// Default route
app.get("/", (req, res) => {
  res.json({ message: "WELCOME TO THE SERVER" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
