

import React, { useEffect, useState } from "react";
import "./index.css";
import { useNavigate } from "react-router-dom";
//import { AiFillCaretRight } from "react-icons/ai";
import {BsFillArrowRightCircleFill} from 'react-icons/bs'

function AdminOrdersRejected() {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();
    console.log("Component rendered");
    useEffect(() => {
        console.log("reject called")
      const fetchProducts = async () => {
        try {
          const response = await fetch(
            `http://localhost:3009/api/v1/getOrders/${1}`
          ); // Replace with your API endpoint
          if (response.ok) {
            console.log(response);
            const data = await response.json();
            console.log(data.results);
            setProducts(data.results);
          } else {
            console.error("Failed to fetch products");
          }
        } catch (error) {
          console.error("Error fetching products:", error);
        }
      };
      fetchProducts();
    },[] );
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // Month is zero-based, so add 1
    const day = date.getDate();
    console.log(products)
    const formattedDate = `${year}-${month.toString().padStart(2, "0")}-${day
      .toString()
      .padStart(2, "0")}`;
    console.log(formattedDate);
    const openDetailPage = (e) => {
    
  
      navigate(`/adminViewDetail/${e.target.id}`);
    };
    return(
      <div className="admin-order-accepted-product-list">
        <h2 className="admin-order-accepted-order-list-heading">Order List</h2>
        <div className="admin-order-accepted-category-types">
          <p className="admin-order-accepted-order-id-category">Order Id</p>
          <p className="admin-order-accepted-name-category">Name</p>
          <p className="admin-order-accepted-service-category">Service</p>
          <p className="admin-order-accepted-quantity-category">Quantity</p>
          <p className="admin-order-accepted-order-tracking-category">Order Tracking Link</p>
          {/* <p className="admin-order-accepted-decline-category">Decline</p>
          <p className="admin-order-accepted-accept-category">Accept</p> */}
          <p className="admin-order-accepted-fnsku-category">FNSKU Status</p>
          <p className="admin-order-accepted-box-label-category">Box Label Status</p>
          <p className="admin-order-accepted-view-in-detail-category">View In Detail</p>
        </div>
        {products.map(eachProduct=>{
          console.log(eachProduct.fnsku_status,eachProduct.label_status)
          return(
          <div className="admin-order-accepted-display-of-products-container">
            <p className="admin-order-accepted-order-id-sub-category">{eachProduct.id}</p>
            <p className="admin-order-accepted-name-sub-category">{eachProduct.name}</p>
            <p className="admin-order-accepted-service-sub-category">{eachProduct.service}</p>
            <p className="admin-order-accepted-quantity-sub-category">{eachProduct.unit}</p>
            <p className="admin-order-accepted-order-tracking-sub-category">{eachProduct.tacking_url}</p>
            {/* <button className="admin-order-accepted-received-button">Received</button>
            <button className="admin-order-accepted-declined-button">Decline</button> */}
            <div className="admin-order-accepted-fnsku-sub-category">
            <input type="checkbox" checked={eachProduct.fnsku_status=="1" ? true : false} className="admin-order-accepted-checkbox"/>
            </div>
            <div className="admin-order-accepted-box-label-sub-category">
          <input type="checkbox" checked={eachProduct.label_status=="1" ? true : false} className="admin-order-accepted-checkbox"/>
            </div>
            <BsFillArrowRightCircleFill id={eachProduct.id} value={eachProduct.id} onClick={openDetailPage} className="admin-order-accepted-view-in-detail-sub-category" />
          </div>
        )})}
      </div>
    )
}

export default AdminOrdersRejected;
