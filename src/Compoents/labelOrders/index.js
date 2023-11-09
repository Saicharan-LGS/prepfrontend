import React, { useEffect, useState } from "react";
import "./index.css";
import LabelPost from "./labelPost";
import { useNavigate } from "react-router-dom";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";

import CommonNavbar from "../CommonNavbar";
import EmptyOrder from "../EmptyOrder";

function LabelOrders() {
  const [products, setProducts] = useState([]);
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
  const role = sessionStorage.getItem("role");
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = sessionStorage.getItem("token");
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

  const navigate = useNavigate();

  const openDetailPage = (e, productId) => {
    console.log(productId);
    navigate(`/viewDetailedorder/${productId}`);
  };

  const NextButton = indexOfLastProduct >= products.length? `pagination-button-next-button disable-previous-next-button`:`pagination-button-next-button`
  const previousButton = currentPage===1? `pagination-button-previous-button disable-previous-next-button`:`pagination-button-previous-button`



  return (
    <>
      {role==="Label" && <CommonNavbar /> }
      <div className="admin-order-accepted-product-list">
        <h2 className="admin-order-accepted-order-list-heading">Order List</h2>
        <div className="admin-order-accepted-category-types">
          <p className="admin-order-accepted-order-id-category">Order Id</p>
          <p className="admin-order-accepted-name-category">Name</p>
          <p className="admin-order-accepted-service-category">Product</p>
          <p className="admin-order-accepted-quantity-category">Quantity</p>
          <p className="admin-order-accepted-order-tracking-category">
            Order Tracking Link
          </p>
          {/* <p className="admin-order-accepted-decline-category">Decline</p>
        <p className="admin-order-accepted-accept-category">Accept</p> */}
          {/* <p className="admin-order-accepted-fnsku-category">FNSKU Status</p>
        <p className="admin-order-accepted-box-label-category">Box Label Status</p> */}
          <p className="admin-order-accepted-fnsku-category">Label Done</p>
          <p className="admin-order-accepted-view-in-detail-category">Update</p>
          <p className="admin-order-accepted-view-in-detail-category">
            View Detail
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
                    {eachProduct.product}
                  </p>
                  <p className="admin-order-accepted-quantity-sub-category">
                    {eachProduct.unit}
                  </p>
                  <p className="admin-order-accepted-order-tracking-sub-category">
                    {eachProduct.tacking_url}
                  </p>
                  {/* <button className="admin-order-accepted-received-button">Received</button>
          <button className="admin-order-accepted-declined-button">Decline</button> */}
                  {/* <div className="admin-order-accepted-fnsku-sub-category">
          <input type="checkbox" checked={eachProduct.fnsku_status=="1" ? true : false} className="admin-order-accepted-checkbox"/>
          </div>
          <div className="admin-order-accepted-box-label-sub-category">
        <input type="checkbox" checked={eachProduct.label_status=="1" ? true : false} className="admin-order-accepted-checkbox"/>
          </div> */}
                <LabelPost id={eachProduct.id} />
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
            <BsFillArrowLeftCircleFill
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className={previousButton}
            />

            <span>Page {currentPage}</span>

            <BsFillArrowRightCircleFill
              onClick={() => paginate(currentPage + 1)}
              disabled={indexOfLastProduct >= products.length}
              className={NextButton}
            />
          </div>
        </>
      ) : (
        <EmptyOrder />
      )}
    </div>
    </>
  );
}

export default LabelOrders;
