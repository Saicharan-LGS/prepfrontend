import React, { useState } from "react";
import "./CustomerResetPassword.css";

const CustomerResetPasswordUpdate = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleOldPasswordChange = (e) => {
    setOldPassword(e.target.value);
  };

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const updatePassword = async () => {
    const authToken = sessionStorage.getItem("authToken");
    try {
      const response = await fetch("your-api-endpoint", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          newPassword,
          newPassword1: oldPassword,
        }),
      });

      if (response.ok) {
        alert("Password updated successfully!");
      } else {
        alert("Failed to update password. Please try again.");
      }
    } catch (error) {
      console.error("Error updating password:", error);
      alert("An error occurred while updating the password.");
    }
  };

  return (
    <div className="update-password-main-container">
      <div className="update-password-sub-container">
        <h2 className="update-password-heading"> Update Password</h2>
        <form>
          <label
            htmlFor="oldPassword"
            className="update-password-lable-container"
          >
            New Password:
          </label>
          <input
            type="password"
            id="oldPassword"
            value={oldPassword}
            onChange={handleOldPasswordChange}
            required
            className="update-password-input-container"
          />
          <label
            htmlFor="newPassword"
            className="update-password-lable-container"
          >
            Confirm New Password:
          </label>
          <input
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={handleNewPasswordChange}
            required
            className="update-password-input-container"
          />
          {/* <label
            htmlFor="oldPassword"
            className="update-password-lable-container"
          >
            Conform Password:
          </label>
          <input
            type="password"
            id="oldPassword"
            value={oldPassword}
            onChange={handleOldPasswordChange}
            required
            className="update-password-input-container"
          /> */}

          <button
            type="button"
            onClick={updatePassword}
            className="update-password-button"
          >
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default CustomerResetPasswordUpdate;
