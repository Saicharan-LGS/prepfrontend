import React, { useState, useEffect, useRef } from "react";

import Modal from "react-modal";
import ProductService from "./ProductService";
import Toast from "../utlis/toast";
import { ImCancelCircle } from "react-icons/im";
import './index.css'
import { RiEditBoxLine } from "react-icons/ri";
import ProductServiceEdit from "./productserviceedit";

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

  const [editModalOpen,setEditModalOpen] = useState(false)
  const [editId,setEditId] = useState()

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
    setEditModalOpen(false)
  }

  const FETCH_URL = process.env.REACT_APP_FETCH_URL;

  const fetchProductServices = async () => {
    console.log("called");
    try {
      const response = await fetch(`${FETCH_URL}productservicelist`);
      if (!response.ok) {
        throw new Error("Failed to fetch product/services");
      }
      const data = await response.json();
      setProductServices(data.productServices);
    } catch (error) {
      console.error("Error fetching product/services:", error.message);
      // Handle error or display a message to the user
    }
  };

  useEffect(() => {
    fetchProductServices();
  }, []);

  const handleToggle = async (id, currentStatus) => {
    console.log(currentStatus);
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
        // Handle success, maybe update the local state
        console.log("User status updated successfully");
        response.json().then((data) => {
          Toast.fire({
            icon: "success",
            title: data.message,
          });
        });
        fetchProductServices();
        // You may want to update the local state here if needed
      } else {
        response.json().then((data) => {
          Toast.fire({
            icon: "error",
            title: data.message,
          });
        });
        console.error("Failed to update user status");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleView=(id)=>{
    setEditModalOpen(true)
    setEditId(id)
  }

  return (
    <div>
      <div className="service-add-button-container">
          <h2 className="product-service-list-heading">Product/Service List</h2>
          <button className="service-add-button" onClick={openModal}>Add</button>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
  
      >
        <ImCancelCircle onClick={closeModal} className="model-close-icon"/>
        <ProductService fetchProductServices={fetchProductServices} />
      </Modal>
      <Modal
        isOpen={editModalOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
  
      >
        <ImCancelCircle onClick={closeModal} className="model-close-icon"/>
        <ProductServiceEdit id={editId} fetchProductServices={fetchProductServices} onClose={closeModal} />
      </Modal>
      <div className="admin-order-accepted-table-container">
          <div className="admin-order-accepted-category-types">
            <p className="customer-list-table-row">ID</p>
            <p className="customer-list-table-row">Customer Name</p>
            <p className="customer-list-table-row">Category</p>
            <p className="customer-list-table-row">Price</p>
            <p className="customer-list-table-row">Date & Time</p>
            <p className="customer-list-table-row">Status</p>
            <p className="customer-list-table-row">Edit</p>
          </div>

  
              {productServices.map((eachProduct) => {
                return (
                  <div
                    className="admin-order-accepted-display-of-products-container"
                    key={eachProduct.id}
                  >
                    <p className="customer-list-table-row">{eachProduct.id}</p>
                    <p className="customer-list-table-row">
                      {eachProduct.name}
                    </p>
                    <p className="customer-list-table-row">
                      {eachProduct.category}
                    </p>
                    <p className="customer-list-table-row">
                      {eachProduct.price}
                    </p>
                    <p className="customer-list-table-row">
                      {new Date(eachProduct.data_time).toLocaleString()}
                    </p>
                    <div className="customer-list-table-row">
                      <input

                        className="customer-list-table-row-input"
                        type="checkbox"
                        checked={eachProduct.status === 1 ? true : false}
                        onChange={() =>
                          handleToggle(
                            eachProduct.id,
                            eachProduct.status === 1,
                          )}// Assuming status value of 1 means checked
                        
                      />
                    </div>
                    <RiEditBoxLine
                        id={eachProduct.id}
                        value={eachProduct.id}
                        className="customer-list-view-icon"
                        onClick={()=>handleView(eachProduct.id)}
                      />
                
                  </div>
                );
              }
              )}

            </div>
          
      {/* <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Date & Time</th>
            <th>Status</th> 
          </tr>
        </thead>
        <tbody>
          {productServices.map((service) => (
            <tr key={service.id}>
              <td>{service.id}</td>
              <td>{service.name}</td>
              <td>{service.category}</td>
              <td>{service.price}</td>
              <td>{new Date(service.data_time).toLocaleString()}</td>
              <td>
                {console.log(service.status)}
                <input
                  type="checkbox"
                  checked={service.status === 1 ? true : false}
                  onChange={() =>
                    handleToggle(service.id, service.status === 1)
                  }
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table> */}
    </div>
  );
};
