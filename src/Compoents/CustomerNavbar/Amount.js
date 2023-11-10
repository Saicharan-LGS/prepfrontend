import React, { useState, useEffect } from "react";
import './index.css'
const TransactionSummary = () => {
  const [totalAmount, setTotalAmount] = useState(null);

  useEffect(() => {
    fetchTotalAmount();
  }, []);

  const fetchTotalAmount = () => {
    const token = sessionStorage.getItem("token");

    if (!token) {
      return;
    }
    fetch(`http://localhost:3009/api/v1/getAmount`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setTotalAmount(data.total_amount);
        console.log(data.total_amount);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setTotalAmount(null);
      });
  };

  return (
    
      <p className="customer-navbar-nav-item-name">
        Balance: <strong>Rs: {totalAmount}</strong>
      </p>
  );
};

export default TransactionSummary;
