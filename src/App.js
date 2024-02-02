import React, { useState, useEffect } from "react";
import CardRegistrationForm from "./components/CardRegistrationForm";
import CardDisplay from "./components/CardDisplay";
import EditCardForm from "./components/EditCardForm";
import Modal from "react-modal";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import "./App.css";

Modal.setAppElement("#root");

const stripePromise = loadStripe("pk_test_51OeeiiDkuocCJB4kAnXkMevdSPbBruwYM4nNiMTUbQFO8K89nLXw7xJ3qHWNXAed4cuYLwz6vyGWcwGkeu3dOkbc00CFFXfVCe");

function App() {
  const [cards, setCards] = useState([]);
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  const [customerId, setCustomerId] = useState("");
  const [editCardIndex, setEditCardIndex] = useState(-1);

  useEffect(() => {
    const fetchCustomerId = async () => {
      try {
        const customerId = "cus_PTmNlBKIkkoH4s";
        setCustomerId(customerId);
      } catch (error) {
        console.error("Failed to fetch customer ID:", error);
      }
    };

    fetchCustomerId();
  }, []);

  const handleSaveCard = async (paymentMethod) => {
    console.log("customerId:", customerId); // For debugging, remove in production
    console.log(paymentMethod);

    try {
      const response = await fetch(`http://localhost:3001/v1/customers/cus_PTmNlBKIkkoH4s/sources`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          paymentMethod: paymentMethod,
        }),
      });

      if (response.ok) {
        const cardData = await response.json();
        setCards(cardData);
      } else {
        console.error("Failed to save card.");
      }
    } catch (error) {
      console.error("Error while saving card:", error);
    }

    setShowRegistrationModal(false);
  };

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await fetch(`http://localhost:3001/v1/customers/cus_PTmNlBKIkkoH4s/cards`);
        if (response.ok) {
          const cardData = await response.json();
          setCards(cardData);
        } else {
          console.error("Failed to fetch card data.");
        }
      } catch (error) {
        console.error("Error while fetching card data:", error);
      }
    };

    fetchCards();
  }, [customerId]);

  const handleEditCard = (index) => {
    setEditCardIndex(index);
  };

  const handleEditCardClose = () => {
    setEditCardIndex(-1);
  };

  return (
    <div className="App">
      <Elements stripe={stripePromise}>
        <h1>Bank Card Management</h1>

        <div>
          <h2>Saved Cards</h2>

          <ul className="cards-list">
            {cards.map((card, index) => (
              <li key={index} className="card-item">
                {/* Wrap the card item in a clickable container */}
                <div onClick={() => handleEditCard(index)}>
                  <CardDisplay
                    cardNumber={card.cardNumber}
                    expirationDate={card.expirationDate}
                    cardholderName={card.cardholderName}
                  />
                </div>
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
          <Elements stripe={stripePromise}>
            <CardRegistrationForm onSave={handleSaveCard} customerId={customerId} />
          </Elements>
        </Modal>

        <Modal
          isOpen={editCardIndex !== -1}
          onRequestClose={handleEditCardClose}
          contentLabel="Edit Card Modal"
        >
          <Elements stripe={stripePromise}>
            {editCardIndex !== -1 && (
              <EditCardForm
                cardData={cards[editCardIndex]}
                onSave={handleSaveCard}
                onClose={handleEditCardClose}
              />
            )}
          </Elements>
        </Modal>
      </Elements>
    </div>
  );
}

export default App;
