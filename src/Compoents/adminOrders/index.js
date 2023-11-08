import React, { useEffect, useState } from "react";
import "./index.css";
import { useNavigate } from "react-router-dom";
//import { AiFillCaretRight } from "react-icons/ai";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import EmptyOrder from "../EmptyOrder";

import DisplayAdminButton from "./adminButton";
function ProductList() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Number of products per page
  const navigate = useNavigate();
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
      try {
        const token = sessionStorage.getItem("token");
        const response = await fetch(
          `http://localhost:3009/api/v1/getOrders/${0}`,
          {
            method: "GET",
            headers: {
              Authorization: ` Bearer ${token}`,
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
  console.log(products);

  const openDetailPage = (e, productId) => {
    console.log(productId);
    navigate(`/adminViewDetail/${productId}`);
  };

  const refreshpage = () => {
    window.location.reload();
  };

  const totalPages = Math.ceil(products.length / itemsPerPage);

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
        <p className="admin-order-accepted-decline-category">Decline</p>
        <p className="admin-order-accepted-accept-category">Accept</p>
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
            console.log("called");
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
                <DisplayAdminButton id={eachProduct.id} />
                {/* <button className="admin-order-accepted-received-button" onClick={refreshpage}>Received</button>
          <button className="admin-order-accepted-declined-button" onClick={refreshpage}>Decline</button> */}
                <div className="admin-order-accepted-fnsku-sub-category">
                  <input
                    type="checkbox"
                    checked={eachProduct.fnsku_status === 1 ? true : false}
                    className="admin-order-accepted-checkbox"
                  />
                </div>
                <div className="admin-order-accepted-box-label-sub-category">
                  <input
                    type="checkbox"
                    checked={eachProduct.label_status === 1 ? true : false}
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
          <div className="pagination">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span>Page {currentPage}</span>
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={indexOfLastProduct >= products.length}
            >
              Next
            </button>
          </div>
        </>
      ) : (
        <EmptyOrder />
      )}
      {totalPages > 1 && (
        <div className="pagination">
          <button
            onClick={() => setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span>{currentPage}</span>
          <button
            onClick={() => setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default ProductList;
