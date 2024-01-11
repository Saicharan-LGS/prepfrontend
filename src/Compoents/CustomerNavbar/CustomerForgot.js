import React, { useState } from "react";
import "./Customerforgot.css";

const CustomerForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="forgot-password-main-container">
      <div className="forgot-password-container">
        <h2 className="forgot-password-heading">Forgot Password</h2>
        <form
          className="forgot-password-form-container"
          onSubmit={handleSubmit}
        >
          <label className="forgot-password-lable-container">Email:</label>
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            required
            className="forgot-passsword-input-container"
          />
          <div className="forgot-password-button-container">
            <button className="forgot-password-button" type="submit">
              Sent OTP
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CustomerForgotPassword;
