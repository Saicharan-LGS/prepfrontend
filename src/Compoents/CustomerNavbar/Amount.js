import React from "react";

const TransactionSummary = ({ totalAmount }) => {
  return (
    <p className="navbar-nav-item-name">
      Account Balance: <strong>$: {totalAmount}</strong>
    </p>
  );
};

export default TransactionSummary;
