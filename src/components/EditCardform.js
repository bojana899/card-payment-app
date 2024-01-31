import React, { useState, useEffect } from "react";

const EditCardForm = ({ cardData, onSave }) => {
    const [name, setName] = useState("");
    const [cardNumber, setCardNumber] = useState("");
    const [expirationDate, setExpirationDate] = useState("");
    const [securityCode, setSecurityCode] = useState("");

    useEffect(() => {
        // Populate the form fields with the existing card data when the component mounts
        if (cardData) {
            setName(cardData.name);
            setCardNumber(cardData.cardNumber);
            setExpirationDate(cardData.expirationDate);
            setSecurityCode(cardData.securityCode);
        }
    }, [cardData]);

    const handleSave = () => {
        const editedCardData = {
            name,
            cardNumber,
            expirationDate,
            securityCode,
        };
        onSave(editedCardData);
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
                        <label htmlFor="cardnumber">Card Number</label>
                        <input
                            id="cardnumber"
                            type="text"
                            pattern="[0-9]*"
                            inputMode="numeric"
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value)}
                        />
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
        </div>
    );
};

export default EditCardForm;
