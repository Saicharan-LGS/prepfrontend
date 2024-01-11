import React, { useState } from "react";
import Toast from "../utlis/toast";
import { useNavigate } from "react-router-dom";
 
const CustomerOtpVerification = () => {
  const [otp, setOTP] = useState("");
  const navigate = useNavigate();
 
  const FETCH_URL = process.env.REACT_APP_FETCH_URL;
  const email = localStorage.getItem("email");
  const handleOTPChange = (e) => {
    // Allow only numerical input
    const newOTP = e.target.value.replace(/\D/g, "");
    setOTP(newOTP);
  };
 
  const handleVerifyClick = async (e) => {
    e.preventDefault();
 
    try {
      const response = await fetch(`${FETCH_URL}customerotpverfiy`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          otp: parseInt(otp, 10),
        }),
      });
 
      if (response.ok) {
        const data = await response.json();
 
        Toast.fire({
          icon: "success",
          title: data.message,
        });
        navigate("/");
      } else {
        console.error("Failed to send data to the backend");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
 
  return (
    <div>
      <h2>OTP Verification</h2>
      <p>
        Enter the 4-digit OTP sent to your email address to verify your account.
      </p>
      <p>{email}</p>
      <label htmlFor="otp">Enter OTP:</label>
      <input
        type="number" // Corrected type to "number"
        id="otp"
        name="otp"
        value={otp}
        onChange={handleOTPChange}
        maxLength={4}
        placeholder="Enter OTP"
      />
 
      <button onClick={handleVerifyClick}>Verify</button>
    </div>
  );
};
 
export default CustomerOtpVerification;