import React, { useState } from "react";
import Toast from "../utlis/toast";
import { useNavigate } from "react-router-dom";
import OtpInput from "react-otp-input";
import "./CustomerOtp.css";
import signup from '../utlis/signup-img-2.png'


const CustomerOtpVerification2 = () => {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const FETCH_URL = process.env.REACT_APP_FETCH_URL;
  const email = localStorage.getItem("email");
  const resendCustomerOtp = async () => {
    try {
      const response = await fetch(`${FETCH_URL}resendCustomerOTP`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
        }),
      });
      const data = await response.json();
      Toast.fire({
        icon: "success",
        title: data.message,
      });
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const handleVerifyClick = async (e) => {
    e.preventDefault();
    console.log("called verify", otp, email);
    if(otp){

    
    try {
      const response = await fetch(`${FETCH_URL}customerotpverfiysend`, {
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
        navigate("/CustomerResetPasswordUpdate");
      } else {
        console.error("Failed to send data to the backend");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }
  };

  return (
    <div className="otp-input-background-container">
    <div className="otp-input-form-container">
    <div className="login-image-container">
        <img
          // src="https://www.ascarii.com/hubfs/Optimised-Customer-Service-v4.png"
          src={signup}
          className="Login-image"
          alt=""
        />
      </div>
      <div className="otp-input-sub-container">
        <div className="otp-input-display-container">
          <p className="otp-input-label-name">
            Enter the 4-digit OTP sent to your email address to verify your
            account.
          </p>
          <p className="otp-input-label-name">{email}</p>
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
          {otp.length>3 && <button onClick={handleVerifyClick} className="verify-otp-button">
            Verify OTP
          </button>
}
          <p style={{ cursor: "pointer" }} onClick={resendCustomerOtp}>
            Didn't get the OTP? <span style={{fontweight:"600"}}>Resend</span>
          </p>
        </div>
      </div>
    </div>
    </div>
  );
};

export default CustomerOtpVerification2;

// import React, { useState } from "react";
// import "./CustomerOtp.css";
// import OtpInput from "react-otp-input";

// function CustomerOtpVerification() {
//   const [otp, setOtp] = useState("");

//   console.log(otp);

//   return (
//     <div className="otp-input-form-container">
//       <p>{otp}</p>
//       <div className="otp-input-sub-container">
//         <div className="otp-input-display-container">
//           <h1 className="enter-your-otp-heading">Enter Your OTP</h1>
//           <OtpInput
//             value={otp}
//             onChange={setOtp}
//             numInputs={4}
//             renderSeparator={<span></span>}
//             shouldAutoFocus={true}
//             renderInput={(props) => <input {...props} />}
//             inputStyle="otp-input-field"
//           />
//           <button className="verify-otp-button">Verify OTP</button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default CustomerOtpVerification;
