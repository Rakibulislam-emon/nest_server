const express = require("express");
const connectCollection = require("../../helper/connectCollection");
const router = express.Router();

// Registration route
router.post("/register", async (req, res) => {
  const { username, userType, email } = req.body;

  if (!username || !email) {
    return res.status(400).send({ message: "Username and email are required" });
  }

  try {
    const { userCollection } = await connectCollection();

    // Add additional user details to your database
    const user = {
      username,
      userType,
      email,
      createdAt: new Date(),
    };

    const result = await userCollection.insertOne(user);

    if (result.acknowledged === true) {
      res.status(201).send({ message: "User registered successfully" });
    } else {
      res.status(500).send({ message: "Failed to register user" });
    }
  } catch (error) {
    res.status(500).send({ message: "Error registering user", error });
  }
});

module.exports = router;
