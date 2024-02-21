import React, { useState } from "react";
import { ImCancelCircle } from "react-icons/im";
import Toast from "../utlis/toast";

const AddDiscountCustomer = ({ id, onClose, fetchProducts }) => {
  const [amount, setAmount] = useState(0);
  console.log(id, "called");
  const FETCH_URL = process.env.REACT_APP_FETCH_URL;

  const handleInputChange = (event) => {
    let value = parseFloat(event.target.value);
    if (!isNaN(value)) {
      setAmount(value);
    }
  };

  const handleAddAmount = async () => {
    const isConfirmed = window.confirm(
      `Are you sure you want to add ${amount.toFixed(2)} discount?`
    );

    if (!isConfirmed) {
      return; // User canceled the operation
    }

    if (amount < 0) {
      Toast.fire({
        icon: "error",
        title: "Amount must be greater than or equal to 0",
      });
      return;
    }

    try {
      const token = sessionStorage.getItem("token");
      if (!token) {
        throw new Error("Token is missing");
      }
      const response = await fetch(`${FETCH_URL}addDiscountToCustomer/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ discount: amount }),
      });
      console.log(response);
      if (!response.ok) {
        throw new Error("Failed to add amount");
      }
      const data = await response.json();
      Toast.fire({
        icon: "success",
        title: data.message,
      });
      fetchProducts();
      onClose();
      // Handle success, if needed
    } catch (error) {
      // Handle the error, if needed
    }
  };

  return (
    <>
      <div className="model-close-icon-container">
        <ImCancelCircle className="model-close-icon" onClick={onClose} />
      </div>
      <div className="customer-list-add-amount-container">
        <h1 className="customer-list-add-amount-heading">Enter Discount</h1>
        <input
          type="number"
          className="customer-list-add-amount-input"
          value={amount !== 0 ? amount : ""}
          onChange={handleInputChange}
        />
        <button
          onClick={handleAddAmount}
          className="customer-list-add-amount-button"
        >
          Add Discount
        </button>
      </div>
    </>
  );
};

export default AddDiscountCustomer;
