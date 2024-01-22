import React, { useState, useEffect, useRef } from "react";
import Customerinvoicedata from "./customerinvoice";

import { ImCancelCircle } from "react-icons/im";
import Toast from "../utlis/toast";
import { useReactToPrint } from "react-to-print";
import Axlogo from "../utlis/Axlogo.png";

function CustomerInvoicePage({
  onClose,
  selectedOrders,
  totalAmount,
  discount,
  discountedAmount,
  customerName,
  date,
}) {
  const [invoiceOrders, setInvoiceOrders] = useState([]);
  const contentRef = useRef();

  const handleModel = () => {
    onClose();
  };

  const FETCH_URL = process.env.REACT_APP_FETCH_URL;

  const fetchData = async () => {
    try {
      const response = await fetch(`${FETCH_URL}generateInvoices`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ selectedIds: JSON.parse(selectedOrders) }),
      });
      if (response.ok) {
        const data = await response.json();

        setInvoiceOrders(data.orders);
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
    fetchData();
  }, []);

  const handlePrint = useReactToPrint({
    content: () => contentRef.current,
  });

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          gap: "30px",
        }}
      >
        <button
          className="service-add-button"
          style={{ margin: "0px" }}
          onClick={handlePrint}
        >
          Download PDF
        </button>
        <ImCancelCircle
          className="model-close-icon"
          style={{ margin: "0px" }}
          onClick={handleModel}
        />
      </div>
      <div ref={contentRef} style={{ padding: "20px 20px" }}>
        <h1 className="genearte-invoice-heading">Invoice</h1>
        <div className="generate-invoice-logo-address-container">
          <div className="ax-logo-container">
            <img src={Axlogo} alt="logo" className="ax-logo" />
          </div>
          <div className="genrate-invoice-address-container">
            <h1 className="generate-invoice-address-name-heading">Ax Xpress</h1>
            <p className="generate-invoice-address-name">6102 N Damen Ave</p>
            <p className="generate-invoice-address-name">
              Chicago, IL 60659 US
            </p>
            <p className="generate-invoice-address-name">+1 8723161144</p>
            <p className="generate-invoice-address-name">
              payments@axxpress.com
            </p>
          </div>
        </div>
        <h3 className="genearte-invoice-heading">
          Customer Name : {customerName}
        </h3>
        {invoiceOrders.map((each) => (
          <Customerinvoicedata key={each.id} data={each} date={date} />
        ))}
        <div className="generate-invoice-billing-container">
          <div className="generate-invoice-discount-container">
            <p className="generate-invoice-total-amount">Total Amount</p>
            <p className="generate-invoice-total-amount-text">{totalAmount}</p>
          </div>
          {discount > 0 && (
            <div className="generate-invoice-discount-container">
              <p className="generate-invoice-total-amount">Discount(%)</p>
              <p className="generate-invoice-total-amount-text">{discount}</p>
            </div>
          )}
          <div className="generate-invoice-discount-container">
            <p
              className="generate-invoice-total-amount"
              style={{ fontWeight: 700, color: "#212d45", fontSize: "20px" }}
            >
              Final Price
            </p>
            <p
              className="generate-invoice-total-amount-text"
              style={{ fontWeight: 700, color: "#212d45", fontSize: "20px" }}
            >
              {discountedAmount}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default CustomerInvoicePage;
