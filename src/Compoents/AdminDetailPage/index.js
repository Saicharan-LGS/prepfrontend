import React, { useState, useEffect } from "react";
import "./index.css";
import { useParams } from "react-router-dom";
function OrderViewDetail() {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    date: "",
    customerName: "",
    servicesReq: "Labeling",
    productName: "",
    units: "",
    trackingURL: "",
    fnskuSend: null,
    labelSend: null,
    status: "",
    fnsku_status:"",
    label_status:"",
    fnskuButton: "",
    labelButton: "",
  });

  useEffect(() => {
    // Fetch data using the id passed as a prop
    console.log(id);
    async function fetchData() {
      try {
        const response = await fetch(
          `http://localhost:3009/api/v1/getAdminOrderDetails/${id}`
        );
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setFormData({
            ...formData,
            date: data.date,
            customerName: data.name,
            servicesReq: data.service,
            productName: data.product,
            units: data.unit,
            trackingURL: data.tracking_url,
            fnskuSend: data.fnsku,
            labelSend: data.label,
            fnskuButton: data.fnsku_status,
            labelButton: data.label_status,
            fnsku_status:data.fnsku_status,
            label_status:data.label_status,
            // ... other fields you want to update
          });
        } else {
          console.error("Failed to fetch data");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, [id,formData.labelSend,formData.fnskuSend]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileData = (e) => {
    const { name, files } = e.target;
    if (files.length > 0) {
      // New file uploaded, set it
      setFormData({ ...formData, [name]: files[0] });
    }
    // No new file uploaded, keep the existing file
    handleSubmit(e);
  };

  // const changeStatus = (e) => {
  //   setFormData({ ...formData, status: "accepted" });
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    for (const key in formData) {
      if (formData[key] !== null) {
        formDataToSend.append(key, formData[key]);
      }
    }
    fetch(`http://localhost:3009/api/v1/updateOrderDetails/${id}`, {
      method: "PUT",
      body: formDataToSend,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Data submitted successfully: ", data);
        console.log(data);
      })
      .catch((error) => {
        console.error("Error submitting data: ", error);
      });
  };

  const openFileInNewTab = (fileURL) => {
    if (fileURL) {
      console.log(fileURL);
      window.open(`http://localhost:3009/${fileURL}`, "_blank");
    }
  };

  const {
    date,
    customerName,
    servicesReq,
    productName,
    units,
    trackingURL,
    fnskuSend,
    labelSend,
    fnsku_status,
    label_status,
    labelButton,
    fnskuButton,
  } = formData;
  console.log(fnskuSend);
  // return (
  //   <div>
  //     <h1>Order Form</h1>
  //     <form onSubmit={handleSubmit}>
  //       <label>Date:</label>
  //       <input
  //         type="date"
  //         name="date"
  //         value={date}
  //         onChange={handleChange}
  //         required
  //       />
  //       <br />
  //       <label>Customer Name:</label>
  //       <input
  //         type="text"
  //         name="customerName"
  //         value={customerName}
  //         onChange={handleChange}
  //         required
  //       />
  //       <br />
  //       <label>Services Required:</label>
  //       <select
  //         name="servicesReq"
  //         value={servicesReq}
  //         onChange={handleChange}
  //         required
  //       >
  //         <option value="Labeling">Labeling</option>
  //         <option value="Shipping">Shipping</option>
  //       </select>
  //       <br />
  //       <label>Product Name:</label>
  //       <input
  //         type="text"
  //         name="productName"
  //         value={productName}
  //         onChange={handleChange}
  //         required
  //       />
  //       <br />
  //       <label>Units:</label>
  //       <input
  //         type="number"
  //         name="units"
  //         value={units}
  //         onChange={handleChange}
  //         required
  //       />
  //       <br />
  //       <label>Tracking URL:</label>
  //       <input
  //         type="text"
  //         name="trackingURL"
  //         value={trackingURL}
  //         onChange={handleChange}
  //       />
  //       <br />
  //       <label>FNSKU Send:</label>
  //       <input type="file" name="fnskuSend" onChange={handleFileData} />
  //       <button
  //         type="button"
  //         onClick={() => openFileInNewTab(fnskuSend)}
  //         disabled={fnskuSend === null}
  //       >
  //         View FNSKU File
  //       </button>
  //       <br />
  //       <label>Box Label Send:</label>
  //       <input type="file" name="labelSend" onChange={handleFileData} />
  //       <button
  //         type="button"
  //         onClick={() => openFileInNewTab(labelSend)}
  //         disabled={labelSend === null}
  //       >
  //         View Box Label File
  //       </button>
  //       <button type="submit">Submit</button>
  //     </form>
  //   </div>
  // );
  return (
    <div className="order-customer-container">
      <center>
        <h1 className="order-customer-main-heading">Customer Orders</h1>
      </center>
      <form className="order-customer-from-container">
        <div className="order-customer-field1-container">
          <div className="order-customer-input-feild">
            <label className="order-customer-label-name">Date:</label>
            <input
              className="order-customer-lable-container"
              type="date"
              name="date"
              value={date}
              onChange={handleChange}
              required
              readOnly
            />
          </div>
          <div className="order-customer-input-feild">
            <label className="order-customer-label-name">
              Customer Name:
            </label>
            <input
              className="order-customer-lable-container"
              type="text"
              name="customerName"
              value={customerName}
              onChange={handleChange}
              required
              readOnly
            />
          </div>
        </div>
        <div className="order-customer-field2-container">
          <div className="order-customer-input-feild">
            <label className="order-customer-label-name">
              Services Required:
            </label>
            <select
              className="order-customer-lable-container"
              onChange={handleChange}
              required
              value={servicesReq}
            >
              <option value="Labeling">labling</option>
              <option value="Shipping">Shipping</option>
            </select>
          </div>
          <div className="order-customer-input-feild">
            <label className="order-customer-label-name">Product Name:</label>
            <input
              className="order-customer-lable-container"
              type="text"
              name="productName"
              value={productName}
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
              onChange={handleFileData}
             
            />
            <button
              type="button"
              onClick={() => openFileInNewTab(fnskuSend)}
              disabled={fnskuSend === null}
              className="order-customer-view-file-button-container"
            >
              View FNSKU File
          </button>
          </div>
          <div className="order-customer-input-feild">
            <label className="order-customer-label-name">
              Box Label Send:
            </label>
            <input
              className="order-customer-lable-container order-customer-label-file"
              type="file"
              name="labelSend"
              onChange={handleFileData}
            />
            <button
              type="button"
              onClick={() => openFileInNewTab(labelSend)}
              disabled={labelSend === null}
              className="order-customer-view-file-button-container"
            >
              View Box Label File
            </button>
          </div>
        </div>
        <div className="order-customer-field3-container">
          <div className="order-customer-input-feild">
            <label className="order-customer-label-name">Units:</label>
            <input
              className="order-customer-lable-container"
              type="number"
              name="units"
              value={units}
              onChange={handleChange}
              required
            />
          </div>
          <div className="order-customer-input-feild">
            <label className="order-customer-label-name">Tracking URL:</label>
            <input
              className="order-customer-lable-container"
              type="text"
              name="trackingURL"
              value={trackingURL}
              onChange={handleChange}
            />
          </div>
          <div className="order-customer-input-feild-fnsku-status">
            <input
                className="order-customer-lable-container-checkbox"
                type="checkbox"
                name="trackingURL"
                checked={fnsku_status===1 ? true : false}
              />
            <label className="order-customer-label-name">FNSKU Status</label>
            
          </div>
          <div className="order-customer-input-feild-fnsku-status">
            <input
              className="order-customer-lable-container-checkbox"
              type="checkbox"
              name="trackingURL"
              checked={label_status===1 ? true : false}
            />
            <label className="order-customer-label-name">Label Status</label>
          </div>
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
  );
}

export default OrderViewDetail;
