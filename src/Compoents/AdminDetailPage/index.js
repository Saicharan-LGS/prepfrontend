import React, { useState, useEffect } from "react";
import "./index.css";
import Toast from "../utlis/toast";
import CommonNavbar from "../CommonNavbar";
function OrderViewDetail(props) {
  const id= props.orderId
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
    amount: null,
    instructions:""
  });

  // Define separate state for dimensions and selected units
  const [dimensions, setDimensions] = useState({
    length: null,
    width: null,
    height: null,
    weight: null,
  });
  const [selectedUnits, setSelectedUnits] = useState({
    length: "cm",
    width: "cm",
    height: "cm",
    weight: "g",
  });
  const token = sessionStorage.getItem("token");
  
  const FETCH_URL = process.env.REACT_APP_FETCH_URL

  const fetchData = async () => {
    try {
      const response = await fetch(
        `${FETCH_URL}etAdminOrderDetails/${id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        console.log(data)
        // Split the dimensions into value and unit
        const lengthParts = (data.length || "").match(/([\d.]+)([a-zA-Z]+)/);
        const widthParts = (data.width || "").match(/([\d.]+)([a-zA-Z]+)/);
        const heightParts = (data.height || "").match(/([\d.]+)([a-zA-Z]+)/);
        const weightParts = (data.weight || "").match(/([\d.]+)([a-zA-Z]+)/);

        setFormData({
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
          instructions:data.instructions

          // ... other fields you want to update
        });

        // Set dimensions only if they are not null
        setDimensions({
          length: lengthParts ? parseFloat(lengthParts[1]) : null,
          width: widthParts ? parseFloat(widthParts[1]) : null,
          height: heightParts ? parseFloat(heightParts[1]) : null,
          weight: weightParts ? parseFloat(weightParts[1]) : null,
        });

        // Set selected units
        setSelectedUnits({
          length: lengthParts ? lengthParts[2] : "cm",
          width: widthParts ? widthParts[2] : "cm",
          height: heightParts ? heightParts[2] : "cm",
          weight: weightParts ? weightParts[2] : "g",
        });
      } else {
      }
    } catch (error) {
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFnskuFileData = (e) => {
    const { files } = e.target;
    setFormData({ ...formData, fnskuSend: files[0] });
  };

  const handleLabelFileData = async (e) => {
    const { files } = e.target;
    setFormData({ ...formData, labelSend: files[0] });
  };

  const handleSubmit = (e) => {
    const length1= dimensions.length + selectedUnits.length;
    const width1= dimensions.width + selectedUnits.width;
    const height1= dimensions.height + selectedUnits.height;
    const weight1= dimensions.weight + selectedUnits.weight;
    const formDataToSend = new FormData();
    
    formDataToSend.append("date", date || "");
    formDataToSend.append("name", name || "");
    formDataToSend.append("service", service);
    formDataToSend.append("product", product || "");
    formDataToSend.append("unit", unit || "");
    formDataToSend.append("tracking_url", tracking_url || "");
    formDataToSend.append("fnskuSend", fnskuSend);
    formDataToSend.append("labelSend", labelSend);
    formDataToSend.append("length", length1);
    formDataToSend.append("width", width1);
    formDataToSend.append("weight", weight1);
    formDataToSend.append("height", height1);
    formDataToSend.append("amount", amount);
    formDataToSend.append("status", status);
    formDataToSend.append("instructions",instructions);
    // Add any other fields you want to update

    fetch(`${FETCH_URL}updateOrderDetails/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formDataToSend,
    })
      .then((response) => response.json())
      .then((data) => {
        Toast.fire({
          icon: "success",
          title: data.message,
        });
        fetchData();
      })
      .catch((error) => {
      });
  };

  const PDF_URL = process.env.REACT_APP_PDF_URL

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
    status,
    amount,
    instructions
  } = formData;

  const { length, width, height, weight } = dimensions;

  const unitOptions = {
    length: ["cm", "inches", "feet", "meters"],
    width: ["cm", "inches", "feet", "meters"],
    height: ["cm", "inches", "feet", "meters"],
    weight: ["g", "kg", "lb"],
  };

  const handleUnitChange = (e, dimension) => {
    const selectedUnit = e.target.value;
    setSelectedUnits({
      ...selectedUnits,
      [dimension]: selectedUnit,
    });

    setDimensions({
      ...dimensions,
      [dimension]: dimensions[dimension],
    });
  };

  const handleDimensionsChange = (e, dimension) => {
    const newValue = e.target.value;
    setDimensions({
      ...dimensions,
      [dimension]: newValue,
    });
  };
  return (
    <>
      <div className="order-customer-container">
        <center>
          <h1 className="order-customer-main-heading">Order</h1>
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
                name="Name"
                value={name}
                onChange={handleChange}
                required
                readOnly
              />
            </div>
            {["length", "width", "height", "weight"].map((dimension) => (
              <div key={dimension} className="dimensions-input-container">
                <label className="dimensions-label-text">
                  {dimension.charAt(0).toUpperCase() + dimension.slice(1)}:
                </label>
                <div className="dimension-select-container">
                  <input
                    className="dimensions-input"
                    type="text"
                    name={dimension}
                    value={dimensions[dimension]}
                    onChange={(e) => handleDimensionsChange(e, dimension)}
                  />
                  <select
                    className="dimensions-select"
                    value={selectedUnits[dimension]}
                    onChange={(e) => handleUnitChange(e, dimension)}
                  >
                    {unitOptions[dimension].map((unit) => (
                      <option key={unit} value={unit}>
                        {unit}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            ))}
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
              <label className="order-customer-label-name">Product:</label>
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
                className="order-customer-lable-container"
                type="text"
                name="amount"
                value={amount}
                onChange={handleChange}
              />
            </div>
            <div className="order-customer-input-feild">
              <label className="order-customer-label-name">Instructions</label>
              <input
                className="order-customer-lable-container"
                type="text"
                name="instructions"
                value={instructions}
                onChange={handleChange}
              />
            </div>
            <div className="order-customer-input-feild">
              <label className="order-customer-label-name">Status</label>
              <select
                className="order-customer-lable-container"
                type="text"
                name="status"
                value={status || "Unknown Status"}
                onChange={handleChange}
              >
                <option value="0">Pending</option>
                <option value="1">Rejected</option>
                <option value="2">Received</option>
                <option value="3">Dimension Done</option>
                <option value="4">Labelling Done</option>
                <option value="5">Invoice Generated</option>
                <option value="6">Invoice Accepted</option>
                <option value="7">Invoice Rejected</option>
              </select>
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
          </div>*/}
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

export default OrderViewDetail;
