import React, { useState, useEffect } from "react";
import Invoice from "./invoice";
import './index.css'
import { ImCancelCircle } from "react-icons/im";
import "./index.css";


function GenerateInvoicePage({ data,onClose,fetchProducts }) {
  const [totalAmount, setTotalAmount] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [discountAmount, setDiscountAmount] = useState();

  const handleDiscount = (e) => {
  
    if(e.target.value>100){
      alert("Value must be 2 digits only...")
      return
    }
    let discountValue = e.target.value
    let finalAmount = totalAmount - (totalAmount * discountValue) / 100;
    finalAmount = parseFloat(finalAmount.toFixed(3));
    setDiscount(e.target.value);
    setDiscountAmount(finalAmount);
  };
  useEffect(()=>{
    setDiscountAmount(totalAmount)
  },[])

  
  const FETCH_URL = process.env.REACT_APP_FETCH_URL;

  const generateInvoice = async () => {
    const isConfirmed = window.confirm(
      "Are you sure you want to Generate Invoice?"
    );
 
    if (!isConfirmed) {
      return;
    }
 
    const orderIds = data.map((each) => each.id);
   
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
     
    } catch (error) {
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
       <div className="generate-invoice-billing-container">
        <div className="generate-invoice-discount-container">
        <p className="generate-invoice-total-amount">
          Total Amount
        </p>
        <p className="generate-invoice-total-amount-text">{totalAmount}</p>
      </div>
      <div className="generate-invoice-discount-container">
        <p className="generate-invoice-total-amount">Discount(%)</p>
        <input
          type="number"
          value={discount}
          className="generate-invoice-discount-input"
          placeholder="Enter discount in Percentage"
          onChange={handleDiscount}
          required
          min="0" max="99"
        />
        
      </div>
      <div className="generate-invoice-discount-container">
      <p  className="generate-invoice-total-amount" style={{fontWeight:700,color:"#212d45",fontSize:"20px"}}>Final Price</p>
      <p className="generate-invoice-total-amount-text" style={{fontWeight:700,color:"#212d45",fontSize:"20px"}}>{discountAmount}</p>
      </div>
     
      
      </div>
      <div style={{display:"flex",justifyContent:"center"}}>
        <button onClick={generateInvoice} className="service-add-button">Generate Invoice</button>
      </div>
      
      
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
