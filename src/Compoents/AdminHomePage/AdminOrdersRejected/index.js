import React, { useEffect, useState } from "react";
import "./index.css";
import { useNavigate } from "react-router-dom";
//import { AiFillCaretRight } from "react-icons/ai";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";


import EmptyOrder from "../../EmptyOrder";

function AdminOrdersRejected() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(10); // Number of products to display per page
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    console.log("reject called");
    const fetchProducts = async () => {
      try {
        const token = sessionStorage.getItem("token");
        const response = await fetch(
          `http://localhost:3009/api/v1/getOrders/${0}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
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
  }, []);
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // Month is zero-based, so add 1
  const day = date.getDate();
  console.log(products);
  const formattedDate = `${year}-${month.toString().padStart(2, "0")}-${day
    .toString()
    .padStart(2, "0")}`;
  console.log(formattedDate);
  const openDetailPage = (e, productId) => {
    console.log(productId);
    navigate(`/adminViewDetail/${productId}`);
  };

  const NextButton = indexOfLastProduct >= products.length? `pagination-button-next-button disable-previous-next-button`:`pagination-button-next-button`
  const previousButton = currentPage===1? `pagination-button-previous-button disable-previous-next-button`:`pagination-button-previous-button`

  return (
    <div className="admin-order-accepted-product-list">
      <h2 className="admin-order-accepted-order-list-heading">Order List</h2>
      <div className="admin-order-accepted-category-types">
        <p className="admin-order-accepted-order-id-category">Order Id</p>
        <p className="admin-order-accepted-name-category">Name</p>
        <p className="admin-order-accepted-service-category">Service</p>
        <p className="admin-order-accepted-quantity-category">Quantity</p>
        <p className="admin-order-accepted-order-tracking-category">
          Order Tracking Link
        </p>
        {/* <p className="admin-order-accepted-decline-category">Decline</p>
          <p className="admin-order-accepted-accept-category">Accept</p> */}
        <p className="admin-order-accepted-fnsku-category">FNSKU Status</p>
        <p className="admin-order-accepted-box-label-category">
          Box Label Status
        </p>
        <p className="admin-order-accepted-view-in-detail-category">
          View In Detail
        </p>
      </div>
      {products.length > 0 ? (
        <>
          {currentProducts.map((eachProduct) => {
            console.log(eachProduct.fnsku_status, eachProduct.label_status);
            return (
              <div className="admin-order-accepted-display-of-products-container">
                <p className="admin-order-accepted-order-id-sub-category">
                  {eachProduct.id}
                </p>
                <p className="admin-order-accepted-name-sub-category">
                  {eachProduct.name}
                </p>
                <p className="admin-order-accepted-service-sub-category">
                  {eachProduct.service}
                </p>
                <p className="admin-order-accepted-quantity-sub-category">
                  {eachProduct.unit}
                </p>
                <p className="admin-order-accepted-order-tracking-sub-category">
                  {eachProduct.tracking_url}
                </p>
                {/* <button className="admin-order-accepted-received-button">Received</button>
            <button className="admin-order-accepted-declined-button">Decline</button> */}
                <div className="admin-order-accepted-fnsku-sub-category">
                  <input
                    type="checkbox"
                    checked={eachProduct.fnsku_status === "1" ? true : false}
                    className="admin-order-accepted-checkbox"
                  />
                </div>
                <div className="admin-order-accepted-box-label-sub-category">
                  <input
                    type="checkbox"
                    checked={eachProduct.label_status === "1" ? true : false}
                    className="admin-order-accepted-checkbox"
                  />
                </div>
                <BsFillArrowRightCircleFill
                  id={eachProduct.id}
                  value={eachProduct.id}
                  onClick={(e) => openDetailPage(e, eachProduct.id)}
                  className="admin-order-accepted-view-in-detail-sub-category"
                />
              </div>
            );
          })}
          <div className="pagination-button-container">
           
           <BsFillArrowLeftCircleFill className="pagination-arrow-container"/>
          
           <span>Page {currentPage}</span>
          
          <BsFillArrowRightCircleFill className="pagination-arrow-container"/>
       
         </div>
        </>
      ) : (
        <EmptyOrder />
      )}
    </div>
  );
}

export default AdminOrdersRejected;
