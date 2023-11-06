import { useState } from "react";

const CustomerButton = ({ id, amount }) => {
  const [product, setProduct] = useState("1"); // Set the initial value as a string '1'
  const token = sessionStorage.getItem('token');
  const handleSubmit = async (id, status) => {
    // Create an object with the data you want to send
    const requestData = {
      status: status,
    };
    console.log(requestData);
    try {
      console.log(requestData);
      const response = await fetch(
        `http://localhost:3009/api/v1/adminUpdateOrderStatus/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData), // Stringify the data
        }
      );

      if (response.ok) {
        console.log("Product updated successfully");
      } else {
        console.error("Failed to update product");
      }
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const handleSubmit1 = async () => {
    console.log("called", id, amount);
    try {
      const amount2 = {
        amount: amount,
      };
      const response = await fetch(
        `http://localhost:3009/api/v1/acceptOrder/${id}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(amount2),
        }
      );

      if (response.ok) {
        console.log("Product updated successfully");
      } else {
        console.error("Failed to updated product");
      }
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const onClickDecline = (e) => {
    const status = "1"; // Set the status here
    handleSubmit(e.target.value, status);
    window.location.reload();
  };

  const onClickReceived = (e) => {
    const status = "2"; // Set the status here
    console.log("Received called");
    handleSubmit1(e.target.value, status);
    // window.location.reload();
  };

  return (
    <>
      <button
        value={id}
        onClick={onClickDecline}
        className="admin-order-accepted-declined-button"
      >
        Decline
      </button>
      <button
        value={id}
        onClick={onClickReceived}
        className="admin-order-accepted-received-button"
      >
        Accept
      </button>
    </>
  );
};

export default CustomerButton;
