import React, { useState, useEffect, useRef } from "react";
import Modal from "react-modal";
import ProductService from "./ProductService";
import Toast from "../utlis/toast";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import { ImCancelCircle } from "react-icons/im";
import "./index.css";
import { RiEditBoxLine } from "react-icons/ri";
import ProductServiceEdit from "./productserviceedit";
import Spinner from "../Spinner";

const customStyles = {
  content: {
    top: "50%",
    height: "320px",
    width: "250px",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#root");

export const ProductServiceList = () => {
  const subtitleRef = useRef(null);
  const [productServices, setProductServices] = useState([]);
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editId, setEditId] = useState();
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(10);
  const [orderId, setOrderId] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    if (subtitleRef.current) {
      subtitleRef.current.style.color = "#f00";
    }
  }
  function closeModal() {
    setIsOpen(false);
    setEditModalOpen(false);
  }
  useEffect(() => {
    const filtered = productServices.filter((product) => {
      const productIdMatch = product.id.toString().includes(orderId);
      const productNameMatch = product.name.toLowerCase().includes(orderId);
      return productIdMatch || productNameMatch;
    });

    setFilteredProducts(filtered);
  }, [productServices, orderId, currentPage]);

  const FETCH_URL = process.env.REACT_APP_FETCH_URL;
  const fetchProductServices = async () => {
    try {
      const response = await fetch(`${FETCH_URL}productservicelist`);
      if (!response.ok) {
        setLoading(false);
        setProductServices([]);
        throw new Error("Failed to fetch product/services");
      }
      const data = await response.json();
      setLoading(false);
      setProductServices(data.productServices);
    } catch (error) {
      setLoading(false);
      setProductServices([]);
    }
  };

  useEffect(() => {
    fetchProductServices();
  }, []);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleToggle = async (id, currentStatus) => {
    try {
      const token = sessionStorage.getItem("token");
      const response = await fetch(`${FETCH_URL}updateServiceStatus/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: !currentStatus }),
      });

      if (response.ok) {
        response.json().then((data) => {
          Toast.fire({
            icon: "success",
            title: data.message,
          });
        });
        fetchProductServices();
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

  const handleView = (id) => {
    setEditModalOpen(true);
    setEditId(id);
  };

  const NextButton =
    indexOfLastProduct >= filteredProducts.length
      ? `pagination-arrow-container disable-previous-next-button`
      : `pagination-arrow-container`;
  const previousButton =
    currentPage === 1
      ? `pagination-arrow-container disable-previous-next-button`
      : `pagination-arrow-container`;
  const handleSearch = (e) => {
    setOrderId(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div style={{ margin: "15px", marginTop: "0px" }}>
      <div className="service-add-button-container">
        <h2
          style={{ marginLeft: "50px" }}
          className="product-service-list-heading"
        >
          Product/Service List
        </h2>
        <input
          type="text"
          name="orderid"
          value={orderId}
          onChange={handleSearch}
          placeholder="Search by Name / Service ID"
          required
          className="admin-order-accepted-search-filter-input"
          style={{ padding: "10px" }}
        />
        <button
          className="service-add-button"
          style={{ marginRight: "50px" }}
          onClick={openModal}
        >
          Add
        </button>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <ImCancelCircle onClick={closeModal} className="model-close-icon" />
        <ProductService fetchProductServices={fetchProductServices} />
      </Modal>
      <Modal
        isOpen={editModalOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <ImCancelCircle onClick={closeModal} className="model-close-icon" />
        <ProductServiceEdit
          id={editId}
          fetchProductServices={fetchProductServices}
          onClose={closeModal}
        />
      </Modal>
      {loading ? (
        <Spinner />
      ) : (
        <div className="admin-order-accepted-table-container">
          <div
            className="admin-order-accepted-category-types"
            style={{ fontWeight: "600" }}
          >
            <p className="customer-list-table-row">ID</p>
            <p className="customer-list-table-row">Product Name</p>
            <p className="customer-list-table-row">Category</p>
            <p className="customer-list-table-row">Price</p>
            <p className="customer-list-table-row">Date & Time</p>
            <p className="customer-list-table-row">Enable/Disable</p>
            <p className="customer-list-table-row">Edit</p>
          </div>
          {currentProducts.map((eachProduct) => {
            return (
              <div
                className="admin-order-accepted-display-of-products-container"
                key={eachProduct.id}
              >
                <p className="customer-list-table-row">{eachProduct.id}</p>
                <p className="customer-list-table-row">{eachProduct.name}</p>
                <p className="customer-list-table-row">
                  {eachProduct.category}
                </p>
                <p className="customer-list-table-row">{eachProduct.price}</p>
                <p className="customer-list-table-row">
                  {new Date(eachProduct.data_time).toLocaleString()}
                </p>
                <div className="customer-list-table-row">
                  <input
                    className="customer-list-table-row-input"
                    type="checkbox"
                    checked={eachProduct.status === 1 ? true : false}
                    onChange={() =>
                      handleToggle(eachProduct.id, eachProduct.status === 1)
                    } // Assuming status value of 1 means checked
                  />
                </div>
                <RiEditBoxLine
                  id={eachProduct.id}
                  value={eachProduct.id}
                  className="customer-list-view-icon"
                  onClick={() => handleView(eachProduct.id)}
                />
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
              disabled={indexOfLastProduct >= productServices.length}
              className={NextButton}
            />
          </div>
        </div>
      )}
    </div>
  );
};
