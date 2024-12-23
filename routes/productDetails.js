const express = require("express");
const router = express.Router();
// const connectToDatabase = require("../config/db");
const connectCollection = require("../helper/connectCollection");
const { ObjectId } = require("mongodb");

router.get("/product-details/:id", async (req, res) => {
  try {
    const { collection } = await connectCollection();
    const id = req.params.id;
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID format" }); // Handle invalid ID format
    }
    const objectId = new ObjectId(id);
    const product = await collection.findOne({ _id: objectId });

    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }

    res.json(product); // Send the product as a response
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).json({ message: "Server error while fetching products." });
  }
});

module.exports = router;
