import React, { useState } from "react";
import "./index.css";

const Customersignup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="customer-signin-form-main-container">
      <center>
        <h2 className="customer-signin-form-heading-container">
          Customer Sign In
        </h2>
      </center>
      <form onSubmit={handleSubmit} className="customer-singin-form-container">
        <div className="customer-signin-form-group-container">
          <label className="customer-singnin-form-lable-container">Name:</label>
          <input
            type="text"
            name="name"
            className="customer-signin-input-container"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="customer-signin-form-group-container">
          <label className="customer-singnin-form-lable-container">
            Email:
          </label>
          <input
            type="email"
            name="email"
            className="customer-signin-input-container"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="customer-signin-form-group-container">
          <label className="customer-singnin-form-lable-container">
            Password:
          </label>
          <input
            type="password"
            name="password"
            className="customer-signin-input-container"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
        </div>
        <center>
          <button
            className="customer-signin-form-button-container"
            type="submit"
          >
            Sign In
          </button>
        </center>
      </form>
    </div>
  );
};

export default Customersignup;
