import React, { useState, useEffect } from "react";
import Customerinvoicedata from "./customerinvoice";

import { ImCancelCircle } from "react-icons/im";
import Toast from "../utlis/toast";


function CustomerInvoicePage({onClose,selectedOrders,totalAmount,discount,discountedAmount }) {
    

  const [invoiceOrders,setInvoiceOrders] = useState([])


  const handleModel=()=>{
    onClose()
  }
  console.log(invoiceOrders,"lkjljahdfg")

  const FETCH_URL = process.env.REACT_APP_FETCH_URL;

  const fetchData = async () => {
      try {
        const token = sessionStorage.getItem("token");
        const response = await fetch(`${FETCH_URL}generateInvoices`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ selectedIds: JSON.parse(selectedOrders) }),
        });
        if (response.ok) {
          const data = await response.json();
        //   Toast.fire({
        //     icon: "success",
        //     title: data.message,
        //   });
          console.log(response,"vashni")
          setInvoiceOrders(data.orders);
          console.log(data.orders, "ordersdata");
          // fetchProducts();
        } else {
          const data = await response.json();
          Toast.fire({
            icon: "error",
            title: data.message,
          });
        }
      } catch (error) {
        // Handle error
      }
  };

  useEffect(() => {
    fetchData()
  },[]
  )
  

  return (
    <>
      <ImCancelCircle className="model-close-icon" onClick={handleModel}/>
      <h1 className="genearte-invoice-heading">Invoice Generation</h1>
      {invoiceOrders.map((each) => (
        <Customerinvoicedata key={each.id} data={each} />
      ))}
      <p className="generate-invoice-total-amount">
        Total Amount : {totalAmount}
      </p>
      <div className="generate-invoice-discount-container">
        <label className="generate-invoice-total-amount">Discount(%) : {discount}</label>
        
      </div>
      <p  className="generate-invoice-total-amount">Discounted Price : {discountedAmount}</p>
      {/* <button onClick={generateInvoice}>Generate Invoice</button> */}
    </>
  );
}

export default CustomerInvoicePage;
