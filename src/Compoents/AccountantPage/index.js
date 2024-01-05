import React, { useEffect, useState } from "react";
import "./index.css";
import { useNavigate } from "react-router-dom";
import Toast from "../utlis/toast";
import {
  BsFillArrowRightCircleFill,
  BsFillArrowLeftCircleFill,
} from "react-icons/bs";
import CommonNavbar from "../CommonNavbar";
import EmptyOrder from "../EmptyOrder";
import { Box, Modal } from "@mui/material";
import GenerateInvoicePage from "../GenerateInvoicePage";

function AccountOrders({ openDetailPageComponent }) {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(10);
  const navigate = useNavigate();
  const role = sessionStorage.getItem("role");
  const [ErrorCard, setErrorCard] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const [isModalOpen, setModalOpen] = React.useState(false);
  const [invoiceOrders, setInvoiceOrders] = useState([]);
  console.log(invoiceOrders, "kapil invoice");

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  console.log(selectedIds, "selectedIds");
  const FETCH_URL = process.env.REACT_APP_FETCH_URL;

  const fetchProducts = async () => {
    try {
      const token = sessionStorage.getItem("token");
      const response = await fetch(`${FETCH_URL}accountantlist`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setProducts(data.data);
      } else {
        setErrorCard(true);
      }
    } catch (error) {
      setErrorCard(true);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const openDetailPage = (productId) => {
    if (role === "Admin") {
      openDetailPageComponent(productId);
    } else {
      navigate(`/viewDetailedorder/${productId}`);
    }
  };

  const AmountPost = ({ id }) => {
    const [amount1, setAmount] = useState("");
    const onChangeInput = (e) => {
      setAmount(e.target.value);
    };

    const handeSubmit = async (id, amount1) => {
      try {
        const amount2 = {
          amount: amount1,
        };
        const token = sessionStorage.getItem("token");
        const response = await fetch(`${FETCH_URL}amountUpdate/${id}`, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(amount2),
        });
        if (response.ok) {
          const data = await response.json();
          Toast.fire({
            icon: "success",
            title: data.message,
          });
          setAmount("");
          fetchProducts();
        } else {
          const data = await response.json();
          Toast.fire({
            icon: "error",
            title: data.message,
          });
        }
      } catch (error) {
        // Handle error
      }
    };

    const onSubmitFunction = () => {
      handeSubmit(id, amount1);
    };

    return (
      <>
        <div className="admin-order-accepted-enter-amount-input-container">
          <input
            className="admin-order-accepted-enter-amount-input-box"
            type="text"
            id={id}
            onChange={onChangeInput}
          />
        </div>

        <button
          onClick={onSubmitFunction}
          id={id}
          className="admin-order-accepted-received-button"
        >
          post
        </button>
      </>
    );
  };

  const handleCheckboxChange = (productId) => {
    setSelectedIds((prevSelectedIds) => {
      if (prevSelectedIds.includes(productId)) {
        // If the ID is already in the array, remove it
        return prevSelectedIds.filter((id) => id !== productId);
      } else {
        // If the ID is not in the array, add it
        return [...prevSelectedIds, productId];
      }
    });
  };

  const NextButton =
    indexOfLastProduct >= products.length
      ? "pagination-arrow-container disable-previous-next-button"
      : "pagination-arrow-container";
  const previousButton =
    currentPage === 1
      ? "pagination-arrow-container disable-previous-next-button"
      : "pagination-arrow-container";

  const generateInvoice = async () => {
    console.log(selectedIds,"kapikl");
    if (selectedIds < 1) {
      alert("Please Select atleast one order");
    } else {
      try {
        const token = sessionStorage.getItem("token");
        const response = await fetch(`${FETCH_URL}generateInvoices`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ selectedIds: selectedIds }),
        });
        if (response.ok) {
          const data = await response.json();
          Toast.fire({
            icon: "success",
            title: data.message,
          });
          setInvoiceOrders(data.orders);
          console.log(data.orders, "ordersdata");
          // fetchProducts();
          setModalOpen(true);
        } else {
          const data = await response.json();
          Toast.fire({
            icon: "error",
            title: data.message,
          });
        }
      } catch (error) {
        // Handle error
      }
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      {role === "Accountant" && <CommonNavbar />}
      <div className="admin-order-accepted-product-list">
        <div className="service-add-button-container">
          <h2 className="admin-order-accepted-order-list-heading">
            Invoice Pending Orders
          </h2>
          <button onClick={generateInvoice} className="service-add-button">
            Generate Invoice
          </button>
        </div>
        <div className="admin-order-accepted-table-container">
          <div className="admin-order-accepted-category-types">
            <p className="admin-order-accepted-order-id-category">Order Id</p>
            <p className="admin-order-accepted-name-category">Customer Name</p>
            <p className="admin-order-accepted-service-category">Product Name</p>
            <p className="admin-order-accepted-quantity-category">Quantity</p>
            <p className="admin-order-accepted-order-tracking-category">
              Order Tracking Link
            </p>
            <p className="admin-order-accepted-service-category">
              Enter Invoice
            </p>
            <p className="admin-order-accepted-view-in-detail-category">
              View In Detail
            </p>
          </div>
          {products.length > 0 && !ErrorCard && (
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
                      <p className="" tracking_url></p>
                    )}
                  </p>
                  <div className="admin-order-accepted-order-enter-amount">
                    <input
                      type="checkbox"
                      className="customer-list-table-row-input"
                      onChange={() => handleCheckboxChange(eachProduct.id)}
                      checked={selectedIds.includes(eachProduct.id)}
                    />
                  </div>

                  <BsFillArrowRightCircleFill
                    id={eachProduct.id}
                    value={eachProduct.id}
                    onClick={() => openDetailPage(eachProduct.id)}
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
          )}
          {ErrorCard && <EmptyOrder />}
        </div>
      </div>
      <Modal
        open={isModalOpen}
        onClose={handleCloseModal}
        style={{ width: "100%" }}
      >
        <Box
          sx={{
            position: "absolute",
            width: "70%",
            top: "50%",
            left: "50%",
            height: "500px",
            overflow: "scroll",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            borderRadius: "8px",
            p: 3,
          }}
        >
          <GenerateInvoicePage
            onClose={handleCloseModal}
            fetchProducts={fetchProducts}
            data={invoiceOrders}
          />
        </Box>
      </Modal>
    </>
  );
}

export default AccountOrders;
