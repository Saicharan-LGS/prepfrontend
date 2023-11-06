import React, { useState } from "react";
import "./index.css";

import { useNavigate } from "react-router-dom";

const StaffSignupPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    password: "",
    email: "",
    role: "Admin",
  });

  const [errorMessages, setErrorMessages] = useState({
    name: "",
    password: "",
    email: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();

    // Define the URL of your server's registration endpoint
    

    // Create a JSON object with the form data
    
    let isValid = true;
    const newErrorMessages = { name: "", password: "", email: "" };

    if (formData.name === "") {
      newErrorMessages.name = "Name is required";
      isValid = false;
    }

    if (formData.password === "") {
      newErrorMessages.password = "Password is required";
      isValid = false;
    }

    if (formData.email === "") {
      newErrorMessages.email = "Email is required";
      isValid = false;
    }

    setErrorMessages(newErrorMessages);



    if (isValid) {
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
            navigate("/staffsignin")
            // Navigate to the signin page
          } else {
            // Handle other status codes or error messages
            console.error("Registration failed");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
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
            <option value="Accountant">Accountant</option>
          </select>
        </div>
        <center>
          <button className="signup-form-button-container" type="submit">
            Signup
          </button>
        </center>
        <div>
          {errorMessages.name && <p className="signup-error-messages">{errorMessages.name}</p>}
          {errorMessages.password && <p className="signup-error-messages">{errorMessages.password}</p>}
          {errorMessages.email && <p className="signup-error-messages">{errorMessages.email}</p>}
        </div>
      </form>
    </div>
    </div>
  );
};

export default StaffSignupPage;


