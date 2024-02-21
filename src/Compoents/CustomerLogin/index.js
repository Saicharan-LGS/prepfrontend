// CustomerLogin.js
import React, { useState, useEffect } from "react";
import "./index.css";
import { Link, useNavigate } from "react-router-dom";
import Toast from "../utlis/toast";
import axxpress from "../images/axxpress.png";
import signup from "../utlis/signup-img-2.png";
import { encryptData, decryptData } from "../utlis/crypto"; // Import encryption and decryption functions

const CustomerLogin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [rememberMe, setRememberMe] = useState(false); // State for "Remember Me" checkbox
  const [errors, setErrors] = useState({});
  const [loginError, setLoginError] = useState(""); // State for login error message
  const navigate = useNavigate();

  useEffect(() => {
    const savedEmail = localStorage.getItem("encryptedEmail");
    const savedPassword = localStorage.getItem("encryptedPassword");
    if (savedEmail && savedPassword) {
      const decryptedEmail = decryptData(savedEmail);
      const decryptedPassword = decryptData(savedPassword);
      setFormData({ email: decryptedEmail, password: decryptedPassword });
      setRememberMe(true);
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRememberMeChange = (e) => {
    setRememberMe(e.target.checked);
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
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jsonData),
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
            sessionStorage.setItem("role", data.role);
            sessionStorage.setItem("sname", data.name);
            // Store credentials in localStorage if "Remember Me" is checked
            if (rememberMe) {
              // Encrypt and store the email and password
              const encryptedEmail = encryptData(formData.email);
              const encryptedPassword = encryptData(formData.password);
              localStorage.setItem("encryptedEmail", encryptedEmail);
              localStorage.setItem("encryptedPassword", encryptedPassword);
            } else {
              localStorage.removeItem("encryptedEmail");
              localStorage.removeItem("encryptedPassword");
            }

            setTimeout(() => {
              navigate("/customernavbar");
              window.location.reload();
            }, 100);
            // setTimeout(() => {
            //   window.location.reload();
            // }, 100);
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
    <div className="customer-signin-sub-container">
      <div className="customer-signin-div-container">
        <div className="login-image-container">
          <img src={signup} className="Login-image" alt="" />
        </div>
        <div className="signin-form-main-container">
          <img className="logo-image-axxpress" src={axxpress} alt="" />

          <center>
            <h2 className="signin-form-heading-container">Login</h2>
          </center>
          <form onSubmit={handleSubmit} className="signin-form-container">
            <div className="signin-form-group-container">
              <label className="signin-form-label-container">Email ID</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="signin-input-text"
                placeholder="Enter your Email"
              />
              {errors.email && <p className="error-message">{errors.email}</p>}
            </div>
            <div className="signin-form-group-container">
              <label className="signin-form-label-container">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="signin-input-text"
                placeholder="Enter your Password"
              />
              {errors.password && (
                <p className="error-message">{errors.password}</p>
              )}
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "10px",
              }}
            >
              <input
                style={{ margin: "0px 5px 0px 10px" }}
                type="checkbox"
                id="rememberMe"
                name="rememberMe"
                checked={rememberMe}
                onChange={handleRememberMeChange}
              />
              <label htmlFor="rememberMe">Remember Me</label>
            </div>
            {loginError && <p className="error-message">{loginError}</p>}
            <center>
              <button
                className="customer-signin-form-button-container"
                type="submit"
              >
                Login
              </button>
              <Link to="/signup" style={{ textDecoration: "none" }}>
                <p style={{ color: "#212d45", fontWeight: "600" }}>
                  <span style={{ color: "#b3b3b3", fontWeight: "500" }}>
                    Create new account?
                  </span>
                  Signup
                </p>
              </Link>
              <Link
                to="/CustomerForgotPassword"
                style={{ textDecoration: "none", color: "#212d45" }}
              >
                <p>Forgot Password</p>
              </Link>
            </center>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CustomerLogin;
