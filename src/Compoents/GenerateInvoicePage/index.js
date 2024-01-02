import React, { useState, useEffect } from "react";
import Invoice from "./invoice";
import './index.css'

function GenerateInvoicePage({ data }) {
  const [totalAmount, setTotalAmount] = useState(0);
  const [discount,setDiscount] = useState(0)
  const [discountAmount,setDiscountAmount] = useState("-")

  const handleDiscount=(e)=>{
    console.log(e.target.value)
    setDiscount(e.target.value)
  }

  const handleAdd=()=>{
    const finalAmount = totalAmount-((totalAmount*discount)/100)
    setDiscountAmount(finalAmount)

  }

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
      <h1 className="genearte-invoice-heading">Invoice Generation</h1>
      {data.map((each) => (
        <Invoice key={each.id} data={each} />
      ))}
      <p className="generate-invoice-total-amount">Total Amount: {totalAmount}</p>
      <div className="generate-invoice-discount-container">
        <label className="generate-invoice-total-amount">Discount(%) :</label>
        <input type="number" value ={discount} className="" placeholder="Enter discount in Percentage" onChange={handleDiscount}/>
        <button onClick={handleAdd} className="service-add-button">Add</button>
      </div>
      <p>Discount Price : {discountAmount}</p>
    </>
  );
}

export default GenerateInvoicePage;
