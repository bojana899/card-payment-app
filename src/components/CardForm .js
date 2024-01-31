// CardForm.js

import React, { useState } from "react";
import "./CardForm.css"; // Import the CSS file

const CardForm = ({ onSave }) => {
    const [cardNumber, setCardNumber] = useState("");
    const [expirationDate, setExpirationDate] = useState("");
    const [cvv, setCvv] = useState("");

    const handleSave = () => {
        const cardData = {
            cardNumber,
            expirationDate,
            cvv,
        };
        onSave(cardData);
        // Clear form fields after saving
        setCardNumber("");
        setExpirationDate("");
        setCvv("");
    };

    return (
        <div className="card-form">
            <img
                className="card-logo"
                src="visa-logo.png" /* Replace with the actual path to your Visa logo image */
                alt="Visa Logo"
            />
            <h2>Add Bank Card</h2>
            <div>
                <label>Card Number:</label>
                <input
                    className="card-input"
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                />
            </div>
            <div>
                <label>Expiration Date:</label>
                <input
                    className="card-input"
                    type="text"
                    value={expirationDate}
                    onChange={(e) => setExpirationDate(e.target.value)}
                />
            </div>
            <div>
                <label>CVV:</label>
                <input
                    className="card-input"
                    type="text"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                />
            </div>
            <button className="card-button" onClick={handleSave}>
                Save
            </button>
        </div>
    );
};

export default CardForm;
