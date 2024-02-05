import React, { useState, useEffect } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import "./EditCardForm.css";

const EditCardForm = ({ cardData, onSave }) => {
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);

    const stripe = useStripe();
    const elements = useElements();

    useEffect(() => {

        if (cardData) {
            setName(cardData.name);
        }
    }, [cardData]);

    const handleSave = async () => {
        if (!stripe || !elements) {

            return;
        }

        setLoading(true);


        const result = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement),
            billing_details: {
                name: name,
            },
        });

        if (result.error) {
            console.error(result.error);
        } else {

            onSave(result.paymentMethod.id);
        }

        setLoading(false);
    };

    return (
        <div className="registration-container">
            <div className="payment-title">
                <h1>Edit Card</h1>
            </div>

            <div>
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
        </div>
    );
};

export default EditCardForm;
