import React, { useState, useEffect } from "react";
import "./index.css";
import { useParams, useNavigate } from "react-router-dom";
import { IoArrowBackCircle } from "react-icons/io5";
import CommonNavbar from "../CommonNavbar";
function CustomerOrderViewDetail({ orderId, setStatus }) {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    date: "",
    name: "",
    service: "Prep Service",
    product: "",
    unit: "",
    tracking_url: "",
    fnskuSend: null,
    labelSend: null,
    fnskuSend1: null,
    labelSend1: null,
    status: "",
    fnsku_status: "",
    label_status: "",
    fnskuButton: "",
    labelButton: "",
    length: "",
    height: "",
    width: "",
    weight: "",
    amount: "",
    instructions:""
  });

  const statusLabels = {
    0: "Pending",
    1: "Rejected",
    2: "Received",
    3: "Dimension Done",
    4: "Labelling Done",
    5: "Invoice Generated",
    6: "Invoice Accepted",
    7: "Invoice Rejected",
  };
  const token = sessionStorage.getItem("token");
  const FETCH_URL = process.env.REACT_APP_FETCH_URL
  const PDF_URL = process.env.REACT_APP_PDF_URL


  const fetchData = async () => {
    try {
      const response = await fetch(
        `${FETCH_URL}getCustomerDetailOrder/${orderId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`, // Set the Content-Type to JSON
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        console.log(data)
        setFormData({
          ...formData,
          date: data.date,
          name: data.name,
          service: data.service,
          product: data.product,
          unit: data.unit,
          tracking_url: data.tracking_url,
          fnskuSend1: data.fnsku,
          labelSend1: data.label,
          fnskuButton: data.fnsku_status,
          labelButton: data.label_status,
          fnsku_status: data.fnsku_status,
          label_status: data.label_status,
          fnskuSend: null,
          labelSend: null,
          length: data.length,
          width: data.width,
          height: data.height,
          weight: data.weight,
          amount: data.amount,
          status: data.status,
          instructions:data.instructions,
        });
      } else {
      }
    } catch (error) {
    }
  };
  useEffect(() => {
    fetchData();
  }, [id]);

  const handleBackClick = () => {
    const prevStatus = localStorage.getItem("prevStatus");
    console.log(prevStatus, "bye");
    setStatus(prevStatus);
    localStorage.setItem("status", prevStatus);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFnskuFileData = (e) => {
    const { name, files } = e.target;
    setFormData({ ...formData, ["fnskuSend"]: files[0] });
  };

  const handleLabelFileData = async (e) => {
    const { name, files } = e.target;
    setFormData({ ...formData, ["labelSend"]: files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append("date", date);
    formDataToSend.append("name", name);
    formDataToSend.append("service", service);
    formDataToSend.append("product", product);
    formDataToSend.append("unit", unit);
    formDataToSend.append("tracking_url", tracking_url);
    formDataToSend.append("fnskuSend", fnskuSend);
    formDataToSend.append("labelSend", labelSend);
    formDataToSend.append("instructions",instructions)
    formDataToSend.append("orderId",orderId)
    // Add any other fields you want to update

    fetch(`${FETCH_URL}customerOrderDetail/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`, // Set the Content-Type to JSON
      },
      body: formDataToSend,
    })
      .then((response) => response.json())
      .then(() => {
        fetchData();
      })
      .catch((error) => {
        fetchData();
      });
  };

  const openFileInNewTab = (fileURL) => {
    if (fileURL) {
      window.open(`${PDF_URL}${fileURL}`, "_blank");
    }
  };

  const {
    date,
    name,
    service,
    product,
    unit,
    tracking_url,
    fnskuSend,
    labelSend,
    fnskuSend1,
    labelSend1,
    fnsku_status,
    label_status,
    length,
    width,
    weight,
    height,
    amount,
    status,
    instructions
  } = formData;

  return (
    <>
      <div className="order-customer-container">
        <button className="order-customer-backward-button" onClick={handleBackClick}>
          <IoArrowBackCircle className="order-customer-backward-icon" />
        </button>
        <center>
          <h1 className="order-customer-main-heading">Customer Orders</h1>
        </center>
        <form className="order-customer-from-container">
          <div className="order-customer-field1-container">
            <div className="order-customer-input-feild">
              <label className="order-customer-label-name">Date:</label>
              <input
                className="order-customer-lable-container admin-order-accepted-readonly"
                type="date"
                name="date"
                value={date}
                onChange={handleChange}
                required
                readOnly
              />
            </div>
            <div className="order-customer-input-feild">
              <label className="order-customer-label-name"> Name:</label>
              <input
                className="order-customer-lable-container admin-order-accepted-readonly"
                type="text"
                name="name"
                value={name}
                onChange={handleChange}
                required
                readOnly
              />
            </div>
            <div className="order-customer-input-feild">
              <label className="order-customer-label-name">Length</label>
              <input
                className="order-customer-lable-container admin-order-accepted-readonly"
                type="text"
                name="customerName"
                value={length}
                readOnly
              />
            </div>
            <div className="order-customer-input-feild">
              <label className="order-customer-label-name">Width</label>
              <input
                className="order-customer-lable-container admin-order-accepted-readonly"
                type="text"
                name="customerName"
                value={width}
                readOnly
              />
            </div>
            <div className="order-customer-input-feild">
              <label className="order-customer-label-name">Height</label>
              <input
                className="order-customer-lable-container admin-order-accepted-readonly"
                type="text"
                name="customerName"
                value={height}
                readOnly
              />
            </div>
            <div className="order-customer-input-feild">
              <label className="order-customer-label-name">Weight</label>
              <input
                className="order-customer-lable-container admin-order-accepted-readonly"
                type="text"
                name="customerName"
                value={weight}
                readOnly
              />
            </div>
          </div>
          <div className="order-customer-field2-container">
            <div className="order-customer-input-feild">
              <label className="order-customer-label-name">Service:</label>
              <select
                className="order-customer-lable-container"
                onChange={handleChange}
                required
                value={service}
              >
                <option value="Prep Service">Prep Service</option>
              </select>
            </div>
            <div className="order-customer-input-feild">
              <label className="order-customer-label-name">Product :</label>
              <input
                className="order-customer-lable-container"
                type="text"
                name="product"
                value={product}
                onChange={handleChange}
                required
              />
            </div>
            <div className="order-customer-input-feild">
              <label className="order-customer-label-name">FNSKU Send:</label>
              <input
                className="order-customer-lable-container order-customer-label-file"
                type="file"
                name="fnskuSend"
                onChange={handleFnskuFileData}
              />
              {fnsku_status === 1 && (
                <button
                  type="button"
                  onClick={() => openFileInNewTab(fnskuSend1)}
                  disabled={fnskuSend1 === null}
                  className="order-customer-view-file-button-container"
                >
                  View FNSKU File
                </button>
              )}
            </div>
            <div className="order-customer-input-feild">
              <label className="order-customer-label-name">
                Box Label Send:
              </label>
              <input
                className="order-customer-lable-container order-customer-label-file"
                type="file"
                name="labelSend"
                onChange={handleLabelFileData}
              />
              {label_status === 1 && (
                <button
                  type="button"
                  onClick={() => openFileInNewTab(labelSend1)}
                  disabled={labelSend1 === null}
                  className="order-customer-view-file-button-container"
                >
                  View Box Label File
                </button>
              )}
            </div>
          </div>
          <div className="order-customer-field3-container">
            <div className="order-customer-input-feild">
              <label className="order-customer-label-name">Unit:</label>
              <input
                className="order-customer-lable-container"
                type="number"
                name="unit"
                value={unit}
                onChange={handleChange}
                required
              />
            </div>
            <div className="order-customer-input-feild">
              <label className="order-customer-label-name">Tracking_url:</label>
              <input
                className="order-customer-lable-container"
                type="text"
                name="tracking_url"
                value={tracking_url}
                onChange={handleChange}
              />
            </div>
            <div className="order-customer-input-feild">
              <label className="order-customer-label-name">Amount</label>
              <input
                className="order-customer-lable-container admin-order-accepted-readonly"
                type="text"
                name="tracking_url"
                value={amount}
                onChange={handleChange}
              />
            </div>
            <div className="order-customer-input-feild">
              <label className="order-customer-label-name">Instructions</label>
              <input
                className="order-customer-lable-container "
                type="text"
                name="instructions"
                value={instructions}
                onChange={handleChange}
              />
            </div>
            <div className="order-customer-input-feild">
              <label className="order-customer-label-name">Status</label>
              <input
                className="order-customer-lable-container"
                type="text"
                name="tracking_url"
                value={statusLabels[status] || "Unknown Status"}
                onChange={handleChange}
              />
            </div>
            {/* <div className="order-customer-input-feild-fnsku-status">
            <input
              className="order-customer-lable-container-checkbox"
              type="checkbox"
              name="tracking_url"
              checked={fnsku_status === 1 ? true : false}
            />
            <label className="order-customer-label-name">FNSKU Status</label>
          </div>
          <div className="order-customer-input-feild-fnsku-status">
            <input
              className="order-customer-lable-container-checkbox"
              type="checkbox"
              name="tracking_url"
              checked={label_status === 1 ? true : false}
            />
            <label className="order-customer-label-name">Label Status</label>
          </div> */}
          </div>
        </form>
        <center>
          <button
            onClick={handleSubmit}
            className="order-customer-button-container"
            type="button"
          >
            Submit
          </button>
        </center>
      </div>
    </>
  );
}

export default CustomerOrderViewDetail;
