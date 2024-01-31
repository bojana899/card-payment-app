// src/components/CardRegistrationForm.js
import React, { useState } from "react";
import "./CardRegistrationForm.css"

const CardRegistrationForm = ({ onSave }) => {
    const [name, setName] = useState("");
    const [cardNumber, setCardNumber] = useState("");
    const [expirationDate, setExpirationDate] = useState("");
    const [securityCode, setSecurityCode] = useState("");

    const handleSave = () => {
        const cardData = {
            name,
            cardNumber,
            expirationDate,
            securityCode,
        };
        onSave(cardData);
        // Clear form fields after saving
        setName("");
        setCardNumber("");
        setExpirationDate("");
        setSecurityCode("");
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
                    <label htmlFor="cardnumber">Card Number</label>
                    <input
                        id="cardnumber"
                        type="text"
                        pattern="[0-9]*"
                        inputMode="numeric"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                    />
                    {/* Your SVG code for the card icon */}
                </div>
                <div className="field-container">
                    <label htmlFor="expirationdate">Expiration (mm/yy)</label>
                    <input
                        id="expirationdate"
                        type="text"
                        pattern="[0-9]*"
                        inputMode="numeric"
                        value={expirationDate}
                        onChange={(e) => setExpirationDate(e.target.value)}
                    />
                </div>
                <div className="field-container">
                    <label htmlFor="securitycode">Security Code</label>
                    <input
                        id="securitycode"
                        type="text"
                        pattern="[0-9]*"
                        inputMode="numeric"
                        value={securityCode}
                        onChange={(e) => setSecurityCode(e.target.value)}
                    />
                </div>
            </div>
            <button onClick={handleSave}>Save</button>
        </div>
    );
};

export default CardRegistrationForm;
