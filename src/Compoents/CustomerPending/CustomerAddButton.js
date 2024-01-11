import Toast from "../utlis/toast";
import React, { useState } from 'react'
import ReceivedQuantity from "../ReceivedQuantity";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

const CustomerAddButton = (props) => {
  const [isModalOpen, setModalOpen] = React.useState(false);

  const [admin,setAdmin] = useState("")

  const handleSubmit = async (id, status, unit) => {
    // Create an object with the data you want to send
    const requestData = {
      admin: admin,
    };
    const token = sessionStorage.getItem("token");
    try {
      const response = await fetch(
        `${process.env.REACT_APP_FETCH_URL}updateCustomerAdminById/${id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData), // Stringify the data
        }
      );

      if (response.ok) {
        const data = await response.json();
        Toast.fire({
          icon: "success",
          title: data.message,
        });
        props.fetchProducts();
      } else {
      }
    } catch (error) {}
  };

  const onClickDecline = (e) => {
    const status = false;
    setAdmin(false)
    handleSubmit(e.target.value, status);
  };

  const onClickReceived = (e) => {
    setAdmin(true)
    setModalOpen(true);
    const status = true;
    handleSubmit(e.target.value, status); // Set the status here
  };

  

  return (
    <>
      <button
        value={props.id}
        onClick={onClickReceived}
        className="admin-order-accepted-received-button"
      >
        Accept
      </button>
      <button
        value={props.id}
        onClick={onClickDecline}
        className="admin-order-accepted-declined-button"
      >
        Decline
      </button>
     
    </>
  );
};

export default CustomerAddButton;




