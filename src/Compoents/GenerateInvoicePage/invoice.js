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
      <div className="admin-order-accepted-table-container-1">
        <div className="admin-order-accepted-category-types">
          <p className="customer-list-table-row">Order ID</p>
          <p className="customer-list-table-row">Name</p>
          <p className="customer-list-table-row">Product</p>
          <p className="customer-list-table-row">Quantity</p>
        </div>

    
            <div
              className="admin-order-accepted-display-of-products-container"
              key={eachProduct.id}
            >
              <p className="customer-list-table-row">{eachProduct.id}</p>
              <p className="customer-list-table-row">{eachProduct.name}</p>
              <p className="customer-list-table-row">{eachProduct.product}</p>
              <p className="customer-list-table-row">{eachProduct.unit}</p>
            </div>
    
      </div>
      <h5>Calculations</h5>
      <div className="admin-order-accepted-table-container-1">
      <div className="admin-order-accepted-category-types">
          <p className="customer-list-table-row">Name</p>
          <p className="customer-list-table-row">Category</p>
          <p className="customer-list-table-row">Quantity</p>
          <p className="customer-list-table-row">Price</p>
          <p className="customer-list-table-row">Total</p>
        </div>
        {service.map((eachProduct) => {
            total = total+parseInt(eachProduct.serviceQuantity)*parseInt(eachProduct.productPrice)
          return (
            <div
              className="admin-order-accepted-display-of-products-container"
              key={eachProduct.serviceId}
            >
              <p className="customer-list-table-row">{eachProduct.productName}</p>
              <p className="customer-list-table-row">{eachProduct.productCategory}</p>
              <p className="customer-list-table-row">{eachProduct.serviceQuantity}</p>
              <p className="customer-list-table-row">{eachProduct.productPrice}</p>
              <p className="customer-list-table-row">{parseInt(eachProduct.serviceQuantity)*parseInt(eachProduct.productPrice)}</p>
            </div>
          );
        })}
    </div>
    <p>Grand Total : {total}</p>
    </div>
    </>
  )
}
export default Invoice