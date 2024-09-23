import React, { useEffect, useState } from "react";
import { ImCancelCircle } from "react-icons/im";
import Toast from "../utlis/toast";

const EditCustomerDetails = ({ id, onClose, fetchProducts }) => {
  const [formData, setFormData] = useState({
    name: "",
    whatsapp_group_name: "",
  });

  useEffect(() => {
    getCustomerDetails(id);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const getCustomerDetails = (id) => {
    const token = sessionStorage.getItem("token");
    const url = `${process.env.REACT_APP_FETCH_URL}get-customer-details-by-id/${id}`;
    fetch(url, {
      method: "GET",
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
        const { name, whatsapp_group_name } = data.data;
        setFormData({
          name: name,

          whatsapp_group_name: whatsapp_group_name,
        });
      })
      .catch((error) => {});
  };

  const updateStaffDetails = (e) => {
    e.preventDefault();
    const token = sessionStorage.getItem("token");
    const url = `${process.env.REACT_APP_FETCH_URL}update-customer-details-by-id/${id}`;

    fetch(url, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        onClose();
        if (response.ok) {
          return response.json();
          fetchProducts();
        } else {
          return response.json().then((data) => {
            throw new Error(
              data.message || "Failed to update customer details"
            );
          });
        }
      })
      .then((data) => {
        fetchProducts();
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
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h2 className="customer-update-password-heading">Staff Edit</h2>
        <ImCancelCircle
          onClick={onClose}
          style={{
            fontSize: "24px",
            color: "#212d45",
            cursor: "pointer",
            marginBottom: "10px",
          }}
        />
      </div>
      <div className="customer-update-password-main-container">
        <form
          className="customer-update-password-form-container"
          onSubmit={updateStaffDetails}
        >
          <div className="customer-update-password-input-container">
            <label
              htmlFor="oldPassword"
              className="customer-update-password-label-name"
            >
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="customer-update-password-input-field"
              placeholder="Enter current password"
            />
          </div>

          <div className="customer-update-password-input-container">
            <label
              htmlFor="groupname"
              className="customer-update-password-label-name"
            >
              whatsapp_group_name
            </label>
            <input
              name="whatsapp_group_name"
              type="text"
              id="groupname"
              value={formData.whatsapp_group_name}
              onChange={handleInputChange}
              required
              className="customer-update-password-input-field"
              placeholder="Enter Whatsapp Group Name"
            />
          </div>
          <button type="submit" className="customer-update-password-button">
            Update
          </button>
        </form>
      </div>
    </>
  );
};

export default EditCustomerDetails;
