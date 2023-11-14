import React, { useState, useEffect } from "react";

const TransactionSummary = ({totalAmount}) => {
 

  return (
    <p className="navbar-nav-item-name">
      Balance: <strong>Rs: {totalAmount}</strong>
    </p>
  );
};

export default TransactionSummary;
