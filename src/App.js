import React, { useState, useEffect } from "react";
import CardForm from "./components/CardForm ";
import CardRegistrationForm from "./components/CardRegistrationForm";
import Modal from "react-modal";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import "./App.css";

Modal.setAppElement("#root");

const stripePromise = loadStripe("pk_test_51OeeiiDkuocCJB4kAnXkMevdSPbBruwYM4nNiMTUbQFO8K89nLXw7xJ3qHWNXAed4cuYLwz6vyGWcwGkeu3dOkbc00CFFXfVCe");

function App() {
  const [cards, setCards] = useState([]);
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  const [customerId, setCustomerId] = useState(""); // Define the customerId state

  useEffect(() => {
    // Fetch the initial customer ID or set it based on your application logic
    const fetchCustomerId = async () => {
      try {
        // Fetch the customer ID from your server or set it based on your logic
        // Example: const customerId = await fetchCustomerIdFromServer();
        // For now, I'll set it to your actual customer ID.
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
    // Fetch the initial list of saved cards when the component mounts
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
  }, [customerId]); // Include customerId as a dependency to re-fetch cards when it changes

  return (
    <div className="App">
      <Elements stripe={stripePromise}>
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
          <Elements stripe={stripePromise}>
            {/* Pass the customerId to CardRegistrationForm */}
            <CardRegistrationForm onSave={handleSaveCard} customerId={customerId} />
          </Elements>
        </Modal>
      </Elements>
    </div>
  );
}

export default App;
