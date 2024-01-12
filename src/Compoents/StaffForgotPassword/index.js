import React, { useState } from "react";
import Toast from "../utlis/toast";
import axxpress from "../images/axxpress.png";
import { useNavigate } from "react-router";
import Button from "../Button";
const StaffForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [showLoader, setShowLoader] = useState(false);
  const navigate = useNavigate();

  const FETCH_URL = process.env.REACT_APP_FETCH_URL;

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowLoader(true)

    try {
      const response = await fetch(`${FETCH_URL}staffforgetpassword`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (response.ok) {
        Toast.fire({
          icon: "success",
          title: data.message,
        });
        setShowLoader(false)
        localStorage.setItem("email", email);
        navigate("/AdminOtp");
      } else {
        Toast.fire({
          icon: "error",
          title: data.message,
        });
        setShowLoader(false)
      }
    } catch (error) {
      setShowLoader(false)
      console.error("An error occurred while sending OTP", error);
    }
  };
  return (
    <div className="forgot-password-main-container">
      <div className="forgot-password-container">
        <img className="logo-image-axxpress" src={axxpress} alt="" />

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
            {/* <button className="forgot-password-button" type="submit">
              Send OTP
            </button> */}
            <Button
              text="Send OTP"
              type="Submit"
              loading={showLoader}
              disabled={showLoader}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default StaffForgotPassword;
