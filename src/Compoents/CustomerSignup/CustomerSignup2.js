import React, { useState } from "react";

import Toast from "../utlis/toast";
import { Link, useNavigate } from "react-router-dom";
import axxpress from '../images/axxpress.png'

const Customersignup2 = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [backendError, setBackendError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "confirmPassword") {
      setConfirmPassword(value);
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setBackendError(null);

    const validationErrors = {};
    if (!formData.name.trim()) {
      validationErrors.name = "Name is required";
    }
    if (!formData.email.trim()) {
      validationErrors.email = "Email is required";
    }
    if (!formData.password.trim()) {
      validationErrors.password = "Password is required";
    }
    if (!confirmPassword.trim()) {
      validationErrors.confirmPassword = "Confirm Password is required";
    }
    if (formData.password !== confirmPassword) {
      validationErrors.confirmPassword = "Passwords do not match";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    };

    fetch(
      `${process.env.REACT_APP_FETCH_URL}customerregistration`,
      requestOptions
    )
      .then((response) => {
        if (response.status === 200) {
          response.json().then((data) => {
            localStorage.setItem("email", formData.email);
            Toast.fire({
              icon: "success",
              title: data.message,
            });
            setFormData({
              name: "",
              email: "",
              password: "",
            });
            setConfirmPassword("");
            navigate("/CustomerOtpVerification");
          });
        } else {
          response.json().then((data) => {
            Toast.fire({
              icon: "error",
              title: data.message,
            });
            // Set isModalOpen to false if the status is not 200
            setFormData({
              name: "",
              email: "",
              password: "",
            });
            setConfirmPassword("");
          });
        }
      })
      .catch(() => {
        setBackendError("An error occurred while processing your request.");
      });
  };

  return (
    <div className="customer-signin-div-container">
      <div className="login-image-container">
        <img
          src="https://www.ascarii.com/hubfs/Optimised-Customer-Service-v4.png"
          className="Login-image"
          alt=""
        />
      </div>
      <div className="customer-signin-form-main-container">
      <img className='logo-image-axxpress' src={axxpress} alt=''/>

        <center>
          <h2 className="customer-signin-form-heading-container">
            Signup
          </h2>
        </center>
        <form
          onSubmit={handleSubmit}
          className="customer-singin-form-container"
        >
          <div className="customer-signin-form-group-container">
            <label className="customer-singnin-form-lable-container">
              Name:
            </label>
            <input
              type="text"
              name="name"
              className="customer-signin-input-container"
              value={formData.name}
              onChange={handleInputChange}
            />
            {errors.name && <p className="error-message">{errors.name}</p>}
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
            />
            {errors.email && <p className="error-message">{errors.email}</p>}
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
            />
            {errors.password && (
              <p className="error-message">{errors.password}</p>
            )}
          </div>
          <div className="customer-signin-form-group-container">
            <label className="customer-singnin-form-lable-container">
              Confirm Password:
            </label>
            <input
              type="password"
              name="confirmPassword"
              className="customer-signin-input-container"
              value={confirmPassword}
              onChange={handleInputChange}
            />
            {errors.confirmPassword && (
              <p className="error-message">{errors.confirmPassword}</p>
            )}
          </div>
          {backendError && <p className="error-message">{backendError}</p>}
          <center>
            <button
              className="customer-signin-form-button-container"
              type="submit"
            >
              Sign Up
            </button>
            <Link to="/" style={{ textDecoration: 'none' }}>
              <p>Do you have account Already? login</p>
            </Link>
          </center>
        </form>
      </div>
    </div>
  );
};

export default Customersignup2;
