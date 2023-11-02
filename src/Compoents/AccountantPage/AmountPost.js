import { useState } from "react";

const AmountPost = ({ id }) => {
  const [amount1, setAmount] = useState();
  const onChangeInput = (e) => {
    setAmount(e.target.value);
  };
  const onSubmitFunction = (e) => {
    handeSubmit(e.target.id, amount1);
  };
  const handeSubmit = async (id, amount1) => {
    console.log("called",id, amount1)
    try {
      const amount2 = {
        amount: amount1,
      };
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InBrZ2FtaW5nLnByYXNoYW50aEBnbWFpbC5jb20iLCJpYXQiOjE2OTg5MTkzMjcsImV4cCI6MTY5ODkyMjkyN30.pYGaT86LRWBD5evUUbWXgJurVSf0JmpqDBz-vdb6xTQ";
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
        console.log("Product updated successfully");
      } else {
        console.error("Failed to updated product");
      }
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <>
      <input type="text" id={id} onChange={onChangeInput} />
      <button onClick={onSubmitFunction} id={id}>
        post
      </button>
    </>
  );
};

export default AmountPost;
