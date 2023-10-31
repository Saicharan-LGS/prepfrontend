import React, { useEffect, useState } from "react";
import "./index.css";
import LabelPost from "./labelPost";
function LabelOrders() {
  const [products, setProducts] = useState([]);
 
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("YOUR_API_ENDPOINT_HERE"); // Replace with your API endpoint
        if (response.ok) {
          const data = await response.json();
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


  return (
    <div>
      <h2>Orders List</h2>
      {/* <ul>
        {products.map((product) => (
          <div>
            <p>1</p>
            <p>soap 5GB Free online</p>
            <p>label</p>
            <p>2</p>
            <p>http://localhost:3000/get</p>
            <button>Accept</button>
            <button>decline</button>
          </div>
        ))}
      </ul> */}
      <div className="admin-orders-product-container">
        <p className="admin-orders-product-id">Order ID</p>
        <p className="admin-orders-product-name">Name</p>
        <p className="admin-orders-product-service">Service</p>
        <p className="admin-orders-product-quantity">Quantity</p>
        <p className="admin-orders-product-url">Order Tracking Link</p>
        <p>Label completed</p>
        <div className="admin-orders-product-buttons-container">
          {/* <button className="admin-orders-product-accept-button">Accept</button>
            <button className="admin-orders-product-decline-button">decline</button> */}
        </div>
      </div>
      <div className="admin-orders-product-container">
        <p className="admin-orders-product-id">1</p>
        <p className="admin-orders-product-name">soap 5GB Free online</p>
        <p className="admin-orders-product-service">label</p>
        <p className="admin-orders-product-quantity">2</p>
        <p className="admin-orders-product-url">http://localhost:3000/get</p>
        <LabelPost />
      </div>
      <div className="admin-orders-product-container">
        <p className="admin-orders-product-id">1</p>
        <p className="admin-orders-product-name">soap 5GB Free online</p>
        <p className="admin-orders-product-service">label</p>
        <p className="admin-orders-product-quantity">2</p>
        <p className="admin-orders-product-url">http://localhost:3000/get</p>
        <LabelPost />
      </div>
      <div className="admin-orders-product-container">
        <p className="admin-orders-product-id">1</p>
        <p className="admin-orders-product-name">soap 5GB Free online</p>
        <p className="admin-orders-product-service">label</p>
        <p className="admin-orders-product-quantity">2</p>
        <p className="admin-orders-product-url">http://localhost:3000/get</p>
        <LabelPost />
      </div>
    </div>
  );
}

export default LabelOrders;
