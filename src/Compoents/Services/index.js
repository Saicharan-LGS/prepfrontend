import React, { useState, useEffect, useRef } from "react";
 
import Modal from "react-modal";
import ProductService from "./ProductService";
const customStyles = {
  content: {
    top: "50%",
    height: "200px",
    width: "400px",
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
  }
 
  const FETCH_URL = process.env.REACT_APP_FETCH_URL;
 
  const fetchProductServices = async () => {
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
 
  return (
    <div>
      <h2>Product/Service List</h2>
      <button onClick={openModal}>Add</button>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <button onClick={closeModal}>close</button>
        <ProductService fetchProductServices={fetchProductServices} />
      </Modal>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Date & Time</th>
            <th>Status</th> {/* Adding a new column for status */}
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
                <input
                  type="checkbox"
                  checked={service.status === 1} // Assuming status value of 1 means checked
                  disabled={true} // To disable editing, change this as needed
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};