import React, { createContext, useState, useContext } from 'react';

const AddressContext = createContext();

const INITIAL_ADDRESSES = [
  {
    id: '1',
    label: 'Home',
    name: 'Ankita Anshul',
    street: 'Sector 62, Noida',
    city: 'Noida',
    state: 'Uttar Pradesh',
    zipCode: '201309',
    phone: '+91 98765 43210',
    isDefault: true,
  },
  {
    id: '2',
    label: 'Work',
    name: 'Ankita Anshul',
    street: 'DLF Cyber City, Phase 2',
    city: 'Gurugram',
    state: 'Haryana',
    zipCode: '122002',
    phone: '+91 98765 43210',
    isDefault: false,
  },
];

export const AddressProvider = ({ children }) => {
  const [addresses, setAddresses] = useState(INITIAL_ADDRESSES);

  const addAddress = (newAddress) => {
    setAddresses((prev) => [
      ...prev,
      {
        ...newAddress,
        id: Date.now().toString(),
        isDefault: prev.length === 0,
      },
    ]);
  };

  const removeAddress = (id) => {
    setAddresses((prev) => {
      const filtered = prev.filter(addr => addr.id !== id);
      if (filtered.length > 0 && !filtered.find(a => a.isDefault)) {
        filtered[0].isDefault = true;
      }
      return filtered;
    });
  };

  const setDefaultAddress = (id) => {
    setAddresses((prev) => 
      prev.map(addr => ({
        ...addr,
        isDefault: addr.id === id,
      }))
    );
  };

  return (
    <AddressContext.Provider value={{ addresses, addAddress, removeAddress, setDefaultAddress }}>
      {children}
    </AddressContext.Provider>
  );
};

export const useAddress = () => useContext(AddressContext);
