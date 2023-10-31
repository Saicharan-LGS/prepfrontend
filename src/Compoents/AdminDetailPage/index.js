import React, { useState, useEffect } from "react";
import "./index.css";
import { useParams } from "react-router-dom";
const OrderViewDetail = () => {
    const { id } = useParams(); 
  const [formData, setFormData] = useState({
    date: "",
    customerName: "",
    servicesReq: "Labeling",
    productName: "",
    units: "",
    trackingURL: "",
    fnskuSend: "",
    boxlabelSend: "",
  });

//   useEffect(() => {
//     // Make a GET request to fetch initial data
//     fetch()
//       .then((response) => response.json())
//       .then((data) => {
//         // Populate the formData state with the fetched data
//         setFormData(data);
//       })
//       .catch((error) => {
//         console.error("Error fetching data: ", error);
//       });
//   }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileData=(e)=>{
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    handleSubmit(e)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData)
    // Make a PUT request to update the data
    fetch("your-api-endpoint-here", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Data updated successfully: ", data);
      })
      .catch((error) => {
        console.error("Error updating data: ", error);
      });
  };

  const openFileInNewTab = (fileURL) => {
    // Open the file URL in a new window or tab
    window.open(fileURL, "_blank");
  };

  return (
    <div>
      <h1>Order Form</h1>
      <form onSubmit={handleSubmit}>
        <label>Date:</label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />
        <br />
        <label>Customer Name:</label>
        <input
          type="text"
          name="customerName"
          value={formData.customerName}
          onChange={handleChange}
          required
        />
        <br />
        <label>Services Required:</label>
        <select
          name="servicesReq"
          value={formData.servicesReq}
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
          value={formData.productName}
          onChange={handleChange}
          required
        />
        <br />
        <label>Units:</label>
        <input
          type="number"
          name="units"
          value={formData.units}
          onChange={handleChange}
          required
        />
        <br />
        <label>Tracking URL:</label>
        <input
          type="text"
          name="trackingURL"
          value={formData.trackingURL}
          onChange={handleChange}
        />
        <br />
        <label>FNSKU Send:</label>
        <input
          type="file"
          name="fnskuSend"
          onChange={handleFileData}
        />
         <button
            type="button"
            onClick={() => openFileInNewTab(formData.fnskuSend)}
          >
            View FNSKU File
          </button>
        <br />
        <label>Box Label Send:</label>
        <input
          type="file"
          name="boxlabelSend"
          onChange={handleFileData}
        />
        <br />
        <button
            type="button"
            onClick={() => openFileInNewTab(formData.boxlabelSend)}
          >
            View Box Label File
          </button>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default OrderViewDetail;
