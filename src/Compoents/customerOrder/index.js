import React, { Component } from "react";
import "./index.css";

class CustomerOrder extends Component {
  state = {
    date: "",
    customerName: "Saicharan",
    servicesReq: "Labeling",
    productName: "",
    units: "",
    trackingURL: "",
    fnskuSend: null,
    boxlabelSend: null,
  };

  componentDidMount = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const formattedDate = `${year}-${month.toString().padStart(2, "0")}-${day
      .toString()
      .padStart(2, "0")}`;
    this.setState({ date: formattedDate });
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  handleFnskuSendChange = (e) => {
    const file = e.target.files[0];
    this.setState({ fnskuSend: file });
  };

  handleBoxlabelSendChange = (e) => {
    const file = e.target.files[0];
    this.setState({ boxlabelSend: file });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const {
        date,
        customerName,
        servicesReq,
        productName,
        units,
        trackingURL,
        fnskuSend,
        boxlabelSend,
      } = this.state;

      const formData = new FormData();
      formData.append("date", date);
      formData.append("customerName", customerName);
      formData.append("servicesReq", servicesReq);
      formData.append("productName", productName);
      formData.append("units", units);
      formData.append("trackingURL", trackingURL);
      formData.append("fnskuSend", fnskuSend);
      formData.append("boxlabelSend", boxlabelSend);
      console.log(formData);
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imdhbmd1bGEuc2FpY2hhcmFuOTg0QGdtYWlsLmNvbSIsImlhdCI6MTY5ODc1MTY0OSwiZXhwIjoxNjk4NzU1MjQ5fQ.ZtEO4BhP3jGfiUB-dYYgF6rhuqtbhnU54LbOjTp5EG4";
      const response = await fetch(
        "http://localhost:3009/api/v1/customerorder",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );
      if (response.ok) {
        console.log("Order created successfully");
      } else {
        console.error("Error creating the order");
      }
    } catch (error) {
      console.error("Error creating the order: ", error);
    }
  };

  render() {
    return (
      <div>
        <h1>Order Form</h1>
        <form onSubmit={this.handleSubmit}>
          <label>Date:</label>
          <input
            type="date"
            name="date"
            value={this.state.date}
            onChange={this.handleChange}
            required
            readOnly
          />
          <br />
          <label>Customer Name:</label>
          <input
            type="text"
            name="customerName"
            value={this.state.customerName}
            onChange={this.handleChange}
            required
            readOnly
          />
          <br />
          <label>Services Required:</label>
          <select name="servicesReq" onChange={this.handleChange} required>
            <option value="Labeling">Labelling</option>
            <option value="Shipping">Shipping</option>
          </select>
          <br />

          <label>Product Name:</label>
          <input type="text" name="productName" onChange={this.handleChange} />
          <br />

          <label>Units:</label>
          <input type="number" name="units" onChange={this.handleChange} />
          <br />

          <label>Tracking URL:</label>
          <input type="text" name="trackingURL" onChange={this.handleChange} />
          <br />

          <label>FNSKU Send:</label>
          <input
            type="file"
            name="fnskuSend"
            onChange={this.handleFnskuSendChange}
          />
          <br />

          <label>Box Label Send:</label>
          <input
            type="file"
            name="boxlabelSend"
            onChange={this.handleBoxlabelSendChange}
          />
          <br />

          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default CustomerOrder;
