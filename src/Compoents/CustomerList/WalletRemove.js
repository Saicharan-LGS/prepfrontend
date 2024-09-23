import React, { useState } from "react";
import Toast from "../utlis/toast";

function WalletRemove({ onClose, fetchProducts, id }) {
  const [amount, setAmount] = useState(0);
  const [remark, setRemark] = useState(""); // State for remark
  const [error, setError] = useState("");

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleRemarkChange = (e) => {
    setRemark(e.target.value);
  };

  const handleWithdraw = async () => {
    if (amount <= 0) {
      setError("Please enter a valid amount");
      return;
    }

    try {
      const token = sessionStorage.getItem("token");
      const response = await fetch(
        `${process.env.REACT_APP_FETCH_URL}customer-amount-withdraw`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ amount, remark, customer_id: id }), // Include remark in the body
        }
      );

      if (response.ok) {
        const data = await response.json();
        Toast.fire({
          icon: "success",
          title: data.message,
        });

        fetchProducts();
        onClose();
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Failed to withdraw amount");
      }
    } catch (error) {
      setError("An error occurred while withdrawing");
    }
  };

  return (
    <div className="wallet-add-main-container">
      <div className="wallet-add-sub-container">
        <h1 className="wallet-add-heading">Please Enter The Amount</h1>

        <div className="wallet-add-field-container">
          <input
            type="number"
            placeholder="Enter the Amount"
            className="wallet-add-input"
            name="amount"
            value={amount}
            onChange={handleAmountChange}
          />
        </div>

        <div className="wallet-add-field-container">
          <input
            type="text"
            placeholder="Enter a Remark (optional)"
            className="wallet-add-input"
            name="remark"
            value={remark}
            onChange={handleRemarkChange}
          />
        </div>

        {error && <p className="error-message">{error}</p>}

        <button className="service-add-button" onClick={handleWithdraw}>
          Withdraw
        </button>
      </div>
    </div>
  );
}

export default WalletRemove;
