import React, { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import "./CardRegistrationForm.css";

const CardRegistrationForm = ({ onSave, customerId }) => {
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);

    const stripe = useStripe();
    const elements = useElements();

    const handleSave = async () => {
        if (!stripe || !elements) {
            // Stripe.js has not yet loaded.
            return;
        }

        setLoading(true);

        // Create a PaymentMethod using the CardElement
        const result = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement),
            billing_details: {
                name: name,
            },
        });

        if (result.error) {
            console.error(result.error);
            setLoading(false);
        } else {
            // Pass the PaymentMethod ID and customer ID to your onSave function
            onSave(result.paymentMethod.id, customerId);
        }
    };

    return (
        <div className="registration-container">
            <div className="payment-title">
                <h1>Register new card</h1>
            </div>
            <div className="container preload">
                <div className="creditcard">
                    <div className="front">
                        {/* Your SVG code for the credit card front */}
                    </div>
                    <div className="back">
                        {/* Your SVG code for the credit card back */}
                    </div>
                </div>
            </div>
            <div className="form-container">
                <div className="field-container">
                    <label htmlFor="name">Name</label>
                    <input
                        id="name"
                        maxLength="20"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="field-container">
                    <label>Card Details</label>
                    <CardElement options={{ style: { base: { fontSize: "16px" } } }} />
                </div>
            </div>
            <button onClick={handleSave} disabled={loading}>
                {loading ? "Processing..." : "Save"}
            </button>
        </div>
    );
};

export default CardRegistrationForm;
