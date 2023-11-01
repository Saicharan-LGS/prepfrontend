import { useState } from "react";

const LabelPost = ({ id }) => {
  const [product, setProduct] = useState(false);

  const handeSubmit = async (id, product1) => {
    try {
      const labelstatus = {
        status: product1,
      };
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InByYXNoYW50aHJlZGR5Nzc5OTU1QGdtYWlsLmNvbSIsImlhdCI6MTY5ODg0MzM1MSwiZXhwIjoxNjk4ODQ2OTUxfQ.qY0HyB1okjLH7WTag225rLM_5djc-W9kheSjbxAOA1o";
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
      <input
        type="checkbox"
        id="myCheckbox"
        name="myCheckbox"
        onChange={onChangeCheckBox}
        checked={product}
        value="checkValue"
      />
      <button value={id} onClick={onClickSubmit}>
        update
      </button>
    </>
  );
};

export default LabelPost;