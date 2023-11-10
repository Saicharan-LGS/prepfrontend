import React, { useState, useEffect } from "react";

const TransactionSummary = () => {
  const [totalAmount, setTotalAmount] = useState(null);

  useEffect(() => {
    fetchTotalAmount();
  }, []);

  const fetchTotalAmount = () => {
    const token = sessionStorage.getItem("token");

    if (!token) {
      // Handle the case where the token is missing
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
    <div>
      {/* <div>
        <label htmlFor="customerID">Customer ID:</label>
        <input
          type="text"
          id="customerID"
          value={customerID}
          onChange={handleCustomerIDChange}
        />
        <button onClick={fetchTotalAmount}>Fetch Total Amount</button>
      </div> */}
      {/* {totalAmount !== null && (
        <div>
          <p>
            Customer ID: <strong>{customerID}</strong>
          </p> */}
      <p>
        Balance: <strong>Rs: {totalAmount}/-</strong>
      </p>
      {/* </div> */}
    </div>
  );
};

export default TransactionSummary;
