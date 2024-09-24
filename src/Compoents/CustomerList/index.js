import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import React, { useEffect, useState } from "react";
import { AiFillMinusCircle, AiFillPlusCircle } from "react-icons/ai";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { RiEditBoxLine } from "react-icons/ri";
import Spinner from "../Spinner";
import Toast from "../utlis/toast";

import AddAmountCustomer from "./AddAmount";
import AddDiscountCustomer from "./AddDiscount";
import EditCustomerDetails from "./EditCustomer";
import "./index.css";
import WalletRemove from "./WalletRemove";

function CustomerList() {
  const [isModalOpen, setModalOpen] = React.useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(10);
  const [orderId, setOrderId] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [amountId, setAmountId] = useState("");
  const FETCH_URL = process.env.REACT_APP_FETCH_URL;
  const [discountModel, setDiscountModel] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [editCustomerId, setEditCustomerId] = useState("");
  const [isRemoveModalOpen, setRemoveModalOpen] = useState(false);
  const handleCloseModal = () => {
    setModalOpen(false);
    setDiscountModel(false);
    setEditModalOpen(false);
    setRemoveModalOpen(false);
  };

  const handleRemove = (id) => {
    setAmountId(id);
    setRemoveModalOpen(true);
  };

  const handleEdit = (id) => {
    setEditCustomerId(id);
    setEditModalOpen(true);
  };

  const handleToggle = async (id, currentStatus) => {
    try {
      const token = sessionStorage.getItem("token");
      const response = await fetch(`${FETCH_URL}update-customer-status/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: !currentStatus }),
      });

      if (response.ok) {
        // Handle success, maybe update the local state

        response.json().then((data) => {
          Toast.fire({
            icon: "success",
            title: data.message,
          });
        });
        fetchProducts();

        // You may want to update the local state here if needed
      } else {
        response.json().then((data) => {
          Toast.fire({
            icon: "error",
            title: data.message,
          });
        });
      }
    } catch (error) {}
  };

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

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const fetchProducts = async () => {
    try {
      const token = sessionStorage.getItem("token");
      const response = await fetch(`${FETCH_URL}customersList`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setProducts(data.staffMembers);
        setLoading(false);
      } else {
        setTimeout(() => {
          setLoading(false);
          setProducts([]);
        }, 3000);
      }
    } catch (error) {
      setTimeout(() => {
        setProducts([]);
        setLoading(false);
      }, 3000);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSearch = (e) => {
    setOrderId(e.target.value);
    setCurrentPage(1);
  };

  const NextButton =
    indexOfLastProduct >= filteredProducts.length
      ? `pagination-arrow-container disable-previous-next-button`
      : `pagination-arrow-container`;
  const previousButton =
    currentPage === 1
      ? `pagination-arrow-container disable-previous-next-button`
      : `pagination-arrow-container`;

  const onclickaddamount = (id) => {
    setAmountId(id);
    setModalOpen(true);
  };

  const onclickaddDiscount = (e) => {
    setAmountId(e.target.value);
    setDiscountModel(true);
  };

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className="admin-order-accepted-product-list">
          <h2 className="admin-order-accepted-order-list-heading">
            Customer List
          </h2>
          <input
            type="text"
            name="orderid"
            value={orderId}
            onChange={handleSearch}
            placeholder="Search by Name / Order ID"
            required
            className="admin-order-accepted-search-filter-input"
            style={{ padding: "10px" }}
          />
          <div className="admin-order-accepted-table-container">
            <div
              className="admin-order-accepted-category-types"
              style={{ fontWeight: "600" }}
            >
              <p className="customer-list-table-row" style={{ width: "10%" }}>
                Customer Id
              </p>
              <p className="customer-list-table-row" style={{ width: "25%" }}>
                Customer Name<span>(Group Name)</span>
              </p>
              <p className="customer-list-table-row" style={{ width: "35%" }}>
                Email
              </p>
              <p className="customer-list-table-row" style={{ width: "10%" }}>
                Status
              </p>
              <p className="customer-list-table-row">Balance</p>
              <p className="customer-list-table-row" style={{ width: "10%" }}>
                Discount
              </p>
              <p className="customer-list-table-row"> Amount</p>
              <p className="customer-list-table-row">Add Discount</p>
              <p className="customer-list-table-row" style={{ width: "10%" }}>
                Edit Customer
              </p>
            </div>

            {filteredProducts.length > 0 ? (
              <>
                {currentProducts.map((eachProduct) => {
                  return (
                    <div
                      className="admin-order-accepted-display-of-products-container"
                      key={eachProduct.id}
                    >
                      <p
                        className="customer-list-table-row"
                        style={{ width: "10%" }}
                      >
                        {eachProduct.id}
                      </p>
                      <p
                        className="customer-list-table-row"
                        style={{ width: "25%" }}
                      >
                        {eachProduct.name}
                        {eachProduct.whatsapp_group_name && (
                          <span>({eachProduct.whatsapp_group_name})</span>
                        )}
                      </p>
                      <p
                        className="customer-list-table-row"
                        style={{ width: "35%" }}
                      >
                        {eachProduct.email}
                      </p>
                      <div
                        className="customer-list-table-row"
                        style={{ width: "10%" }}
                      >
                        <input
                          type="checkbox"
                          className="customer-list-table-row-input"
                          checked={eachProduct.status === 1 ? true : false}
                          onChange={() =>
                            handleToggle(
                              eachProduct.id,
                              eachProduct.status === 1
                            )
                          }
                        />
                      </div>
                      <p className="customer-list-table-row">
                        {eachProduct.balance ? eachProduct.balance : 0}
                      </p>
                      <p
                        className="customer-list-table-row"
                        style={{ width: "10%" }}
                      >
                        {eachProduct.discount ? eachProduct.discount : 0}
                      </p>
                      <div
                        className="customer-list-table-row"
                        style={{ flexDirection: "row" }}
                      >
                        <AiFillPlusCircle
                          style={{
                            color: "#008000",
                            backgroundColor: "#fff",
                            fontSize: 30,
                          }}
                          onClick={() => onclickaddamount(eachProduct.id)}
                        />

                        <AiFillMinusCircle
                          style={{
                            color: "red",
                            backgroundColor: "#fff",
                            fontSize: 30,
                          }}
                          value={eachProduct.id}
                          onClick={() => handleRemove(eachProduct.id)}
                        />
                      </div>
                      <div className="customer-list-table-row">
                        <button
                          value={eachProduct.id}
                          onClick={onclickaddDiscount}
                          className="customer-list-amount-button"
                        >
                          Add
                        </button>
                      </div>
                      <div
                        className="customer-list-table-row"
                        style={{ width: "10%" }}
                      >
                        <RiEditBoxLine
                          style={{ width: 45 }}
                          onClick={() => handleEdit(eachProduct.id)}
                          className="customer-list-view-icon"
                        />
                      </div>
                    </div>
                  );
                })}
                <div className="pagination-button-container">
                  <BsFillArrowLeftCircleFill
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage <= 1}
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
              <h5> No Customers</h5>
            )}
          </div>
          <Modal
            open={isModalOpen}
            onClose={handleCloseModal}
            style={{ width: "100%" }}
          >
            <Box
              sx={{
                position: "absolute",
                width: "400px",
                top: "50%",
                left: "50%",
                height: "max-content",
                transform: "translate(-50%, -50%)",
                bgcolor: "background.paper",
                borderRadius: "8px",
                p: 3,
              }}
            >
              <AddAmountCustomer
                id={amountId}
                fetchProducts={fetchProducts}
                onClose={handleCloseModal}
              />
            </Box>
          </Modal>
          <Modal
            open={discountModel}
            onClose={handleCloseModal}
            style={{ width: "100%" }}
          >
            <Box
              sx={{
                position: "absolute",
                width: "300px",
                top: "50%",
                left: "50%",
                height: "max-content",
                transform: "translate(-50%, -50%)",
                bgcolor: "background.paper",
                borderRadius: "8px",
                p: 3,
              }}
            >
              <AddDiscountCustomer
                id={amountId}
                fetchProducts={fetchProducts}
                onClose={handleCloseModal}
              />
            </Box>
          </Modal>
          <Modal
            open={isEditModalOpen}
            onClose={handleCloseModal}
            style={{ width: "100%" }}
          >
            <Box
              sx={{
                position: "absolute",
                minWidth: "260px",
                top: "50%",
                left: "50%",

                transform: "translate(-50%, -50%)",
                bgcolor: "background.paper",
                borderRadius: "8px",
                p: 3,
              }}
            >
              <EditCustomerDetails
                id={editCustomerId}
                onClose={handleCloseModal}
                fetchProducts={fetchProducts}
              />
            </Box>
          </Modal>
          <Modal
            open={isRemoveModalOpen}
            onClose={handleCloseModal}
            style={{ width: "100%" }}
          >
            <Box
              sx={{
                position: "absolute",
                minWidth: "260px",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                bgcolor: "background.paper",
                borderRadius: "8px",
                p: 3,
              }}
            >
              <WalletRemove
                id={amountId}
                fetchProducts={fetchProducts}
                onClose={handleCloseModal}
              />
            </Box>
          </Modal>
        </div>
      )}
    </>
  );
}

export default CustomerList;
