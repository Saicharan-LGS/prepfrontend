import React, { useState, useEffect } from "react";
import Invoice from "./invoice";

function GenerateInvoicePage({ data }) {
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    // Calculate total amount
    const total = data.reduce((acc, each) => {
      return (
        acc +
        each.services.reduce(
          (serviceAcc, service) =>
            serviceAcc + service.productPrice * service.serviceQuantity,
          0
        )
      );
    }, 0);

    setTotalAmount(total);
  }, [data]);

  console.log(totalAmount, "totalamount")
  return (
    <>
      <h1>Invoice Generation</h1>
      {data.map((each) => (
        <Invoice key={each.id} data={each} />
      ))}
      <p>Total Amount: {totalAmount}</p>
    </>
  );
}

export default GenerateInvoicePage;
