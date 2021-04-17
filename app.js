const express = require("express");
const app = express();
const cors = require('cors')
// This is your real test secret API key.
const stripe = require("stripe")("sk_test_51IJaeQGdR5gcqr0pr7a1GUbMlK6QOp2i51Tt7McLDwAIuAcqsH5lPdif7aUECz6uHLfI9OkYaTVXPGYqFavflVP8007SMEVLCb");
app.use(express.static("."));
app.use(express.json());
const calculateOrderAmount = items => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  return 1400;
};
app.get("/stripe", cors(), async (req, res) => {
  // const { items } = req.body;
  console.log(req.query.amount)
  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.checkout.sessions.create(
  {
    success_url: 'http://localhost:4200/success',
    cancel_url: 'http://localhost:4200/cancel',
    payment_method_types: ['card'],
    line_items: [
      {
        name: 'cards',
        description: 'Comfortable cotton t-shirt',
        amount: req.query.amount,
        currency: 'inr',
        quantity: 2,
      },
    ],
  },
  (err, session) => {
    // asynchronously called
    res.send(JSON.stringify(session));
  },
);
});

app.listen(process.env.PORT || 4242, () => console.log('Node server listening on port 4242!'));