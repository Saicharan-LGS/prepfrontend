import React, { useState } from "react";
import "./index.css";
import { useNavigate } from "react-router-dom";
import Toast from "../utlis/toast";

const CustomerLogin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [loginError, setLoginError] = useState(""); // State for login error message
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({}); // Clear any previous validation errors
    setLoginError(""); // Clear any previous login error

    // Validate the form data
    const validationErrors = {};
    if (!formData.email.trim()) {
      validationErrors.email = "Email is required";
    }
    if (!formData.password.trim()) {
      validationErrors.password = "Password is required";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Define the URL of your server's login endpoint
    const url = `${process.env.REACT_APP_FETCH_URL}login`;

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
            Toast.fire({
              icon: "success",
              title: data.message,
            });
            sessionStorage.setItem("token", data.token);
            localStorage.setItem("role", "Customer");
            sessionStorage.setItem("role", data.role);
            sessionStorage.setItem("sname", data.name);

            // navigate("/customernavbar"); // Navigate to the home page on successful login
            setTimeout(() => {
              navigate("/customernavbar");
            }, 100);
          });
        } else if (response.status === 401) {
          response.json().then((data) => {
            Toast.fire({
              icon: "error",
              title: data.message,
            });
          });
          // Unauthorized - Incorrect username or password
        } else {
          response.json().then((data) => {
            Toast.fire({
              icon: "error",
              title: data.message,
            });
          });
        }
      })
      .catch((error) => {
        setLoginError("An error occurred while processing your request");
      });
  };

  return (
    // <div className="customer-signin-div-container">
    //    <div className="login-image-container">
    //     <img src="https://www.ascarii.com/hubfs/Optimised-Customer-Service-v4.png" className="Login-image" alt=""/>
    //   </div>
    //   <div className="signin-form-main-container">
    //      <div className="customer-staff-customer-button-container">
    //       <button className="customer-staff-button" onClick={onClickStaff}>
    //         Staff Signin
    //       </button>
    //       <button className="customer-customer-button">Customer Signin</button>
    //     </div>
    //     <center>
    //       <h2 className="signin-form-heading-container">Customer Login</h2>
    //     </center>
    //     <form onSubmit={handleSubmit} className="signin-form-container">
    //       <div className="signin-form-group-container">
    //         <label className="signin-form-label-container">Email:</label>
    //         <input
    //           type="email"
    //           name="email"
    //           value={formData.email}
    //           onChange={handleInputChange}
    //           className="signin-input-text"
    //         />
    //         {errors.email && <p className="error-message">{errors.email}</p>}
    //       </div>
    //       <div className="signin-form-group-container">
    //         <label className="signin-form-label-container">Password:</label>
    //         <input
    //           type="password"
    //           name="password"
    //           value={formData.password}
    //           onChange={handleInputChange}
    //           className="signin-input-text"
    //         />
    //         {errors.password && (
    //           <p className="error-message">{errors.password}</p>
    //         )}
    //       </div>
    //       {loginError && <p className="error-message">{loginError}</p>}
    //       <center>
    //         <button className="signin-form-button-container" type="submit">
    //           Sign In
    //         </button>
    //       </center>
    //     </form>
    //   </div>
    // </div>
    <>
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
            className="signin-input-text"
          />
          {errors.email && <p className="error-message">{errors.email}</p>}
        </div>
        <div className="signin-form-group-container">
          <label className="signin-form-label-container">Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className="signin-input-text"
          />
          {errors.password && (
            <p className="error-message">{errors.password}</p>
          )}
        </div>
        {loginError && <p className="error-message">{loginError}</p>}
        <center>
          <button className="signin-form-button-container" type="submit">
            Sign In
          </button>
        </center>
      </form>
    </>
  );
};

export default CustomerLogin;
