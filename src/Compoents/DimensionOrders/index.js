import React, { useEffect, useState } from "react";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import "../AdminDetailPage/index.css";
import { useNavigate } from "react-router-dom";
//import { AiFillCaretRight } from "react-icons/ai";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";

import EmptyOrder from "../EmptyOrder";
import CommonNavbar from "../CommonNavbar";
import DimensionsUpdate from "../DimensionsUpdate";
function DimensionOrderList({openDetailPageComponent}) {
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
  const role = sessionStorage.getItem("role");

  const FETCH_URL = process.env.REACT_APP_FETCH_URL
  


  const fetchProducts = async () => {
    try {
      const token = sessionStorage.getItem("token");
      const response = await fetch(
        `${FETCH_URL}dimensionorderlist`,
        {
          method: "GET",
          headers: {
            Authorization: ` Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        setProducts(data.data);
      } else {
        setProducts([])
      }
    } catch (error) {
      setProducts([])
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // Month is zero-based, so add 1
  const day = date.getDate();

  const formattedDate = `${year}-${month.toString().padStart(2, "0")}-${day
    .toString()
    .padStart(2, "0")}`;

  const dimensionUpadate = (id) => {
    navigate(`/dimensionupdate/${id}`);
  };

  const openDetailPage = (productId) => {
    if (role==="Admin"){
      openDetailPageComponent(productId)
    }else{
    navigate(`/viewDetailedorder/${productId}`);
    }
  };

  const NextButton = indexOfLastProduct >= products.length? `pagination-arrow-container disable-previous-next-button`:`pagination-arrow-container`
  const previousButton = currentPage===1? `pagination-arrow-container disable-previous-next-button`:`pagination-arrow-container`

  return (
    <>
    {role==="Dimension" && <CommonNavbar /> }
    <div className="admin-order-accepted-product-list">
      <h2 className="admin-order-accepted-order-list-heading">Dimensions Order List</h2>
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
        <p className="admin-order-accepted-view-in-detail-category">
          Update 
        </p>
        <p className="admin-order-accepted-accept-category">View Details</p>
      </div>
      {products.length > 0 ? (
        <>
          {currentProducts.map((eachProduct) => (
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
                      {eachProduct.tracking_url ? <a
                        href={eachProduct.tracking_url}
                        rel="noreferrer"
                        target="_blank"
                        className="tracking-url"
                      >
                        Order Link
                      </a> : <p className=""tracking_url> </p> }
                    </p>
              {/* <button className="admin-order-accepted-received-button">Received</button>
          <button className="admin-order-accepted-declined-button">Decline</button> */}
              {/* <div className="admin-order-accepted-fnsku-sub-category">
            {eachProduct.fnsku_status==="0"?<input type="checkbox" className="admin-order-accepted-checkbox"/>:<input type="checkbox" checked className="admin-order-accepted-checkbox"/>}
          </div>
          <div className="admin-order-accepted-box-label-sub-category">
          {eachProduct.label_status==="0"?<input type="checkbox" className="admin-order-accepted-checkbox"/>:<input type="checkbox" checked className="admin-order-accepted-checkbox"/>}
          </div> */}
              {/* <button
                className="admin-order-accepted-received-button"
                onClick={() => dimensionUpadate(eachProduct.id)}
              >
                Update
              </button> */}
              <Popup contentStyle={{ width: '400px', padding: '20px' }}  trigger={<button onClick={() => dimensionUpadate(eachProduct.id)}  className="admin-order-accepted-received-button"> Update</button>} position="left center">
                <DimensionsUpdate id={eachProduct.id} fetchProducts={fetchProducts} />
              </Popup>
              <BsFillArrowRightCircleFill
                id={eachProduct.id}
                value={eachProduct.id}
                onClick={(e) => openDetailPage(eachProduct.id)}
                className="admin-order-accepted-view-in-detail-sub-category"
              />
            </div>
          ))}
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

export default DimensionOrderList;
