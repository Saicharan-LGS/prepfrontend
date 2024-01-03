import React, { useState, useEffect, useRef } from "react";
import Invoice from "./invoice";
import './index.css'
import { ImCancelCircle } from "react-icons/im";
import "./index.css";
import { useReactToPrint } from 'react-to-print';

function GenerateInvoicePage({ data,onClose,fetchProducts }) {
  const [totalAmount, setTotalAmount] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [discountAmount, setDiscountAmount] = useState();

  const handleDiscount = (e) => {
    console.log(e.target.value);
    let discountValue = e.target.value
    let finalAmount = totalAmount - (totalAmount * discountValue) / 100;
    setDiscount(e.target.value);
    setDiscountAmount(finalAmount);
  };
  useEffect(()=>{
    setDiscountAmount(totalAmount)
  },[])

  const handleAdd = () => {
    let finalAmount = totalAmount - (totalAmount * discount) / 100;
    setDiscountAmount(finalAmount);
  };
  const FETCH_URL = process.env.REACT_APP_FETCH_URL;

  const generateInvoice = async () => {
    alert("Are you sure.....")
    console.log("generate invoice called");
    const orderIds = data.map((each) => each.id);
    console.log(orderIds);
    try {
      const response = await fetch(`${FETCH_URL}postgenerateInvoice`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customer_id: data[0].customer_id, // Replace with the actual customer ID
          orders: JSON.stringify(orderIds),
          discount: discount,
          totalamount: totalAmount,
          discounted_amount: discountAmount,
          invoice_status: "5",
        }),
      });

      if (!response.ok) {
        throw new Error("Error generating invoice");
      }
      onClose()
      fetchProducts()
      console.log("Invoice generated successfully");
    } catch (error) {
      console.error("Error generating invoice:", error.message);
    }
  };

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
    setDiscountAmount(total)
  }, [data]);

  console.log(totalAmount, "totalamount");
  console.log(totalAmount, "totalamount")

  const handleModel=()=>{
    onClose()
  }




  return (
    <div>
      <ImCancelCircle className="model-close-icon" onClick={handleModel}/>
      <h1 className="genearte-invoice-heading">Invoice Generation</h1>
      {data.map((each) => (
        <Invoice key={each.id} data={each} />
      ))}
      <p className="generate-invoice-total-amount">
        Total Amount : {totalAmount}
      </p>
      <div className="generate-invoice-discount-container">
        <label className="generate-invoice-total-amount">Discount(%) :</label>
        <input
          type="number"
          value={discount}
          className=""
          placeholder="Enter discount in Percentage"
          onChange={handleDiscount}
          required
        />
        <button onClick={handleAdd} className="service-add-button">
          Add
        </button>
        
      </div>
      <p  className="generate-invoice-total-amount">Discounted Price : {discountAmount}</p>
      <button onClick={generateInvoice} className="service-add-button">Generate Invoice</button>
    </div>
  );
  
}
// const GenerateInvoicePage = ({data,onClose,fetchProducts}) => {
//   const contentRef = useRef();

//   const handlePrint = useReactToPrint({
//     content: () => contentRef.current,
//   });

//   return (
//     <div>
//       <Download contentRef={contentRef} data={data} onClose={onClose} fetchProducts={fetchProducts} />
//       <button onClick={handlePrint}>Download PDF</button>
//     </div>
//   );
// };

export default GenerateInvoicePage;
