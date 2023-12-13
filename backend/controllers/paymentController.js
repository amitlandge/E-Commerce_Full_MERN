// const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY, {
//   apiVersion: "2022-08-01",
// });
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const payment = async (req, res) => {
  
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: req.body.amount,
      currency: "INR",
      payment_method_types: ["card"],
    });
   
    res.status(200).json({
      success: true,
      secret_Key: paymentIntent.client_secret,
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
    console.log(error.message);
  }
};

const sendSecreteKey = async (req, res) => {
  res.status(200).json({
    public_key: process.env.STRIPE_PUBLIC_KEY,
    secret_key: process.env.STRIPE_SECRET_KEY,
  });
};
exports.payment = payment;
exports.sendSecreteKey = sendSecreteKey;
