import React, { createContext, useState, useContext } from 'react';

const PaymentContext = createContext();

const INITIAL_CARDS = [
  {
    id: '1',
    type: 'Visa',
    last4: '4242',
    expiry: '12/26',
    brand: 'visa',
    isDefault: true,
  },
  {
    id: '2',
    type: 'Mastercard',
    last4: '8888',
    expiry: '08/25',
    brand: 'mastercard',
    isDefault: false,
  },
];

export const PaymentProvider = ({ children }) => {
  const [cards, setCards] = useState(INITIAL_CARDS);

  const addCard = (newCard) => {
    setCards((prevCards) => [
      ...prevCards,
      {
        ...newCard,
        id: Date.now().toString(),
        isDefault: prevCards.length === 0,
      },
    ]);
  };

  const removeCard = (cardId) => {
    setCards((prevCards) => {
      const filtered = prevCards.filter((card) => card.id !== cardId);
      // If we removed the default card and have others left, make the first one default
      if (filtered.length > 0 && !filtered.find(c => c.isDefault)) {
        filtered[0].isDefault = true;
      }
      return filtered;
    });
  };

  const setDefaultCard = (cardId) => {
    setCards((prevCards) =>
      prevCards.map((card) => ({
        ...card,
        isDefault: card.id === cardId,
      }))
    );
  };

  return (
    <PaymentContext.Provider value={{ cards, addCard, removeCard, setDefaultCard }}>
      {children}
    </PaymentContext.Provider>
  );
};

export const usePayment = () => {
  return useContext(PaymentContext);
};
