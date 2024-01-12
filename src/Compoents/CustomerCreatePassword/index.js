import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Toast from "../utlis/toast";
import './index.css' 

const CreatePassword = () => {
  const { email } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
 
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
 
  const FETCH_URL = process.env.REACT_APP_FETCH_URL;
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    const emailPrefix = email.split(" ")[0];
 
    // Validate the form data
    const validationErrors = {};
    if (!formData.password.trim()) {
      validationErrors.password = "Password is required";
    }
    if (formData.password !== formData.confirmPassword) {
      validationErrors.confirmPassword = "Passwords do not match";
    }
 
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
 
    try {
      const response = await fetch(
        `${FETCH_URL}createpassword/${emailPrefix}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            password: formData.password,
          }),
        }
      );
      if (response.ok) {
        const data = await response.json();
        Toast.fire({
          icon: "success",
          title: data.message,
        });
        navigate("/");
        setFormData({
          password: "",
          confirmPassword: "",
        });
      }
    } catch (error) {
      console.error("Error resetting password:", error);
    }
  };
 
  return (
    <div className="customer-create-password-main-container">
    <div className="customer-update-password-main-container" >
      
      <form onSubmit={handleSubmit}  className="customer-update-password-form-container" style={{boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",padding:"20px"}}>
        <h2 className="customer-update-password-heading">Create Password</h2>
        <div className="customer-update-password-input-container">
          <label className="customer-update-password-label-name">Password:</label>
          <input
            type="password"
            name="password"
            className="customer-update-password-input-field"
            value={formData.password}
            onChange={handleInputChange}
          />
          {errors.password && (
            <p className="error-message">{errors.password}</p>
          )}
        </div>
        <div className="customer-update-password-input-container">
          <label className="customer-update-password-label-name">Confirm Password:</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            className="customer-update-password-input-field"
          />
          {errors.confirmPassword && (
            <p className="error-message">{errors.confirmPassword}</p>
          )}
        </div>
        <button type="submit" className="customer-update-password-button">Create Password</button>
      </form>
    </div>
    </div>
  );
};
 
export default CreatePassword;