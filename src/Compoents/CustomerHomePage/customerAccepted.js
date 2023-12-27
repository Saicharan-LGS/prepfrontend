import React, { useEffect, useState } from "react";
import "./index.css";
import { useNavigate } from "react-router-dom";
//import { AiFillCaretRight } from "react-icons/ai";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import Spinner from "../Spinner";
import EmptyOrder from "../EmptyOrder";
function CustomerAccepted({ openDetailPage }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(10);
  const [orderId, setOrderId] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const filtered = products.filter((product) => {
      const productIdMatch = product.id.toString().includes(orderId);
      const productNameMatch = product.name.toLowerCase().includes(orderId);
      return productIdMatch || productNameMatch;
  });


    setFilteredProducts(filtered);
  }, [products, orderId, currentPage]);

  
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const handleSearch = (e) => {
    setOrderId(e.target.value);
    setCurrentPage(1); // Reset pagination when changing search filter
  };
  // Number of products to display per page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const FETCH_URL = process.env.REACT_APP_FETCH_URL

  useEffect(() => {
    const fetchProducts = async () => {
      const token = sessionStorage.getItem("token");
      try {
        const response = await fetch(
          `${FETCH_URL}customerorderlist/${6}`,
          // Replace with your API endpoint
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          setProducts(data.results);
          setLoading(false);
        } else {
          setTimeout(() => {
            setLoading(false);
          }, 3000);
          
        }
      } catch (error) {
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      }
    };
    fetchProducts();
  }, []);


  const NextButton =
    indexOfLastProduct >= filteredProducts.length
      ? `pagination-arrow-container disable-previous-next-button`
      : `pagination-arrow-container`;
  const previousButton =
    currentPage === 1
      ? `pagination-arrow-container disable-previous-next-button`
      : `pagination-arrow-container`;

  return (
    <>
    {loading?<Spinner/>:
    <div className="admin-order-accepted-product-list">
      <h2 className="admin-order-accepted-order-list-heading">
        Invoice Accepted Order List
      </h2>
      <input
            type="text"
            name="orderid"
            value={orderId}
            onChange={handleSearch}
            placeholder="Search by Name / Order ID"
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
        <p className="admin-order-accepted-fnsku-category">Amount</p>

        <p className="admin-order-accepted-view-in-detail-category">
          View In Detail
        </p>
      </div>
      {filteredProducts.length > 0 ? (
        <>
          {currentProducts.map((eachProduct) => {
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
                      {eachProduct.tracking_url ? (
                        <a
                          href={eachProduct.tracking_url}
                          rel="noreferrer"
                          target="_blank"
                          className="tracking-url"
                        >
                          Order Link
                        </a>
                      ) : (
                        <p className="tracking_url"> </p>
                      )}
                    </p> <p className="admin-order-accepted-fnsku-sub-category">
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
      }
    </>
  );
}

export default CustomerAccepted;
