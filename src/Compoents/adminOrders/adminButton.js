import { useState } from "react";

const DisplayAdminButton = (props) => {
  const [product, setProduct] = useState("1"); // Set the initial value as a string '1'

  const handleSubmit = async (id, status) => {
    // Create an object with the data you want to send
    const requestData = {
      status: status,
    };

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

  const onClickDecline = (e) => {
    const status = "1"; // Set the status here
    handleSubmit(e.target.value, status);
  };

  const onClickReceived = (e) => {
    const status = "2"; // Set the status here
    console.log("Received called");
    handleSubmit(e.target.value, status);
  };

  return (
    <div className="admin-orders-product-buttons-container">
      <button
        value={props.id}
        onClick={onClickDecline}
        className="admin-orders-product-decline-button"
      >
        Decline
      </button>
      <button
        value={props.id}
        onClick={onClickReceived}
        className="admin-orders-product-decline-button"
      >
        Received
      </button>
    </div>
  );
};

export default DisplayAdminButton;
