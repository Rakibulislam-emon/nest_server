// const express = require("express");
// const router = express.Router();
// const stripe = require("stripe")(process.env.STRIPE_KEY); // Replace with your Stripe secret key

// // Process Payment Route
// router.post("/process", async (req, res) => {
//   const { paymentMethodId, amount, shippingInfo, price } = req.body;

//   console.log(req.body);

//   // Validate request body
//   if (!paymentMethodId || !amount || !shippingInfo) {
//     return res
//       .status(400)
//       .json({ message: "Invalid payment or shipping details" });
//   }

//   try {
//     // Create a PaymentIntent with the provided payment method
//     const paymentIntent = await stripe.paymentIntents.create({
//       amount: amount, // Amount in cents
//       currency: "usd", // Adjust to your currency
//       payment_method: ['card'],
//       confirmation_method: "manual",
//     //   confirm: true, // Confirm the payment immediately
//     //   automatic_payment_methods: {
//     //     enabled: true,
//     //     allow_redirects: "never",
//     //   },
//       shipping: {
//         name: shippingInfo.name,
//         address: {
//           line1: shippingInfo.address,
//           city: shippingInfo.city,
//           state: shippingInfo.state,
//           postal_code: shippingInfo.postalCode,
//         },
//       },
//       receipt_email: shippingInfo.email,
//     });

//     // Respond with success
//     res.status(200).json({
//       success: true,
//       message: "Payment processed successfully",
//         clientSecret: paymentIntent.client_secret,
//     });
//   } catch (error) {
//     // Handle errors from Stripe
//     console.error("Error processing payment:", error.message);
//     res.status(500).json({
//       success: false,
//       message: "Payment processing failed",
//       error: error.message,
//     });
//   }
// });

// module.exports = router;

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
