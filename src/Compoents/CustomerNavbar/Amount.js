import React, { useState, useEffect } from "react";

const TransactionSummary = ({totalAmount}) => {
 

  return (
    <p style={{ color: "#FFF", fontSize: "18px" }}>
      Balance: <strong>Rs: {totalAmount}</strong>
    </p>
  );
};

export default TransactionSummary;
