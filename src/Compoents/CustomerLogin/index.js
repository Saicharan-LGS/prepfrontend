import React, { useState } from "react";
import "./index.css";
import { useNavigate } from "react-router-dom";
const CustomerLogin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const Navigate = useNavigate();
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Define the URL of your server's login endpoint
    const url = "http://localhost:3009/api/v1/login";

    // Create a JSON object with the form data
    const jsonData = {
      email: formData.email,
      password: formData.password,
    };

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Set the Content-Type to JSON
      },
      body: JSON.stringify(jsonData), // Convert JSON object to string
    })
      .then((response) => {
        if (response.status === 200) {
          // Login successful
          response.json().then((data) => {
            // Store the token in sessionStorage
            console.log(data.token);
            sessionStorage.setItem("token", data.token);
            sessionStorage.setItem("role", data.role);
            console.log("Login successful");
            Navigate("/customernavbar");
          });
        } else {
          // Handle other status codes or error messages
          console.error("Login failed");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const navigate=useNavigate()

  const onClickStaff=()=>{
    navigate("/")
  }

  return (
    <div className="customer-signin-div-container">
      <div className="signin-form-main-container">
        <div className="customer-staff-customer-button-container">
          <button className="customer-staff-button" onClick={onClickStaff}>Staff Signin</button>
          <button className="customer-customer-button" >Customer Signin</button>
        </div>
        <center>
          <h2 className="signin-form-heading-container">Customer Login</h2>
        </center>
        <form onSubmit={handleSubmit} className="signin-form-container">
          <div className="signin-form-group-container">
            <label className="signin-form-label-container">Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="signin-input-text"
            />
          </div>
          <div className="signin-form-group-container">
            <label className="signin-form-label-container">Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
              className="signin-input-text"
            />
          </div>
          <center>
            <button className="signin-form-button-container" type="submit">
              Sign In
            </button>
          </center>
        </form>
      </div>
    </div>
  );
};

export default CustomerLogin;
