const express = require("express");
const app = express();
const cors = require("cors");
const stripe = require("stripe")("sk_test_51OeeiiDkuocCJB4kiLE2RyHhyPTg6eswmuoRNQNvf8RgQ1wNal5N6aDks8PDZbmic4kx7bByJIMn1uXn66YoENhA00EABYkf6I");

app.use(cors());
app.use(express.json());




app.get("/v1/customers/:id/cards", async (req, res) => {
    const customerId = req.params.id;
    try {
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
        await stripe.paymentMethods.attach(paymentMethod, {
            customer: customerId,
        });

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
        res.status(500).json({ error: "Failed to save card" });
    }
});


app.post("/v1/customers/:customerId/cards/:cardId", async (req, res) => {
    const { customerId, cardId } = req.params;
    const { expirationMonth, expirationYear, cardholderName } = req.body;

    try {
        await stripe.paymentMethods.update(cardId, {
            card: {
                exp_month: expirationMonth,
                exp_year: expirationYear,
            },
            billing_details: {
                name: cardholderName,
            },
        });

        const paymentMethods = await stripe.paymentMethods.list({
            customer: customerId,
            type: 'card',
        });

        const cardList = paymentMethods.data.map(card => ({
            cardNumber: card.card.last4,
            expirationDate: `${card.card.exp_month}/${card.card.exp_year}`,
            cardholderName: card.billing_details.name,
            cardId: card.id,
        }));

        res.json(cardList);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to update card" });
    }
});


app.listen(3001, () => {
    console.log("Server is running on port 3001");
});
