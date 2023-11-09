import { useState } from "react";
import Toast from "../utlis/toast";
import { useNavigate } from "react-router-dom";
const AmountPost = ({ id, fetchProducts }) => {
  const [amount1, setAmount] = useState();
  const navigate = useNavigate();
  const onChangeInput = (e) => {
    setAmount(e.target.value);
  };
  const onSubmitFunction = (e) => {
    handeSubmit(e.target.id, amount1);
  };
  const handeSubmit = async (id, amount1) => {
    console.log("called", id, amount1);
    const role = sessionStorage.getItem("role");
    try {
      const amount2 = {
        amount: amount1,
      };
      const token = sessionStorage.getItem("token");
      const response = await fetch(
        `http://localhost:3009/api/v1/amountUpdate/${id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(amount2),
        }
      );

      if (response.ok) {
        response.json().then((data) => {
          // Store the token in sessionStorage
          Toast.fire({
            icon: "success",
            title: data.message,
          });
        });

        console.log("Product updated successfully");
        if (role === "Admin") {
          fetchProducts();
        } else {
          fetchProducts();
          navigate("/accountOrders");
        }
      } else {
        response.json().then((data) => {
          // Store the token in sessionStorage
          Toast.fire({
            icon: "error",
            title: data.message,
          });
        });
        console.error("Failed to updated product");
      }
    } catch (error) {
      console.error("Error updating product:", error);
    }
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

export default AmountPost;
