import React, { useState } from "react";
import "./index.css";

const StaffSigninPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Define the URL of your server's login endpoint
    const url = "http://localhost:3009/api/v1/stafflogin";

    // Create a JSON object with the form data
    const jsonData = {
      email: formData.email,
      password: formData.password,
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
        if (response.status === 200) {
          // Login successful
          response.json().then((data) => {
            // Store the token in sessionStorage
            console.log(data.token)
            sessionStorage.setItem("token", data.token);
            console.log("Login successful");
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

  return (
    <div className="signin-div-container">
    <div className="signin-form-main-container">
      <center>
        <h2 className="signin-form-heading-container">Sign In</h2>
      </center>
      <form onSubmit={handleSubmit} className="signin-form-container">
        <div className="signin-form-group-container">
          <label className="signin-form-label-container">Email:</label>
          <input
            type="email"
            name="email"
            className="signin-input-text"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="signin-form-group-container">
          <label className="signin-form-label-container">Password:</label>
          <input
            type="password"
            name="password"
            className="signin-input-text"
            value={formData.password}
            onChange={handleInputChange}
            required
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

export default StaffSigninPage;

