import React, { useState, useEffect } from "react";
import "./index.css";

const CustomerOrder = () => {
  const [formData, setFormData] = useState({
    date: "",
    customerName: "Saicharan",
    servicesReq: "Labling",
    productName: "",
    units: "",
    trackingURL: "",
    fnskuSend: "",
    boxlabelSend: "",
  });

  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const formattedDate = `${year}-${month.toString().padStart(2, "0")}-${day
    .toString()
    .padStart(2, "0")}`;
  console.log(formattedDate);
  useEffect(() => {
    setFormData({ ...formData, date: formattedDate });
  }, []);

  const handleChange = (e) => {
    console.log(formData);
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
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
          readOnly
        />
        <br />
        <label>Customer Name:</label>
        <input
          type="text"
          name="customerName"
          value={formData.customerName}
          onChange={handleChange}
          required
          readOnly
        />
        <br />
        <label>Services Required:</label>
        <select name="servicesReq" onChange={handleChange} required>
          <option value="Labeling">labling</option>
          <option value="Shipping">Shipping</option>
        </select>
        <br />

        <label>Product Name:</label>
        <input
          type="text"
          name="productName"
          onChange={handleChange}
          required
        />
        <br />

        <label>Units:</label>
        <input type="number" name="units" onChange={handleChange} required />
        <br />

        <label>Tracking URL:</label>
        <input type="text" name="trackingURL" onChange={handleChange} />
        <br />

        <label>FNSKU Send:</label>
        <input type="file" name="fnskuSend" onChange={handleChange} />
        <br />

        <label>Box Label Send:</label>
        <input type="file" name="boxlabelSend" onChange={handleChange} />
        <br />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CustomerOrder;
