import React, { useEffect, useState } from "react";
import "./index.css";
import { useNavigate } from "react-router-dom";
//import { AiFillCaretRight } from "react-icons/ai";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";


import CustomerButton from "./customerButton";
import EmptyOrder from "../EmptyOrder";
function CustomerHomePage() {
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
    const fetchProducts = async () => {
      const token = sessionStorage.getItem("token");
      try {
        const response = await fetch(
          `http://localhost:3009/api/v1/customerorderlist/${5}`,
          // Replace with your API endpoint
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
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
  console.log(products);

  const openDetailPage = (id) => {
    console.log("called");
    console.log("Clicked on item with id:", id);
    // console.log(`/adminViewDetail/${e.target.id}`)

    if (id) {
      navigate(`/adminViewDetail/${id}`);
    } else {
      console.error("Invalid id:", id);
    }
  };

  // const refreshpage=()=>{
  //   window.location.reload()
  // }

  const NextButton = indexOfLastProduct >= products.length? `pagination-button-next-button disable-previous-next-button`:`pagination-button-next-button`
  const previousButton = currentPage===1? `pagination-button-previous-button disable-previous-next-button`:`pagination-button-previous-button`


  return (
    <div className="admin-order-accepted-product-list">
      <h2 className="admin-order-accepted-order-list-heading">
        Pending Order List
      </h2>
      <div className="admin-order-accepted-category-types">
        <p className="admin-order-accepted-order-id-category">Order Id</p>
        <p className="admin-order-accepted-name-category">Name</p>
        <p className="admin-order-accepted-service-category">Service</p>
        <p className="admin-order-accepted-quantity-category">Quantity</p>
        <p className="admin-order-accepted-order-tracking-category">
          Order Tracking Link
        </p>
        <p className="admin-order-accepted-decline-category">Decline</p>
        <p className="admin-order-accepted-accept-category">Accept</p>
        <p className="admin-order-accepted-fnsku-category">Amount</p>

        <p className="admin-order-accepted-view-in-detail-category">
          View In Detail
        </p>
      </div>
      {products.length > 0 ? (
        <>
          {currentProducts.map((eachProduct) => {
            console.log("called");
            console.log(eachProduct.id);
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
                <CustomerButton
                  id={eachProduct.id}
                  amount={eachProduct.amount}
                />
                {/* <button className="admin-order-accepted-received-button" onClick={refreshpage}>Received</button>
          <button className="admin-order-accepted-declined-button" onClick={refreshpage}>Decline</button> */}
                <p className="admin-order-accepted-fnsku-sub-category">
                  {eachProduct.amount}
                </p>

                <BsFillArrowRightCircleFill
                  id={eachProduct.id}
                  value={eachProduct.id}
                  onClick={() => openDetailPage(eachProduct.id)}
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

export default CustomerHomePage;
