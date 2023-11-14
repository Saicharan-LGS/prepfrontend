import React from "react";

const TransactionSummary = ({ totalAmount }) => {
  return (
    <p className="customer-navbar-nav-item-name">
      Balance: <strong>Rs: {totalAmount}</strong>
    </p>
  );
};

export default TransactionSummary;
