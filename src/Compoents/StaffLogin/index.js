import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import React Router
import "./index.css";
import Toast from "../utlis/toast";
import CustomerLogin from "../CustomerLogin";

const StaffSigninPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  sessionStorage.removeItem("role");
  sessionStorage.removeItem("token")
  sessionStorage.removeItem("sname")

  const [staff, setStaff] = useState(false);

  const [error, setError] = useState(""); // State variable for error message
  const navigate = useNavigate(); // Get access to the navigation history

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const FETCH_URL = process.env.REACT_APP_FETCH_URL;

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(""); // Clear any previous error messages

    // Define the URL of your server's login endpoint
    const url = `${FETCH_URL}stafflogin`;

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
            Toast.fire({
              icon: "success",
              title: data.message,
            });

            sessionStorage.setItem("token", data.token);
            localStorage.setItem("role", data.role);
            sessionStorage.setItem("role", data.role);
            sessionStorage.setItem("sname", data.name);
            setTimeout(() => {
              if (data.role === "Admin") {
                navigate("/admin");
              } else if (data.role === "Label") {
                navigate("/labelOrders");
              } else if (data.role === "Dimension") {
                navigate("/dimensionorders");
              } else if (data.role === "Accountant") {
                navigate("/accountOrders");
              } else if (data.role === "Dispatch"){
                navigate("/dispatch")
              }
            }, 100);
          });
        } else if (response.status === 400) {
          // Password required or incorrect
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

  const onClickCustomer = () => {
    setStaff(false);
  };
  const onClickStaff = () => {
    setStaff(true);
  };

  const activeStaffButton = staff
    ? `signin-staff-button`
    : `signin-customer-button`;
  const activeCustomerButton = staff
    ? `signin-customer-button`
    : `signin-staff-button`;

  return (
    <>
      <div className="signin-div-container">
        <div className="login-image-container">
          <img
            src="https://www.ascarii.com/hubfs/Optimised-Customer-Service-v4.png"
            className="Login-image"
            alt=""
          />
        </div>
        <div className="signin-form-main-container">
          {/* <div className="signin-staff-customer-button-container">
            <button className={activeStaffButton} onClick={onClickStaff}>
              Staff Signin
            </button>
            <button className={activeCustomerButton} onClick={onClickCustomer}>
              Customer Signin
            </button>
          </div> */}
          
              <center>
                <h2 className="signin-form-heading-container">Staff Login</h2>
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
                  <label className="signin-form-label-container">
                    Password:
                  </label>
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
                  <button
                    className="signin-form-button-container"
                    type="submit"
                  >
                    Sign In
                  </button>
                  {error && <p className="error-message">{error}</p>}{" "}
                  {/* Display error message */}
                </center>
              </form>
            
        </div>
      </div>
    </>
  );
};

export default StaffSigninPage;
