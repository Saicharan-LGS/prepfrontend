import React, { useEffect, useState } from "react";
import "../AdminDetailPage/index.css";
import { useNavigate } from "react-router-dom";
//import { AiFillCaretRight } from "react-icons/ai";
import {BsFillArrowRightCircleFill} from 'react-icons/bs'
import EmptyOrder from "../EmptyOrder";

function DimensionOrderList() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = sessionStorage.getItem("token");
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
          console.log(data)
          setProducts(data.data);
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

  const dimensionUpadate = (id) => {
    navigate(`/dimensionupdate/${id}`);
  };

  const openDetailPage = (e, productId) => {
    console.log(productId);
    navigate(`/viewDetailedorder/${productId}`);
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
        {/* <p className="admin-order-accepted-fnsku-category">FNSKU Status</p>
        <p className="admin-order-accepted-box-label-category">Box Label Status</p> */}
        <p className="admin-order-accepted-view-in-detail-category">Update Dim/wt</p>
        <p className="admin-order-accepted-accept-category">View Details</p>
      </div>
      {products.length>0?
      <>
      {products.map(eachProduct=>(
        <div className="admin-order-accepted-display-of-products-container">
          <p className="admin-order-accepted-order-id-sub-category">{eachProduct.id}</p>
          <p className="admin-order-accepted-name-sub-category">{eachProduct.name}</p>
          <p className="admin-order-accepted-service-sub-category">{eachProduct.service}</p>
          <p className="admin-order-accepted-quantity-sub-category">{eachProduct.unit}</p>
          <p className="admin-order-accepted-order-tracking-sub-category">{eachProduct.tacking_url}</p>
          {/* <button className="admin-order-accepted-received-button">Received</button>
          <button className="admin-order-accepted-declined-button">Decline</button> */}
          {/* <div className="admin-order-accepted-fnsku-sub-category">
            {eachProduct.fnsku_status==="0"?<input type="checkbox" className="admin-order-accepted-checkbox"/>:<input type="checkbox" checked className="admin-order-accepted-checkbox"/>}
          </div>
          <div className="admin-order-accepted-box-label-sub-category">
          {eachProduct.label_status==="0"?<input type="checkbox" className="admin-order-accepted-checkbox"/>:<input type="checkbox" checked className="admin-order-accepted-checkbox"/>}
          </div> */}
          <button className="admin-order-accepted-received-button" onClick={()=>dimensionUpadate(eachProduct.id)}>Update</button>
          <BsFillArrowRightCircleFill
            id={eachProduct.id}
            value={eachProduct.id}
            onClick={(e) => openDetailPage(e, eachProduct.id)}
            className="admin-order-accepted-view-in-detail-sub-category"
          />
        </div>
      ))}</>:<EmptyOrder/>}
    </div>
  )
}

export default DimensionOrderList;