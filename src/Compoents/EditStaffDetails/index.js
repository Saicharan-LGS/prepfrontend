import React, { useState, useEffect } from "react";
import "./index.css";
import Toast from "../utlis/toast";
import { ImCancelCircle } from "react-icons/im";

const EditStaffDetails = ({ staff,onClose}) => {
  const staffId = staff;
  const id = staffId.id
  console.log(staffId,"kkkkkkkkkkkk")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "Admin",
  });

  useEffect(() => {
    // Fetch staff details when the component mounts
    getStaffDetails(staffId);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

 
  const getStaffDetails = (staffId) => {
    const token = sessionStorage.getItem("token");
    const url = `${process.env.REACT_APP_FETCH_URL}getStaffDetailsById/${id}`;
    fetch(url, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Failed to fetch staff details");
        }
      })
      .then((data) => {
        const { name, email, role } = data.staff;
        setFormData({
          name: name,
          email: email,
          role: role ,
        });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };


  const updateStaffDetails = (e) => {
    e.preventDefault();
    const token = sessionStorage.getItem("token");
  
    const url = `${process.env.REACT_APP_FETCH_URL}updateStaffDetailsById/${id}`;
  
    fetch(url, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        onClose()
        if (response.ok) {
          return response.json();
        } else {
          return response.json().then((data) => {
            throw new Error(data.message || "Failed to update staff details");
          });
        }
      })
      .then((data) => {
        // Handle the response data
        Toast.fire({
          icon: "success",
          title: data.message,
        });
      })
      .catch((error) => {
        Toast.fire({
          icon: "error",
          title: error.message,
        });
      });
  };
  

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
    <div className="signup-div-container" style={{maxHeight:"500px",minHeight:"400px"}}>
  
      <div className="signup-main-form-container" style={{width:"300px"}}>
        <center>
          <h2 className="signup-form-heading-container">Edit Staff</h2>
        </center>
        <form onSubmit={updateStaffDetails} className="signup-form-container">
          <div className="signup-whole-form-contaner">
            <label className="signup-form-lable-container">Name:</label>
            <input
              type="text"
              name="name"
              className="signin-input-text"
              value={formData.name}
              onChange={handleInputChange}
            />
          </div>

          <div className="signup-whole-form-contaner">
            <label className="signup-form-lable-container">Email:</label>
            <input
              type="email"
              name="email"
              className="signin-input-text"
              value={formData.email}
              readOnly
            />
          </div>
          <div className="signup-whole-form-contaner">
            <label className="signup-form-lable-container">Role:</label>
            <select
              name="role"
              className="signin-input-text"
              value={formData.role}
              onChange={handleInputChange}
            >
              <option value="Admin">Admin</option>
              <option value="Dimension">Dimension</option>
              <option value="Label">Label</option>
              <option value="Accountant">Accountant</option>
              <option value="Dispatch">Dispatch</option>
            </select>
          </div>
          <center>
            <button className="signup-form-button-container" type="submit">
              Update
            </button>
          </center>
        </form>
      </div>
    </div>
    </>
  );
};

export default EditStaffDetails;
