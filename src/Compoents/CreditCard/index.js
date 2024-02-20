import React, { useState } from "react";
import Cards from "react-credit-cards-2";
import "./index.css";
import "react-credit-cards-2/dist/es/styles-compiled.css";
import { useNavigate, useLocation } from "react-router-dom";
import { decrypt, encrypt } from "../Encrypt";
import Toast from "../utlis/toast";

const CreditCard = () => {
  const [state, setState] = useState({
    number: "",
    expiry: "",
    cvc: "",
    firstName: "",
    lastName: "",
    company: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    focus: "name",
  });

  const navigate = useNavigate();

  const PAY_FETCH_URL = process.env.REACT_APP_PAY_FETCH_URL;

  const handleInputChange = (evt) => {
    const { name, value } = evt.target;

    setState((prev) => ({ ...prev, [name]: value }));
  };

  const handleInputFocus = (evt) => {
    setState((prev) => ({ ...prev, focus: evt.target.name }));
  };

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const encryptedText = searchParams.get("encrypted");
  const amount1 = decrypt(encryptedText);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = sessionStorage.getItem("token");

    const formattedExpiry = state.expiry.replace(/\D/g, "");
    const transformedExpiry =
      formattedExpiry.slice(0, 2) + formattedExpiry.slice(2);

    const postData = {
      number: encrypt(state.number),
      expiry: encrypt(transformedExpiry),
      cvc: encrypt(state.cvc),
      amount: encryptedText,
      firstName: encrypt(state.firstName),
      lastName: encrypt(state.lastName),
      company: encrypt(state.company),
      city: encrypt(state.city),
      state: encrypt(state.state),
      zipCode: encrypt(state.zipCode),
      country: encrypt(state.country),
      address: encrypt(state.address),
    };

    try {
      const response = await fetch(`${PAY_FETCH_URL}addmoney`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });

      if (response.ok) {
        const data = await response.json();
        Toast.fire({
          icon: "success",
          title: data.message,
        });
        setState({
          number: "",
          expiry: "",
          cvc: "",
          firstName: "",
          lastName: "",
          company: "",
          address: "",
          city: "",
          state: "",
          zipCode: "",
          country: "",
          focus: "",
        });
        navigate("/customernavbar");
      } else {
        const data = await response.json();
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

  const usStates = [
    { name: "Alabama", code: "AL" },
    { name: "Alaska", code: "AK" },
    { name: "Arizona", code: "AZ" },
    { name: "Arkansas", code: "AR" },
    { name: "California", code: "CA" },
    { name: "Colorado", code: "CO" },
    { name: "Connecticut", code: "CT" },
    { name: "Delaware", code: "DE" },
    { name: "Florida", code: "FL" },
    { name: "Georgia", code: "GA" },
    { name: "Hawaii", code: "HI" },
    { name: "Idaho", code: "ID" },
    { name: "Illinois", code: "IL" },
    { name: "Indiana", code: "IN" },
    { name: "Iowa", code: "IA" },
    { name: "Kansas", code: "KS" },
    { name: "Kentucky", code: "KY" },
    { name: "Louisiana", code: "LA" },
    { name: "Maine", code: "ME" },
    { name: "Maryland", code: "MD" },
    { name: "Massachusetts", code: "MA" },
    { name: "Michigan", code: "MI" },
    { name: "Minnesota", code: "MN" },
    { name: "Mississippi", code: "MS" },
    { name: "Missouri", code: "MO" },
    { name: "Montana", code: "MT" },
    { name: "Nebraska", code: "NE" },
    { name: "Nevada", code: "NV" },
    { name: "New Hampshire", code: "NH" },
    { name: "New Jersey", code: "NJ" },
    { name: "New Mexico", code: "NM" },
    { name: "New York", code: "NY" },
    { name: "North Carolina", code: "NC" },
    { name: "North Dakota", code: "ND" },
    { name: "Ohio", code: "OH" },
    { name: "Oklahoma", code: "OK" },
    { name: "Oregon", code: "OR" },
    { name: "Pennsylvania", code: "PA" },
    { name: "Rhode Island", code: "RI" },
    { name: "South Carolina", code: "SC" },
    { name: "South Dakota", code: "SD" },
    { name: "Tennessee", code: "TN" },
    { name: "Texas", code: "TX" },
    { name: "Utah", code: "UT" },
    { name: "Vermont", code: "VT" },
    { name: "Virginia", code: "VA" },
    { name: "Washington", code: "WA" },
    { name: "West Virginia", code: "WV" },
    { name: "Wisconsin", code: "WI" },
    { name: "Wyoming", code: "WY" },
  ];

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
          <center>
            <p className="amount-text"> Amount : ${amount1}</p>
          </center>
          <form className="credit-card-form-container" onSubmit={handleSubmit}>
            <div className="mb-3">
              <label>Card Number</label>
              <input
                type="number"
                name="number"
                className="form-control"
                placeholder="9999 9999 9999 9999"
                value={state.number}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
                maxLength="15"
                minLength="15"
                required
              />
            </div>
            <div className="row">
              <div className="col-6 mb-3">
                <label>Expiry Date</label>
                <input
                  type="number"
                  name="expiry"
                  className="form-control"
                  placeholder="mm/yy"
                  value={state.expiry}
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                  required
                />
              </div>
              <div className="col-6 mb-3">
                <label>Enter CVC Number</label>
                <input
                  type="number"
                  name="cvc"
                  className="form-control"
                  placeholder="123"
                  value={state.cvc}
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                  required
                />
              </div>
            </div>
            <div className="row">
              <div className="col-6 mb-3">
                <label>First Name</label>
                <input
                  type="text"
                  name="firstName"
                  className="form-control"
                  value={state.firstName}
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                  required
                />
              </div>
              <div className="col-6 mb-3">
                <label>Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  className="form-control"
                  value={state.lastName}
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                  required
                />
              </div>
            </div>
            <div className="row">
              <div className="col-12 mb-3">
                <label>Address</label>
                <textarea
                  name="address"
                  className="form-control"
                  value={state.address}
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                  rows="1"
                  required
                />
              </div>
            </div>
            <div className="row">
              <div className="col-4 mb-3">
                <label>City</label>
                <input
                  type="text"
                  name="city"
                  className="form-control"
                  value={state.city}
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                  required
                />
              </div>
              <div className="col-4 mb-3">
                <label>State</label>
                <select
                  name="state"
                  className="form-control"
                  value={state.state}
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                  required
                >
                  <option value="">Select State</option>
                  {usStates.map((state, index) => (
                    <option key={index} value={state.code}>
                      {state.name}({state.code})
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-4 mb-3">
                <label>Zip Code</label>
                <input
                  type="text"
                  name="zipCode"
                  className="form-control"
                  value={state.zipCode}
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                  required
                />
              </div>
            </div>
            <div className="row">
              <div className="col-6 mb-3">
                <label>Country</label>
                <input
                  type="text"
                  name="country"
                  className="form-control"
                  value={state.country}
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                  required
                />
              </div>
              <div className="col-6 mb-3">
                <label>Company</label>
                <input
                  type="text"
                  name="company"
                  className="form-control"
                  value={state.company}
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                  required
                />
              </div>
            </div>

            <div className="d-grid ">
              <center>
                <button type="submit" className="btn btn-dark w-50">
                  Confirm
                </button>
              </center>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreditCard;
