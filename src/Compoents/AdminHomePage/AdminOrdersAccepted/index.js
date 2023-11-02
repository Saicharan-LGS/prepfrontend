

import React, { useEffect, useState } from "react";
import "./index.css";
import { useNavigate } from "react-router-dom";
import { AiFillCaretRight } from "react-icons/ai";
function AdminOrdersAccepted() {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();
    console.log("Component rendered");
    useEffect(() => {
        console.log("reject called")
      const fetchProducts = async () => {
        try {
          const response = await fetch(
            `http://localhost:3009/api/v1/getOrders/${2}`
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
      console.log(e);
      console.log(e.target.id);
  
      navigate(`/adminViewDetail/${e.target.id}`);
    };
  //   return (
  //     <div>
  //       <h2>Orders List</h2>
  //       {/* <ul>
  //         {products.map((product) => (
  //           <div>
  //             <p>1</p>
  //             <p>soap 5GB Free online</p>
  //             <p>label</p>
  //             <p>2</p>
  //             <p>http://localhost:3000/get</p>
  //             <button>Accept</button>
  //             <button>decline</button>
  //           </div>
  //         ))}
  //       </ul> */}
  //       <div className="admin-orders-product-container">
  //         <p className="admin-orders-product-id">Order ID</p>
  //         <p className="admin-orders-product-name">Name</p>
  //         <p className="admin-orders-product-service">Service</p>
  //         <p className="admin-orders-product-quantity">Quantity</p>
  //         <p className="admin-orders-product-url">Order Tracking Link</p>
  //         <div className="admin-orders-product-buttons-container">
  //           {/* <button className="admin-orders-product-accept-button">Accept</button>
  //             <button className="admin-orders-product-decline-button">decline</button> */}
  //         </div>
  //         <div>View in Detail</div>
  //       </div>
  //       {products.map(eachProduct=>(
  //         <div className="admin-orders-product-container">
  //         <p className="admin-orders-product-id">{eachProduct.id}</p>
  //         <p className="admin-orders-product-name">{eachProduct.name}</p>
  //         <p className="admin-orders-product-service">{eachProduct.service}</p>
  //         <p className="admin-orders-product-quantity">{eachProduct.unit}</p>
  //         <p className="admin-orders-product-url">{eachProduct.tacking_url}</p>
          
  //         <AiFillCaretRight id={eachProduct.id} value={eachProduct.id} onClick={openDetailPage} />
  //       </div>
  //       ))
  //       }
        
        
  //     </div>
  // );
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
      {products.map(eachProduct=>(
        <div className="admin-order-accepted-display-of-products-container">
          <p className="admin-order-accepted-order-id-sub-category">{eachProduct.id}</p>
          <p className="admin-order-accepted-name-sub-category">{eachProduct.name}</p>
          <p className="admin-order-accepted-service-sub-category">{eachProduct.service}</p>
          <p className="admin-order-accepted-quantity-sub-category">{eachProduct.unit}</p>
          <p className="admin-order-accepted-order-tracking-sub-category">{eachProduct.tacking_url}</p>
          {/* <button className="admin-order-accepted-received-button">Received</button>
          <button className="admin-order-accepted-declined-button">Decline</button> */}
          <div className="admin-order-accepted-fnsku-sub-category">
            {eachProduct.fnsku_status==="0"?<input type="checkbox" className="admin-order-accepted-checkbox"/>:<input type="checkbox" checked className="admin-order-accepted-checkbox"/>}
          </div>
          <div className="admin-order-accepted-box-label-sub-category">
          {eachProduct.label_status==="0"?<input type="checkbox" className="admin-order-accepted-checkbox"/>:<input type="checkbox" checked className="admin-order-accepted-checkbox"/>}
          </div>
          <AiFillCaretRight id={eachProduct.id} value={eachProduct.id} onClick={openDetailPage} className="admin-order-accepted-view-in-detail-sub-category" />
        </div>
      ))}
    </div>
  )
}

export default AdminOrdersAccepted;
