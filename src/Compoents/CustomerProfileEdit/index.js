import React, { useState, useEffect } from "react";
import { ImCancelCircle } from "react-icons/im";
import "./index.css";

function CustomerProfileEdit({ onClose, fetchProducts, fetchProducts1 }) {
  const [name, setName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [address, setAddress] = useState("");
  const [profilePic, setProfilePic] = useState(null);
  const FETCH_URL = process.env.REACT_APP_FETCH_URL;
  const token = sessionStorage.getItem("token");

  const fetchCustomerData = async () => {
    try {
      const response = await fetch(`${FETCH_URL}getspecificcustomerdetails`, {
        headers: {
          Authorization: `Bearer ${token}`,
          // Add other headers if needed
        },
      });

      if (response.ok) {
        const customerData = await response.json();
        console.log(customerData.customer);
        setName(customerData.customer.name);
        setMobileNumber(customerData.customer.mobile_number);
        setAddress(customerData.customer.Address);
      } else {
        // Handle non-OK response, e.g., unauthorized access
        console.error("Error fetching customer data:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching customer data:", error);
    }
  };
  useEffect(() => {
    // Fetch customer data by ID when component mounts

    fetchCustomerData();
  }, []);

  // Function to handle profile update
  const handleUpdateProfile = async () => {
    const formData = new FormData();
    console.log(name, mobileNumber, address, profilePic);
    formData.append("name", name);
    formData.append("mobile_number", mobileNumber);
    formData.append("Address", address);
    if (profilePic) {
      formData.append("profile", profilePic);
    }

    try {
      const response = await fetch(`${FETCH_URL}updatespecificcustomer`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          // Add other headers if needed
        },
        body: formData,
      });

      if (response.ok) {
        console.log("Profile updated successfully");
        fetchCustomerData();
        onClose();
        fetchProducts();
        fetchProducts1();

        // You can add a success message or update the UI accordingly
      } else {
        console.error("Error updating profile:", response.statusText);
        // Handle error and show appropriate message
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      // Handle error and show appropriate message
    }
  };

  console.log(mobileNumber, address);

  return (
    <>
      <ImCancelCircle
        onClick={onClose}
        style={{
          fontSize: "24px",
          color: "#212d45",
          cursor: "pointer",
          marginBottom: "10px",
        }}
      />
      <div className="customer-profile-edit-main-container">
        <div className="customer-profile-edit-sub-container">
          <h1 className="customer-profile-edit-heading">Update Profile</h1>
          <div className="customer-profile-edit-input-container">
            <label className="customer-profile-edit-name">Name</label>
            <input
              type="text"
              name="name"
              className="customer-profile-edit-input-field"
              placeholder="Enter your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="customer-profile-edit-input-container">
            <label className="customer-profile-edit-name">Mobile No</label>
            <input
              type="number"
              name="number"
              className="customer-profile-edit-input-field"
              placeholder="Enter Mobile Number"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
            />
          </div>
          <div className="customer-profile-edit-input-container">
            <label className="customer-profile-edit-name">Address</label>
            <input
              type="text"
              name="address"
              className="customer-profile-edit-input-field"
              placeholder="Enter your Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className="customer-profile-edit-input-container">
            <label className="customer-profile-edit-name">Profile Pic</label>
            <input
              type="file"
              className="customer-profile-edit-file"
              onChange={(e) => setProfilePic(e.target.files[0])}
            />
          </div>
          <button
            className="customer-profile-edit-button"
            onClick={handleUpdateProfile}
          >
            Update
          </button>
        </div>
      </div>
    </>
  );
}

export default CustomerProfileEdit;
