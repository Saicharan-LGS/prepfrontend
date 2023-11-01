import { useState } from "react";

const DisplayAdminButton = (props) => {
  const [product, setProduct] = useState(); // Set the initial value as a string '1'

  const handleSubmit = async (id) => {
    // Create an object with the data you want to send
    const requestData = {
      status: product,
    };

    try {
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
    setProduct("1");
    handleSubmit(e.target.value);
  };

  const onClickRecieved = (e) => {
    setProduct("2");
    handleSubmit(e.target.value)
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
        onClick={onClickRecieved}
        className="admin-orders-product-decline-button"
      >
        Recieved
      </button>
    </div>
  );
};

export default DisplayAdminButton;
