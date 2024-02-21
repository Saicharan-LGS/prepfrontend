// StaffSigninPage.js

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./index.css";
import Toast from "../utlis/toast";
import axxpress from "../images/axxpress.png";
import staffImage from "../utlis/staff-signup-3.jpg";
import { encryptData, decryptData } from "../utlis/crypto"; // Import encryption and decryption functions

const StaffSigninPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [rememberMe, setRememberMe] = useState(false); // State for "Remember Me" checkbox
  const [error, setError] = useState(""); // State variable for error message
  const navigate = useNavigate(); // Get access to the navigation history

  useEffect(() => {
    const savedEncryptedEmail = localStorage.getItem("staffEncryptedEmail");
    const savedEncryptedPassword = localStorage.getItem(
      "staffEncryptedPassword"
    );
    if (savedEncryptedEmail && savedEncryptedPassword) {
      const decryptedEmail = decryptData(savedEncryptedEmail);
      const decryptedPassword = decryptData(savedEncryptedPassword);
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
    setError(""); // Clear any previous error messages
    const url = `${process.env.REACT_APP_FETCH_URL}stafflogin`;
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
          response.json().then((data) => {
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
              localStorage.setItem("staffEncryptedEmail", encryptedEmail);
              localStorage.setItem("staffEncryptedPassword", encryptedPassword);
            } else {
              localStorage.removeItem("staffEncryptedEmail");
              localStorage.removeItem("staffEncryptedPassword");
            }
            setTimeout(() => {
              if (data.role === "Admin") {
                navigate("/admin");
              } else if (data.role === "Label") {
                navigate("/labelOrders");
              } else if (data.role === "Dimension") {
                navigate("/dimensionorders");
              } else if (data.role === "Accountant") {
                navigate("/accountOrders");
              } else if (data.role === "Dispatch") {
                navigate("/dispatch");
              }
            }, 100);
          });
        } else if (response.status === 400) {
          response.json().then((data) => {
            Toast.fire({
              icon: "error",
              title: data.message,
            });
          });
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
        setError("Error occurred during login");
      });
  };

  return (
    <>
      <div className="customer-signin-sub-container">
        <div className="signin-div-container">
          <div className="login-image-container">
            <img src={staffImage} className="Login-image" alt="" />
          </div>
          <div className="signin-form-main-container">
            <img className="logo-image-axxpress" src={axxpress} alt="" />
            <center>
              <h2 className="signin-form-heading-container">Staff Login</h2>
            </center>
            <form onSubmit={handleSubmit} className="signin-form-container">
              <div className="signin-form-group-container">
                <label className="signin-form-label-container">Email ID</label>
                <input
                  type="email"
                  name="email"
                  className="signin-input-text"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter Your Email"
                />
              </div>
              <div className="signin-form-group-container">
                <label className="signin-form-label-container">Password</label>
                <input
                  type="password"
                  name="password"
                  className="signin-input-text"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter Your Password"
                />
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
              <center>
                <button className="signin-form-button-container" type="submit">
                  Sign In
                </button>
                {error && <p className="error-message">{error}</p>}{" "}
              </center>
              <Link
                to="/StaffForgotPassword"
                style={{ textDecoration: "none", textAlign: "center" }}
              >
                <p>Forgot Password</p>
              </Link>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default StaffSigninPage;
