import { useState } from "react";

const LabelPost = () => {
  const [product, setProduct] = useState(false);

  const handeSubmit = async (id, product1) => {
    console.log(product1);
    try {
      const response = await fetch(
        `http://localhost:3000/updateproduct/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(product1),
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
      <button value="1" onClick={onClickSubmit}>
        update
      </button>
    </>
  );
};

export default LabelPost;
