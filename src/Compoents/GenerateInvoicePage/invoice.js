import React from 'react'
import { useState,useEffect } from 'react'

function Invoice({data}) {
    const eachProduct = data
    const [service,setServices] = useState([])
    let total = 0
    useEffect(() => {
        // Update services state when data changes
        setServices(data.services);
        
      }, [data]);
    
    
    
  return (
    <>
    <div style={{marginBottom:"20px"}}>
      <h4>Each Product Invoice :</h4>
      <div className="generate-invoice-table-container-1">
        <div className="generate-invoice-header-table-container">
          <p className="generate-invoice-table-header">Order ID</p>
          <p className="generate-invoice-table-header">Name</p>
          <p className="generate-invoice-table-header">Product</p>
          <p className="generate-invoice-table-header">Quantity</p>
        </div>

    
            <div
              className="generate-invoice-table-display-container"
              key={eachProduct.id}
            >
              <p className="generate-invoice-table-header">{eachProduct.id}</p>
              <p className="generate-invoice-table-header">{eachProduct.name}</p>
              <p className="generate-invoice-table-header">{eachProduct.product}</p>
              <p className="generate-invoice-table-header">{eachProduct.unit}</p>
            </div>
    
      </div>
      <h5>Calculations</h5>
      <div className="generate-invoice-table-container-1">
      <div className="generate-invoice-header-table-container">
          <p className="generate-invoice-table-header">Customer Name</p>
          <p className="generate-invoice-table-header">Category</p>
          <p className="generate-invoice-table-header">Quantity</p>
          <p className="generate-invoice-table-header">Price</p>
          <p className="generate-invoice-table-header-1">Total</p>
        </div>
        {service.map((eachProduct) => {
            total = total+parseInt(eachProduct.serviceQuantity)*parseInt(eachProduct.productPrice)
          return (
            <div
            className="generate-invoice-table-display-container"
              key={eachProduct.serviceId}
            >
              <p className="generate-invoice-table-header">{eachProduct.productName}</p>
              <p className="generate-invoice-table-header">{eachProduct.productCategory}</p>
              <p className="generate-invoice-table-header">{eachProduct.serviceQuantity}</p>
              <p className="generate-invoice-table-header">{eachProduct.productPrice}</p>
              <p className="generate-invoice-table-header-1">{parseInt(eachProduct.serviceQuantity)*parseInt(eachProduct.productPrice)}</p>
            </div>
          );
        })}
    </div>
    <div style={{display:"flex",justifyContent:"flex-end",marginRight:"10px"}}>
    <p className="generate-invoice-total-amount">Grand Total : {total}</p>
    </div>
    </div>
    </>
  )
}
export default Invoice