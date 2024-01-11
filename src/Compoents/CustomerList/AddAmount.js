import React, { useState } from "react";

const AddAmountCustomer = ({ id,setModalOpen }) => {
  const [amount, setAmount] = useState(0);
  const FETCH_URL = process.env.REACT_APP_FETCH_URL;

  const handleInputChange = (event) => {
    setAmount(event.target.value);
  };

  const handleAddAmount = async () => {
    try {
      // Retrieve the token from sessionStorage
      const token = sessionStorage.getItem("token"); // Replace 'your_token_key' with your actual key
      const response = await fetch(`${FETCH_URL}addAmountTransaction/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
        body: JSON.stringify({ amount }),
      });

      if (!response.ok) {
        throw new Error("Failed to add amount");
      }
      alert("Amount added successfully");
      setModalOpen(false);
      // Handle success, if needed
      console.log("Amount added successfully");
    } catch (error) {
      console.error("Error adding amount:", error.message);
    }
  };

  return (
    <>
      <input type="number" value={amount} onChange={handleInputChange} />
      <button onClick={handleAddAmount}>Add Amount</button>
    </>
  );
};

export default AddAmountCustomer;
