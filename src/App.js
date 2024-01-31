import React, { useState } from "react";
import "./App.css";
import CardForm from "./components/CardForm ";
import CardRegistrationForm from "./components/CardRegistrationForm";
import Modal from "react-modal";

Modal.setAppElement("#root"); // Set the app element for react-modal

function App() {
  const [cards, setCards] = useState([]);
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);

  const handleSaveCard = (cardData) => {
    setCards([...cards, cardData]);
    setShowRegistrationModal(false); // Close the registration modal after saving
  };

  return (
    <div className="App">
      <h1>Bank Card Management</h1>
      <CardForm onSave={handleSaveCard} />
      <div>
        <h2>Saved Cards</h2>
        <ul>
          {cards.map((card, index) => (
            <li key={index}>
              Card Number: {card.cardNumber}, Expiration: {card.expirationDate}
            </li>
          ))}
        </ul>
      </div>
      <button onClick={() => setShowRegistrationModal(true)}>Add New Card</button>
      <Modal
        isOpen={showRegistrationModal}
        onRequestClose={() => setShowRegistrationModal(false)}
        contentLabel="Card Registration Modal"
      >
        <CardRegistrationForm onSave={handleSaveCard} />
      </Modal>
    </div>
  );
}

export default App;
