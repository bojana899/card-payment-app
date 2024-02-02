import React, { useState } from "react";
import "./CardForm.css"; // Import the CSS file
import EditCardForm from "./EditCardForm"; // Import the EditCardForm component
import Modal from "react-modal"; // Import the modal library

Modal.setAppElement("#root"); // Set the app element for react-modal

const CardForm = ({ onSave, stripeCardData }) => {
    const [isEditFormOpen, setIsEditFormOpen] = useState(false); // State to control the edit form modal

    // Function to open the edit form modal
    const openEditForm = () => {
        setIsEditFormOpen(true);
    };

    // Function to close the edit form modal
    const closeEditForm = () => {
        setIsEditFormOpen(false);
    };

    return (
        <div className="card-form">
            {/* Card data display */}
            {stripeCardData ? (
                <div className="card-data" onClick={openEditForm}>
                    {/* Render a generic card logo */}
                    <img
                        className="card-logo"
                        src="generic-card-logo.png" // Replace with the path to your generic card logo image
                        alt="Card Logo"
                    />
                    <h2>Bank Card</h2>
                    <div className="card-details">
                        <p>Card Number: **** **** **** {stripeCardData.last4}</p>
                        <p>
                            Expiration Date: {stripeCardData.exp_month}/{stripeCardData.exp_year}
                        </p>
                        {/* You may choose to display more card details here */}
                    </div>
                </div>
            ) : (
                <p>No card data available</p>
            )}

            {/* Render the edit form as a modal */}
            <Modal
                isOpen={isEditFormOpen}
                onRequestClose={closeEditForm}
                contentLabel="Edit Card Modal"
            >
                <EditCardForm
                    cardData={stripeCardData} // Pass the card data as a prop
                    onSave={(editedCardData) => {
                        onSave(editedCardData);
                        closeEditForm(); // Close the edit form modal after saving
                    }}
                />
            </Modal>
        </div>
    );
};

export default CardForm;
