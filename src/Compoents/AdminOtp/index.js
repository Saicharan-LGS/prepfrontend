import React, { useState } from "react";
import Toast from "../utlis/toast";
import { useNavigate } from "react-router-dom";
import OtpInput from "react-otp-input";

const AdminOtp = () => {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const FETCH_URL = process.env.REACT_APP_FETCH_URL;
  const email = localStorage.getItem("email");

  const handleVerifyClick = async (e) => {
    e.preventDefault();
    console.log("called verify", otp, email);
    try {
      const response = await fetch(`${FETCH_URL}staffcustomerotpverfiysend`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          otp: parseInt(otp),
        }),
      });

      if (response.ok) {
        const data = await response.json();
        Toast.fire({
          icon: "success",
          title: data.message,
        });
        navigate("/AdminResetPassword");
      } else {
        console.error("Failed to send data to the backend");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="otp-input-form-container">
      <div className="otp-input-sub-container">
        <div className="otp-input-display-container">
          <p>
            Enter the 4-digit OTP sent to your email address to verify your
            account.
          </p>
          <p>{email}</p>
          <h1 className="enter-your-otp-heading">Enter Your OTP</h1>
          <OtpInput
            value={otp}
            onChange={setOtp}
            numInputs={4}
            renderSeparator={<span></span>}
            shouldAutoFocus={true}
            renderInput={(props) => <input {...props} />}
            inputStyle="otp-input-field"
          />
          <button onClick={handleVerifyClick} className="verify-otp-button">
            Verify OTP
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminOtp;

