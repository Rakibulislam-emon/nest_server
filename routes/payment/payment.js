const express = require("express");
const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_KEY); // Replace with your Stripe secret key

// Stripe payment routes
router.post("/process", async function (req, res) {
  const { price } = req.body;
  const amount = parseInt(price * 100);

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      payment_method_types: ["card"],
    });
    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error("Error creating payment intent:", error.message);
    res.status(500).json({
      success: false,
      message: "Payment intent creation failed",
      error: error.message,
    });
  }
});

module.exports = router;
