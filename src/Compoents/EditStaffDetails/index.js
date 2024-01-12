import React, { useState, useEffect } from "react";
import "./index.css";
import Toast from "../utlis/toast";

const EditStaffDetails = ({ id }) => {
  const staffId = id;
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "Admin",
  });

  const [errorMessages, setErrorMessages] = useState({
    name: "",
    email: "",
  });

  useEffect(() => {
    // Fetch staff details when the component mounts
    const staffId = "staffId"; // Replace with the actual staff ID
    getStaffDetails(staffId);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

 
  const getStaffDetails = (staffId) => {
    const token = sessionStorage.getItem("token");
    const url = `${process.env.REACT_APP_FETCH_URL}getStaffDetailsById/${staffId}`;
    fetch(url, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Failed to fetch staff details");
        }
      })
      .then((data) => {
        const { name, email, role } = data.staff;
        setFormData({
          name: name,
          email: email,
          role: role ,
        });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };


  const updateStaffDetails = () => {
    const token = sessionStorage.getItem("token");

    const url = `${process.env.REACT_APP_FETCH_URL}updateStaffDetailsById/${staffId}`;

    fetch(url, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Failed to update staff details");
        }
      })
      .then((data) => {
        // Handle the response data
        Toast.fire({
          icon: "success",
          title: data.message,
        });
      })
      .catch((error) => {
        Toast.fire({
          icon: "error",
          title: error.message,
        });
      });
  };

  return (
    <div className="signup-div-container">
      <div className="login-image-container">
        <img
          src="https://www.ascarii.com/hubfs/Optimised-Customer-Service-v4.png"
          className="Login-image"
          alt=""
        />
      </div>
      <div className="signup-main-form-container">
        <center>
          <h2 className="signup-form-heading-container">Add Staff</h2>
        </center>
        <form onSubmit={updateStaffDetails} className="signup-form-container">
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
            <label className="signup-form-lable-container">Email:</label>
            <input
              type="email"
              name="email"
              className="signin-input-text"
              value={formData.email}
              readOnly
            />
          </div>
          {/* <div className="signup-whole-form-contaner">
            <label className="signup-form-lable-container">Password:</label>
            <input
              type="password"
              name="password"
              className="signin-input-text"
              value={formData.password}
              onChange={handleInputChange}
            />
          </div> */}
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
              <option value="Dispatch">Dispatch</option>
            </select>
          </div>
          <center>
            <button className="signup-form-button-container" type="submit">
              Signup
            </button>
          </center>
          <div>
            {errorMessages.name && (
              <p className="signup-error-messages">{errorMessages.name}</p>
            )}
            {errorMessages.password && (
              <p className="signup-error-messages">{errorMessages.password}</p>
            )}
            {errorMessages.email && (
              <p className="signup-error-messages">{errorMessages.email}</p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditStaffDetails;
