import React, { useState } from "react";
import { ImCancelCircle } from "react-icons/im";

const AddAmountCustomer = ({ id,onClose }) => {
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
      onClose();
      // Handle success, if needed
      console.log("Amount added successfully");
    } catch (error) {
      console.error("Error adding amount:", error.message);
    }
  };

  return (
    <>
    <ImCancelCircle onClick={onClose} style={{fontSize:"24px", color:"#212d45",cursor:"pointer",marginBottom:"10px"}}/>
    <div className="customer-list-add-amount-container">
      <h1 className="customer-list-add-amount-heading">Enter Amount</h1>
      <input type="number" className="customer-list-add-amount-input" value={amount} onChange={handleInputChange} />
      <button onClick={handleAddAmount} className="customer-list-add-amount-button">Add Amount</button>
    </div>
    </>
  );
};

export default AddAmountCustomer;
