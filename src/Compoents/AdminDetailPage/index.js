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
    boxlabelSend: null,
    status: "",
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
  }, [id]);

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

  const changeStatus = (e) => {
    setFormData({ ...formData, status: "accepted" });
  };

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
    labelButton,
    fnskuButton,
  } = formData;
  console.log(fnskuSend);
  return (
    <div>
      <h1>Order Form</h1>
      <form onSubmit={handleSubmit}>
        <label>Date:</label>
        <input
          type="date"
          name="date"
          value={date}
          onChange={handleChange}
          required
        />
        <br />
        <label>Customer Name:</label>
        <input
          type="text"
          name="customerName"
          value={customerName}
          onChange={handleChange}
          required
        />
        <br />
        <label>Services Required:</label>
        <select
          name="servicesReq"
          value={servicesReq}
          onChange={handleChange}
          required
        >
          <option value="Labeling">Labeling</option>
          <option value="Shipping">Shipping</option>
        </select>
        <br />
        <label>Product Name:</label>
        <input
          type="text"
          name="productName"
          value={productName}
          onChange={handleChange}
          required
        />
        <br />
        <label>Units:</label>
        <input
          type="number"
          name="units"
          value={units}
          onChange={handleChange}
          required
        />
        <br />
        <label>Tracking URL:</label>
        <input
          type="text"
          name="trackingURL"
          value={trackingURL}
          onChange={handleChange}
        />
        <br />
        <label>FNSKU Send:</label>
        <input type="file" name="fnskuSend" onChange={handleFileData} />
        <button
          type="button"
          onClick={() => openFileInNewTab(fnskuSend)}
          disabled={fnskuSend === null}
        >
          View FNSKU File
        </button>
        <br />
        <label>Box Label Send:</label>
        <input type="file" name="labelSend" onChange={handleFileData} />
        <button
          type="button"
          onClick={() => openFileInNewTab(labelSend)}
          disabled={labelSend === null}
        >
          View Box Label File
        </button>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default OrderViewDetail;
