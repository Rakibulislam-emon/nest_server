// app.js
const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const productRoutes = require("./routes/productRoutes.js");
const featuredRoutes = require("./routes/featuredCategoryRoutes.js");
const popularProducts = require("./routes/popularProductRoutes.js");
const deals = require("./routes/dealsRoute.js");
const productDetail = require('./routes/productDetails.js')
// Middleware
// Use CORS to allow requests from your frontend domain
app.use(
  cors({
    origin: ["https://nest-client-henna.vercel.app", "http://localhost:5173"], // Allow requests only from this frontend
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"], // Allowed methods
    credentials: true, // If you're using cookies or credentials
  })
);
app.use(express.json()); // Middleware to parse JSON bodies in requests

// Use product-related routes
app.use("/api", productRoutes);
app.use("/api", featuredRoutes);
app.use("/api", popularProducts);
app.use("/api", deals);
app.use("/api", productDetail);

// Default route
app.get("/", (req, res) => {
  res.json({ message: "WELCOME TO THE SERVER" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT} WELCOME`);
});
