const express = require("express");
const app = express();
const cors = require("cors");
const stripe = require("stripe")("sk_test_51OeeiiDkuocCJB4kiLE2RyHhyPTg6eswmuoRNQNvf8RgQ1wNal5N6aDks8PDZbmic4kx7bByJIMn1uXn66YoENhA00EABYkf6I");

app.use(cors());
app.use(express.json());



// Corrected path
app.get("/v1/customers/:id/cards", async (req, res) => {
    const customerId = req.params.id;
    try {
        // Assuming you're using the Payment Methods API
        const paymentMethods = await stripe.paymentMethods.list({
            customer: customerId,
            type: 'card',
        });

        const cardList = paymentMethods.data.map(card => ({
            cardNumber: card.card.last4,
            expirationDate: `${card.card.exp_month}/${card.card.exp_year}`,
        }));

        res.json(cardList);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch cards" });
    }
});


app.post("/v1/customers/:id/sources", async (req, res) => {
    const customerId = req.params.id;

    try {
        const { paymentMethod } = req.body;

        // Attach the payment method to the existing customer
        await stripe.paymentMethods.attach(paymentMethod, {
            customer: customerId,
        });

        // Fetch the updated list of payment methods
        const paymentMethods = await stripe.paymentMethods.list({
            customer: customerId,
            type: 'card',
        });

        const cardList = paymentMethods.data.map(card => ({
            cardNumber: card.card.last4,
            expirationDate: `${card.card.exp_month}/${card.card.exp_year}`,
        }));

        res.json(cardList); // Respond with the updated list of cards
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to save card" });
    }
});



app.listen(3001, () => {
    console.log("Server is running on port 3001");
});
