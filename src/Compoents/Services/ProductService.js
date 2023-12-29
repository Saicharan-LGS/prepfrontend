import React, { useState } from "react";
import Toast from "../utlis/toast";
 
const ProductService = ({ fetchProductServices }) => {
  const [formData, setFormData] = useState({
    category: "Product",
    name: "",
    price: 0,
  });
 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "price" ? parseFloat(value) : value,
    });
  };
 
  const FETCH_URL = process.env.REACT_APP_FETCH_URL;
 
  const handleSubmit = async (e) => {
    e.preventDefault();
 
    const token = sessionStorage.getItem("token"); // Assuming token is stored in sessionStorage
 
    try {
      const response = await fetch(`${FETCH_URL}add-productservice`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // You should include your authorization token here
        },
        body: JSON.stringify(formData),
      });
 
      if (!response.ok) {
        throw new Error("Failed to add product/service");
      }
 
      const data = await response.json();
      Toast.fire({
        icon: "success",
        title: data.message,
      });
      setFormData({
        category: "Product",
        name: "",
        price: 0,
      });
      fetchProductServices();
      console.log("Product/Service added successfully:", data);
    } catch (error) {
      console.error("Error adding product/service:", error.message);
      // Handle error or display a message to the user
    }
  };
 
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="category">Product and Services:</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            <option value="Product">Product</option>
            <option value="Service">Service</option>
          </select>
        </div>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
export default ProductService;