import React, { useState } from "react";
import Cards from "react-credit-cards-2";
import './index.css';
import "react-credit-cards-2/dist/es/styles-compiled.css";
import { useLocation } from "react-router-dom";
import { encrypt } from "../Encrypt";
import Toast from "../utlis/toast";
 
const CreditCard = () => {
  const [state, setState] = useState({
    number: "",
    name: "",
    expiry: "",
    cvc: "",
    focus: "",
  });
 
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let newValue = value;
 
    if (name === "number") {
      newValue = value.replace(/\D/g, "").slice(0, 16);
    }
 
    setState((prev) => ({ ...prev, [name]: newValue }));
  };
 
  const handleInputFocus = (e) => {
    setState((prev) => ({ ...prev, focus: e.target.name }));
  };

  const location = useLocation();
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = sessionStorage.getItem("token");

    
  const searchParams = new URLSearchParams(location.search);
  const encryptedText = searchParams.get("encryptedText");
 
    // Prepare the data for the POST request
    const postData = {
      number: encrypt(state.number),
      name: encrypt(state.name),
      expiry: encrypt(state.expiry),
      cvc: encrypt(state.cvc),
      amount: encryptedText,
    };
 
    try {
      const response = await fetch("http://localhost:3008/api/v1/add", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });
 
      if (response.ok) {
        const data = response.json()
        Toast.fire({
          icon: "success",
          title: data.message,
        });
        console.log("Credit Card Data submitted successfully!");
      } else {
        const data = response.json()
        Toast.fire({
          icon: "error",
          title: data.message,
        });
        console.error("Failed to submit Credit Card Data");
      }
    } catch (error) {
      console.error("Error during POST request:", error);
    }
  };
 
  return (
    <div className="credit-card-form-main-container">
      <div className="credit-card-form-sub-container">
        <Cards
          number={state.number}
          expiry={state.expiry}
          cvc={state.cvc}
          name={state.name}
          focused={state.focus}
        />
        <div className="mt-3 mr-3">
          <form className="credit-card-form-container" onSubmit={handleSubmit}>
            <div className="mb-3">
              <input
                type="text"
                name="number"
                className="form-control"
                placeholder="Card Number"
                value={state.number}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
                maxLength="16"
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                name="name"
                className="form-control"
                placeholder="Name"
                onChange={handleInputChange}
                onFocus={handleInputFocus}
                required
              />
            </div>
            <div className="row">
              <div className="col-6 mb-3">
                <input
                  type="text"
                  name="expiry"
                  className="form-control"
                  placeholder="Valid Thru"
                  pattern="\d\d/\d\d"
                  value={state.expiry}
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                  required
                />
              </div>
              <div className="col-6 mb-3">
                <input
                  type="text"
                  name="cvc"
                  className="form-control"
                  placeholder="CVC"
                  pattern="\d{3,4}"
                  value={state.cvc}
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                  required
                />
              </div>
            </div>
            <div className="d-grid">
              <button type="submit" className="btn btn-dark">
                Confirm
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
 
export default CreditCard;