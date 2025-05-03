const express = require("express");
const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_KEY); // Replace with your Stripe secret key

// Create a payment intent
router.post("/process", async function (req, res) {
  try {
    const { price, customer_email } = req.body;
    
    // Convert price to cents (Stripe uses smallest currency unit)
    const amount = Math.round(price * 100);
    
    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      payment_method_types: ["card"],
      // Include customer email if provided
      ...(customer_email && { receipt_email: customer_email }),
      // Add metadata for your records
      metadata: {
        integration_check: 'accept_a_payment',
        order_source: 'nest_ecommerce'
      }
    });

    // Return client secret to the frontend
    res.status(200).json({
      clientSecret: paymentIntent.client_secret,
      amount: amount / 100
    });
  } catch (error) {
    console.error("Error creating payment intent:", error);
    res.status(500).json({
      success: false,
      message: "Payment intent creation failed",
      error: error.message,
    });
  }
});


module.exports = router;
