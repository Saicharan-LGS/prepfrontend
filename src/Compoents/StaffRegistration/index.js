import React, { useState } from "react";
import "./index.css";

const StaffSignupPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    password: "",
    email: "",
    role: "Admin",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Define the URL of your server's registration endpoint
    const url = "http://localhost:3009/api/v1/staffregistration";

    // Create a JSON object with the form data
    const jsonData = {
      name: formData.name,
      password: formData.password,
      email: formData.email,
      role: formData.role,
    };

    // Make a POST request using the fetch API with JSON data
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Set the Content-Type to JSON
      },
      body: JSON.stringify(jsonData), // Convert JSON object to string
    })
      .then((response) => {
        if (response.status === 201) {
          // Registration successful
          console.log("Staff Registered successfully");
        } else {
          // Handle other status codes or error messages
          console.error("Registration failed");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="signup-div-container">
    <div className="signup-main-form-container">
      <center>
        <h2 className="signup-form-heading-container">Signup</h2>
      </center>
      <form onSubmit={handleSubmit} className="signup-form-container">
        <div className="signup-whole-form-contaner">
          <label className="signup-form-lable-container">Name:</label>
          <input
            type="text"
            name="name"
            className="signin-input-text"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="signup-whole-form-contaner">
          <label className="signup-form-lable-container">Password:</label>
          <input
            type="password"
            name="password"
            className="signin-input-text"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="signup-whole-form-contaner">
          <label className="signup-form-lable-container">Email:</label>
          <input
            type="email"
            name="email"
            className="signin-input-text"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="signup-whole-form-contaner">
          <label className="signup-form-lable-container">Role:</label>
          <select
            name="role"
            className="signin-input-text"
            value={formData.role}
            onChange={handleInputChange}
          >
            <option value="Admin">Admin</option>
            <option value="Dimension">Dimension</option>
            <option value="Label">Label</option>
          </select>
        </div>
        <center>
          <button className="signup-form-button-container" type="submit">
            Signup
          </button>
        </center>
      </form>
    </div>
    </div>
  );
};

export default StaffSignupPage;
