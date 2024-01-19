import React, { useEffect, useState } from "react";
import "./index.css";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import Spinner from "../Spinner";
import DispatchButton from "./DispatchButton";
import EmptyOrder from "../EmptyOrder";
import { Box, Modal } from "@mui/material";
import CustomerInvoicePage from "../CustomerInvoicePage";
import CommonNavbar from "../CommonNavbar";
function Dispatch() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(10); // Number of products to display per page
  const [orderId, setOrderId] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedOrders, setSelectedOrders] = useState();
  const [totalAmount, setTotalAmount] = useState("");
  const [discount, setDiscount] = useState("");
  const [discountedAmount, setDiscountedAmount] = useState("");
  const [invoiceStatusFilter, setInvoiceStatusFilter] = useState(6);

  useEffect(() => {
    const filtered = products.filter((product) => {
      const statusMatch =
        product.invoice_status === invoiceStatusFilter.toString();
      const productIdMatch = product.orders.toString().includes(orderId);
      return productIdMatch && statusMatch;
    });

    setFilteredProducts(filtered);
  }, [products, orderId, invoiceStatusFilter, currentPage]);

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
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const FETCH_URL = process.env.REACT_APP_FETCH_URL;
  const role = sessionStorage.getItem("role");
  const fetchProducts = async () => {
    const token = sessionStorage.getItem("token");
    try {
      const response = await fetch(`${FETCH_URL}getdispatch`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();

        setProducts(data);
        setLoading(false);
      } else {
        setTimeout(() => {
          setLoading(false);
          setProducts([]);
        }, 3000);
      }
    } catch (error) {
      setTimeout(() => {
        setLoading(false);
        setProducts([]);
      }, 3000);
    }
  };
  useEffect(() => {
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

  const handleView = (each) => {
    setSelectedOrders(each.orders);
    setDiscount(each.discount);
    setDiscountedAmount(each.discounted_amount);
    setTotalAmount(each.totalamount);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };
  const setStatus = (status, id) => {
    if (status === "5") {
      return (
        <p className="admin-order-accepted-quantity-sub-category">
          Invoice generated
        </p>
      );
    } else if (status === "6") {
      return (
        <p className="admin-order-accepted-quantity-sub-category">
          Invoice Accepted
        </p>
      );
    } else if (status === "7") {
      return (
        <p className="admin-order-accepted-quantity-sub-category">
          Invoice Rejected
        </p>
      );
    } else {
      return (
        <p className="admin-order-accepted-quantity-sub-category">Dispatched</p>
      );
    }
  };

  return (
    <>
      {role === "Dispatch" && <CommonNavbar />}
      {loading ? (
        <Spinner />
      ) : (
        <div className="admin-order-accepted-product-list">
          <h2 className="admin-order-accepted-order-list-heading">
            Dispatching Orders
          </h2>
          <div className="admin-order-accepted-search-filter-input-container">
            <input
              type="number"
              name="orderid"
              value={orderId}
              onChange={handleSearch}
              placeholder="Search by Order ID"
              required
              className="admin-order-accepted-search-filter-input"
            />
            <select
              value={invoiceStatusFilter}
              onChange={(e) => setInvoiceStatusFilter(e.target.value)}
              className="admin-order-accepted-search-filter-input"
            >
              <option value={8}>Dispatched</option>
              <option value={5}>Invoice Generated</option>
              <option value={6}>Invoice Accepted</option>
              <option value={7}>Invoice Rejected</option>
            </select>
          </div>
          <div className="admin-order-accepted-table-container">
            <div className="admin-order-accepted-category-types">
              <p className="admin-order-accepted-order-id-category">
                Order Id's
              </p>
              <p className="admin-order-accepted-name-category">Total Amount</p>
              <p className="admin-order-accepted-service-category">
                Discount(%)
              </p>
              <p className="admin-order-accepted-quantity-category">
                Final Amount
              </p>
              <p className="admin-order-accepted-accept-category">Status</p>
              <p className="admin-order-accepted-decline-category">Dispatch</p>
              <p className="admin-order-accepted-view-in-detail-category">
                View
              </p>
            </div>
            {filteredProducts.length > 0 ? (
              <>
                {currentProducts.map((eachProduct) => {
                  return (
                    <div className="admin-order-accepted-display-of-products-container">
                      <p className="admin-order-accepted-order-id-sub-category">
                        {JSON.parse(eachProduct.orders).join(", ")}
                      </p>
                      <p className="admin-order-accepted-name-sub-category">
                        {eachProduct.totalamount}
                      </p>
                      <p className="admin-order-accepted-service-sub-category">
                        {eachProduct.discount}
                      </p>
                      <p className="admin-order-accepted-quantity-sub-category">
                        {eachProduct.discounted_amount}
                      </p>
                      {setStatus(
                        eachProduct.invoice_status,
                        eachProduct.orders
                      )}

                      <DispatchButton
                        status={eachProduct.invoice_status}
                        orderIds={eachProduct.orders}
                        id={eachProduct.id}
                        fetchProducts={fetchProducts}
                      />
                      <BsFillArrowRightCircleFill
                        id={eachProduct.id}
                        value={eachProduct.id}
                        className="admin-order-accepted-view-in-detail-sub-category"
                        onClick={() => handleView(eachProduct)}
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
        </div>
      )}
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
          <CustomerInvoicePage
            selectedOrders={selectedOrders}
            onClose={handleCloseModal}
            fetchProducts={fetchProducts}
            totalAmount={totalAmount}
            discount={discount}
            discountedAmount={discountedAmount}
          />
        </Box>
      </Modal>
    </>
  );
}

export default Dispatch;
