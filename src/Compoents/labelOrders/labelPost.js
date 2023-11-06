import { useState } from "react";

const LabelPost = ({ id }) => {
  const [product, setProduct] = useState(false);

  const handeSubmit = async (id, product1) => {
    try {
      const labelstatus = {
        status: product1,
      };
      const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InBrZ2FtaW5nLnByYXNoYW50aEBnbWFpbC5jb20iLCJpYXQiOjE2OTg5OTY5OTIsImV4cCI6MTY5OTI1NjE5Mn0.QQl3pQHzNWeNerlR5i2FLXr7xEPHvsjJ0jggaXNKiXQ"
         const response = await fetch(
        `http://localhost:3009/api/v1/labelorderlist/${id}`,
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
        console.log("Product updated successfully");
      } else {
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
      <button value={id} onClick={onClickSubmit} className="label-update-button">
        update
      </button>
    </>
  );
};

export default LabelPost;