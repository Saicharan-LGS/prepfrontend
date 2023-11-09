import { useState } from "react";
import Toast from "../utlis/toast";
const LabelPost = ({ id,fetchProducts }) => {
  const [product, setProduct] = useState(false);

  const handeSubmit = async (id, product1) => {
    try {
      const labelstatus = {
        status: product1,
      };
      const token = sessionStorage.getItem("token");
      const response = await fetch(
        `http://localhost:3009/api/v1/updatelabelorder/${id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(labelstatus),
        }
      );

      if (response.ok) {
        response.json().then((data) => {
          Toast.fire({
            icon: "success",
            title: data.message,
          })})
          fetchProducts()
        console.log("Product updated successfully");
      } else {
        response.json().then((data) => {
          Toast.fire({
            icon: "error",
            title: data.message,
          })})
          fetchProducts()
        console.error("Failed to updated product");
      }
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };
  const onChangeCheckBox = () => {
    setProduct(!product);
  };

  const onClickSubmit = (e) => {
    handeSubmit(e.target.value, product);
  };
  return (
    <>
      <div className="admin-order-accepted-fnsku-sub-category">
        <input
          type="checkbox"
          id="myCheckbox"
          name="myCheckbox"
          onChange={onChangeCheckBox}
          checked={product}
          value="checkValue"
          className="admin-order-accepted-checkbox"
        />
      </div>
      <button
        value={id}
        onClick={onClickSubmit}
        className="label-update-button"
      >
        update
      </button>
    </>
  );
};

export default LabelPost;
