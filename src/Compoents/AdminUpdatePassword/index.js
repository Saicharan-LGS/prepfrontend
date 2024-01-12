import React, { useState } from "react";
import { ImCancelCircle } from "react-icons/im";
import Toast from "../utlis/toast";

const AdminUpdatePassword = ({onClose}) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
 
  const handleOldPasswordChange = (e) => {
    setOldPassword(e.target.value);
  };
 
  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };
 
  const updatePassword = async () => {
    
    const authToken = sessionStorage.getItem("token");
    try {
      const response = await fetch(`${process.env.REACT_APP_FETCH_URL}updatecustomerpassword`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          currentPassword: oldPassword,
          newPassword,
        }),
      });
 
      if (response.ok) {
        response.json().then((data) => {
          Toast.fire({
            icon: "success",
            title: data.message,
          });
        });
        onClose()
      } else {
        
        response.json().then((data) => {
          Toast.fire({
            icon: "error",
            title: data.message,
          });
        });
      }
    } catch (error) {
      console.error("Error updating password:", error);
      alert("An error occurred while updating the password.");
    }
  };
 
  return (
    <>
    <ImCancelCircle onClick={onClose} style={{fontSize:"24px", color:"#212d45",cursor:"pointer",marginBottom:"10px"}}/>
    <div className="customer-update-password-main-container">
      
      <form className="customer-update-password-form-container">
      <h2 className="customer-update-password-heading">Password Update</h2>
        <div className="customer-update-password-input-container">
        <label htmlFor="oldPassword" className="customer-update-password-label-name">Old Password:</label>
        <input
          type="password"
          id="oldPassword"
          value={oldPassword}
          onChange={handleOldPasswordChange}
          required
          className="customer-update-password-input-field"
        />
        </div>
        <div className="customer-update-password-input-container">
        <label htmlFor="newPassword" className="customer-update-password-label-name">New Password:</label>
        <input
          type="password"
          id="newPassword"
          value={newPassword}
          onChange={handleNewPasswordChange}
          required
          className="customer-update-password-input-field"
        />
        </div>
 
        <button type="button" onClick={updatePassword} className="customer-update-password-button">
          Update Password
        </button>
      </form>
    </div>
    </>
  );
};
 
export default AdminUpdatePassword;