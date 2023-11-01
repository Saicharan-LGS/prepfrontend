import React, { useEffect, useState } from "react";
import "./index.css";
import LabelPost from "./labelPost";
function LabelOrders() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token =
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InByYXNoYW50aHJlZGR5Nzc5OTU1QGdtYWlsLmNvbSIsImlhdCI6MTY5ODgzNTk0OSwiZXhwIjoxNjk4ODM5NTQ5fQ.0WmNeySXWTeMNvMwXe5bb1IxdNaocRSIcoEokUgYDAY";
        const response = await fetch(
          "http://localhost:3009/api/v1/labelorderlist",
          {
            method: "GET",
            headers: {
              Authorization: ` Bearer ${token}`,
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

  return (
    <div>
      <h2>Orders List</h2>
      <div className="admin-orders-product-container">
        <p className="admin-orders-product-id">Order ID</p>
        <p className="admin-orders-product-name">Name</p>
        <p className="admin-orders-product-service">Service</p>
        <p className="admin-orders-product-quantity">Quantity</p>
        <p className="admin-orders-product-url">Order Tracking Link</p>
        <p>Label completed</p>
        <div className="admin-orders-product-buttons-container"></div>
      </div>
      <div className="admin-orders-product-container">
        <p className="admin-orders-product-id">1</p>
        <p className="admin-orders-product-name">soap 5GB Free online</p>
        <p className="admin-orders-product-service">label</p>
        <p className="admin-orders-product-quantity">2</p>
        <p className="admin-orders-product-url">http://localhost:3000/get</p>
        <LabelPost id="1" />
      </div>
      <div className="admin-orders-product-container">
        <p className="admin-orders-product-id">1</p>
        <p className="admin-orders-product-name">soap 5GB Free online</p>
        <p className="admin-orders-product-service">label</p>
        <p className="admin-orders-product-quantity">2</p>
        <p className="admin-orders-product-url">http://localhost:3000/get</p>
        <LabelPost id="2" />
      </div>
      <div className="admin-orders-product-container">
        <p className="admin-orders-product-id">1</p>
        <p className="admin-orders-product-name">soap 5GB Free online</p>
        <p className="admin-orders-product-service">label</p>
        <p className="admin-orders-product-quantity">2</p>
        <p className="admin-orders-product-url">http://localhost:3000/get</p>
        <LabelPost id="3" />
      </div>
    </div>
  );
}

export default LabelOrders;