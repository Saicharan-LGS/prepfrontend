import React, { useEffect, useState } from "react";
import "./index.css";
import AmountPost from "./AmountPost";
function AccountOrders() {
  const [products, setProducts] = useState([]);
useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token =
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InBrZ2FtaW5nLnByYXNoYW50aEBnbWFpbC5jb20iLCJpYXQiOjE2OTg5MTQxNjMsImV4cCI6MTY5ODkxNzc2M30.5gcIHeVMqmmmXP0GaAoBIxHYgotglwuJu8DHvlymuHs";
        const response = await fetch(
          "http://localhost:3009/api/v1/labelorderlist",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        ); // Replace with your API endpoint
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setProducts(data);
        } else {
          console.error("Failed to fetch products");
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);


  const onChangeInput=()=>{

  }
  return (
    <div>
      <h2>Orders List</h2>
      <div className="admin-orders-product-container">
        <p className="admin-orders-product-id">Order ID</p>
        <p className="admin-orders-product-name">Name</p>
        <p className="admin-orders-product-service">Service</p>
        <p className="admin-orders-product-quantity">Quantity</p>
        <p className="admin-orders-product-url">Order Tracking Link</p>
        <p>Enter Amount</p>
        <div className="admin-orders-product-buttons-container"></div>
      </div>
      <div className="admin-orders-product-container">
        <p className="admin-orders-product-id">1</p>
        <p className="admin-orders-product-name">soap 5GB Free online</p>
        <p className="admin-orders-product-service">label</p>
        <p className="admin-orders-product-quantity">2</p>
        <p className="admin-orders-product-url">http://localhost:3000/get</p>
        
        <AmountPost id="1" />
      </div>
      <div className="admin-orders-product-container">
        <p className="admin-orders-product-id">1</p>
        <p className="admin-orders-product-name">soap 5GB Free online</p>
        <p className="admin-orders-product-service">label</p>
        <p className="admin-orders-product-quantity">2</p>
        <p className="admin-orders-product-url">http://localhost:3000/get</p>
       
        <AmountPost id="2" />
      </div>
      <div className="admin-orders-product-container">
        <p className="admin-orders-product-id">1</p>
        <p className="admin-orders-product-name">soap 5GB Free online</p>
        <p className="admin-orders-product-service">label</p>
        <p className="admin-orders-product-quantity">2</p>
        <p className="admin-orders-product-url">http://localhost:3000/get</p>

        <AmountPost id="3" />
      </div>
    </div>
  );
}

export default AccountOrders;
