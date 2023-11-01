import React, { useEffect, useState } from "react";
import "../AdminDetailPage/index.css";
import { useNavigate } from "react-router-dom";
import { AiFillCaretRight } from "react-icons/ai";

function DimensionOrderList() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token =
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InByYXNoYW50aHJlZGR5Nzc5OTU1QGdtYWlsLmNvbSIsImlhdCI6MTY5ODgzMTA3NSwiZXhwIjoxNjk4ODM0Njc1fQ.I1acr2Zd7rIEhVF2TXrzz_W0S6wTjEWIjoLaG2lLWtk";
        const response = await fetch(
          "http://localhost:3009/api/v1/dimensionorderlist",
          {
            method: "GET",
            headers: {
              Authorization:` Bearer ${token}`,
            },
          }
        );
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
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // Month is zero-based, so add 1
  const day = date.getDate();

  const formattedDate = `${year}-${month.toString().padStart(2, "0")}-${day
    .toString()
    .padStart(2, "0")}`;
  console.log(formattedDate);

  const openDetailPage = (e) => {
    console.log(e);
    console.log(e.target.id);

    navigate(`/dimensionupdate/${e.target.id}`);
  };
  return (
    <div>
      <h2>Orders List</h2>
      <div className="admin-orders-product-container">
        <p className="admin-orders-product-id">Order ID</p>
        <p className="admin-orders-product-name">Name</p>
        <p className="admin-orders-product-service">Service</p>
        <p className="admin-orders-product-quantity">Quantity</p>
        <p className="admin-orders-product-url">Order Tracking Link</p>
        <div className="admin-orders-product-buttons-container"></div>
        <div>View in Detail</div>
      </div>
      <div className="admin-orders-product-container">
        <p className="admin-orders-product-id">1</p>
        <p className="admin-orders-product-name">soap 5GB Free online</p>
        <p className="admin-orders-product-service">label</p>
        <p className="admin-orders-product-quantity">2</p>
        <p className="admin-orders-product-url">http://localhost:3000/get</p>
        <AiFillCaretRight id="1" value="1" onClick={openDetailPage} />
      </div>
      <div className="admin-orders-product-container">
        <p className="admin-orders-product-id">1</p>
        <p className="admin-orders-product-name">soap 5GB Free online</p>
        <p className="admin-orders-product-service">label</p>
        <p className="admin-orders-product-quantity">2</p>
        <p className="admin-orders-product-url">http://localhost:3000/get</p>

        <AiFillCaretRight id="2" value="2" onClick={openDetailPage} />
      </div>
      <div className="admin-orders-product-container">
        <p className="admin-orders-product-id">1</p>
        <p className="admin-orders-product-name">soap 5GB Free online</p>
        <p className="admin-orders-product-service">label</p>
        <p className="admin-orders-product-quantity">2</p>
        <p className="admin-orders-product-url">http://localhost:3000/get</p>
        <AiFillCaretRight id="3" value="3" onClick={openDetailPage} />
      </div>
    </div>
  );
}

export default DimensionOrderList;