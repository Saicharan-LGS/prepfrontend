import React, { useEffect, useState } from "react";
import "../adminOrders/index.css";
import "./index.css";
import { useNavigate } from "react-router-dom";
//import { AiFillCaretRight } from "react-icons/ai";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import {BsFillArrowLeftCircleFill} from "react-icons/bs"
import EmptyOrder from "../EmptyOrder";

import DisplayAdminButton from "../adminOrders/adminButton";
function ViewAllOrders() {
  const [products, setProducts] = useState([]);
  const [orderId, setOrderId] = useState("");
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
      try {
        const token = sessionStorage.getItem("token");
        const response = await fetch(
          `http://localhost:3009/api/v1/getOrders/${8}`,
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

  const handleSearch = (e) => {
    setOrderId(e.target.value);
  };

  // Filter products based on orderId
  const filteredProducts = products.filter((product) => {
    return product.id.toString().includes(orderId);
  });

  const NextButton = indexOfLastProduct >= products.length? `pagination-button-next-button disable-previous-next-button`:`pagination-button-next-button`
  const previousButton = currentPage===1? `pagination-button-previous-button disable-previous-next-button`:`pagination-button-previous-button`

  const statusLabels = {
    0: "Pending",
    1: "Rejected",
    2: "Received",
    3: "Dimension",
    4: "Label",
    5: "Invoice",
    6: "Invoice Accepted",
    7: "Invoice Rejected",
  };

  return (
    <div className="admin-order-accepted-product-list">
      <h2 className="admin-order-accepted-order-list-heading">All Orders</h2>
      <input
        type="number"
        name="orderid"
        value={orderId}
        onChange={handleSearch}
        placeholder="Search by Order ID" // Add a placeholder for the input
        required
        className="admin-order-accepted-search-filter-input"
      />
      <div className="admin-order-accepted-category-types">
        <p className="admin-order-accepted-order-id-category">Order Id</p>
        <p className="admin-order-accepted-name-category">Name</p>
        <p className="admin-order-accepted-service-category">Product</p>
        <p className="admin-order-accepted-quantity-category">Quantity</p>
        <p className="admin-order-accepted-order-tracking-category">
          Order Tracking Link
        </p>
        <p className="admin-order-accepted-fnsku-category">Status</p>
        <p className="admin-order-accepted-fnsku-category">Amount</p>
        {/* <p className="admin-order-accepted-fnsku-category">FNSKU Status</p>
        <p className="admin-order-accepted-box-label-category">
          Box Label Status
        </p>
        <p className="admin-order-accepted-view-in-detail-category">
          View In Detail
        </p>
        <p className="admin-order-accepted-box-label-category">
          Box Label Status
        </p> */}
        <p className="admin-order-accepted-view-in-detail-category">
          View In Detail
        </p>
      </div>

      {filteredProducts.length > 0 ? (
        <>
          {filteredProducts.map((eachProduct) => {
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
                  {eachProduct.product}
                </p>
                <p className="admin-order-accepted-quantity-sub-category">
                  {eachProduct.unit}
                </p>
                <p className="admin-order-accepted-order-tracking-sub-category"><a href={eachProduct.tracking_url} rel="noreferrer" target="_blank" className="tracking-url" >
                  Order Link
                </a>
                </p>
                  
                
                {/* <DisplayAdminButton id={eachProduct.id} />
                <button className="admin-order-accepted-received-button" onClick={refreshpage}>Received</button>
          <button className="admin-order-accepted-declined-button" onClick={refreshpage}>Decline</button>
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
                </div> */}
                <p className="admin-order-accepted-quantity-sub-category">
                  {statusLabels[eachProduct.status] || "Unknown Status"}
                </p>
                <p className="admin-order-accepted-quantity-sub-category">
                  {eachProduct.amount}
                </p>
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

export default ViewAllOrders;
