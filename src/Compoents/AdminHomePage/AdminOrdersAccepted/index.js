import React, { useEffect, useState } from "react";
import "./index.css";
import { useNavigate } from "react-router-dom";
//import { AiFillCaretRight } from "react-icons/ai";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import EmptyOrder from "../../EmptyOrder";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import Spinner from "../../Spinner";
function AdminOrdersAccepted() {
  const [products, setProducts] = useState([]);
  const [loading,setLoading] = useState(true)
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

  console.log("Component rendered");
  useEffect(() => {
    console.log("reject called");
    const token = sessionStorage.getItem("token");
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `http://localhost:3009/api/v1/getOrders/${2}`, // Replace with your API endpoint
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
          setLoading(false)
        } else {
          console.error("Failed to fetch products");
          setTimeout(()=>{
            setLoading(false)
           },3000)
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        setTimeout(()=>{
          setLoading(false)
         },3000)
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

  const NextButton = indexOfLastProduct >= products.length? `pagination-arrow-container disable-previous-next-button`:`pagination-arrow-container`
  const previousButton = currentPage===1? `pagination-arrow-container disable-previous-next-button`:`pagination-arrow-container`

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
  return (
    <>
    {loading?<Spinner/>:
    <div className="admin-order-accepted-product-list">
      <h2 className="admin-order-accepted-order-list-heading">Accepted List</h2>
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
        <p className="admin-order-accepted-fnsku-category">FNSKU Status</p>
        <p className="admin-order-accepted-box-label-category">
          Box Label 
        </p>
        <p className="admin-order-accepted-view-in-detail-category">
          View In Detail
        </p>
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
              <p className="admin-order-accepted-order-tracking-sub-category"><a href={eachProduct.tracking_url} rel="noreferrer" target="_blank" className="tracking-url" >
                  Order Link
                </a>
              </p>
              {/* <button className="admin-order-accepted-received-button">Received</button>
          <button className="admin-order-accepted-declined-button">Decline</button> */}
              <div className="admin-order-accepted-fnsku-sub-category">
                {eachProduct.fnsku_status === 0 ? (
                  <input
                    type="checkbox"
                    className="admin-order-accepted-checkbox"
                  />
                ) : (
                  <input
                    type="checkbox"
                    checked
                    className="admin-order-accepted-checkbox"
                  />
                )}
              </div>
              <div className="admin-order-accepted-box-label-sub-category">
                {eachProduct.label_status === 0 ? (
                  <input
                    type="checkbox"
                    className="admin-order-accepted-checkbox"
                  />
                ) : (
                  <input
                    type="checkbox"
                    checked
                    className="admin-order-accepted-checkbox"
                  />
                )}
              </div>
              <BsFillArrowRightCircleFill
                id={eachProduct.id}
                value={eachProduct.id}
                onClick={(e) => openDetailPage(e, eachProduct.id)}
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
    }
    </>
  );
}

export default AdminOrdersAccepted;
