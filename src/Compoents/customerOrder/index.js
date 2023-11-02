// import React, { Component } from "react";
// import "./index.css";

// class CustomerOrder extends Component {
//   state = {
//     date: "",
//     customerName: "Saicharan",
//     servicesReq: "Labeling",
//     productName: "",
//     units: "",
//     trackingURL: "",
//     fnskuSend: null,
//     labelSend: null,
//   };

//   componentDidMount = () => {
//     const date = new Date();
//     const year = date.getFullYear();
//     const month = date.getMonth() + 1;
//     const day = date.getDate();
//     const formattedDate = `${year}-${month.toString().padStart(2, "0")}-${day
//       .toString()
//       .padStart(2, "0")}`;
//     this.setState({ date: formattedDate });
//   };

//   handleChange = (e) => {
//     const { name, value } = e.target;
//     this.setState((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   handleFnskuSendChange = (e) => {
//     const file = e.target.files[0];
//     this.setState({ fnskuSend: file });
//   };

//   handleBoxlabelSendChange = (e) => {
//     const file = e.target.files[0];
//     this.setState({ labelSend: file });
//   };

//   handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const {
//         date,
//         customerName,
//         servicesReq,
//         productName,
//         units,
//         trackingURL,
//         fnskuSend,
//         labelSend,
//       } = this.state;

//       const formData = new FormData();
//       formData.append("date", date);
//       formData.append("customerName", customerName);
//       formData.append("servicesReq", servicesReq);
//       formData.append("productName", productName);
//       formData.append("units", units);
//       formData.append("trackingURL", trackingURL);
//       formData.append("fnskuSend", fnskuSend);
//       formData.append("labelSend", labelSend);
//       console.log(formData);
//       const token =
//         "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imdhbmd1bGEuc2FpY2hhcmFuOTg0QGdtYWlsLmNvbSIsImlhdCI6MTY5ODgzMjg1MSwiZXhwIjoxNjk5MTEzNjUxfQ.y0BNNtV9boXmV86Wku8Av6vvCJrEjQ4lJ31lU7cqpD0";
//       const response = await fetch(
//         "http://localhost:3009/api/v1/customerorder",
//         {
//           method: "POST",
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//           body: formData,
//         }
//       );
//       if (response.ok) {
//         console.log("Order created successfully");
//       } else {
//         console.error("Error creating the order");
//       }
//     } catch (error) {
//       console.error("Error creating the order: ", error);
//     }
//   };

//   render() {
//     return (
//       <div>
//         <h1>Order Form</h1>
//         <form onSubmit={this.handleSubmit}>
//           <label>Date:</label>
//           <input
//             type="date"
//             name="date"
//             value={this.state.date}
//             onChange={this.handleChange}
//             required
//             readOnly
//           />
//           <br />
//           <label>Customer Name:</label>
//           <input
//             type="text"
//             name="customerName"
//             value={this.state.customerName}
//             onChange={this.handleChange}
//             required
//             readOnly
//           />
//           <br />
//           <label>Services Required:</label>
//           <select name="servicesReq" onChange={this.handleChange} required>
//             <option value="Labeling">Labelling</option>
//             <option value="Shipping">Shipping</option>
//           </select>
//           <br />

//           <label>Product Name:</label>
//           <input type="text" name="productName" onChange={this.handleChange} />
//           <br />

//           <label>Units:</label>
//           <input type="number" name="units" onChange={this.handleChange} />
//           <br />

//           <label>Tracking URL:</label>
//           <input type="text" name="trackingURL" onChange={this.handleChange} />
//           <br />

//           <label>FNSKU Send:</label>
//           <input
//             type="file"
//             name="fnskuSend"
//             onChange={this.handleFnskuSendChange}
//           />
//           <br />

//           <label>Box Label Send:</label>
//           <input
//             type="file"
//             name="labelSend"
//             onChange={this.handleBoxlabelSendChange}
//           />
//           <br />

//           <button type="submit">Submit</button>
//         </form>
//       </div>
//     );
//   }
// }

// export default CustomerOrder;

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
    labelSend: null,
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
    this.setState({ labelSend: file });
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
        labelSend,
      } = this.state;
      console.log("submit called...");
      const formData = new FormData();
      formData.append("date", date);
      formData.append("customerName", customerName);
      formData.append("service", servicesReq);
      formData.append("product", productName);
      formData.append("unit", units);
      formData.append("tracking_url", trackingURL);
      formData.append("fnskuSend", fnskuSend);
      formData.append("labelSend", labelSend);
      console.log(formData);
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imdhbmd1bGEuc2FpY2hhcmFuOTg0QGdtYWlsLmNvbSIsImlhdCI6MTY5ODg0NDY5MiwiZXhwIjoxNjk5MTI1NDkyfQ.aysYHWNIX7rZ9TroDB5APm26A42xNpIh7cZOLI8FRNs";
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
                value={this.state.date}
                onChange={this.handleChange}
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
                value={this.state.customerName}
                onChange={this.handleChange}
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
                onChange={this.handleChange}
                required
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
                onChange={this.handleChange}
                required
              />
            </div>
            <div className="order-customer-input-feild">
              <label className="order-customer-label-name">FNSKU Send:</label>
              <input
                className="order-customer-lable-container"
                type="file"
                name="fnskuSend"
                onChange={this.handleFnskuSendChange}
              />
            </div>
            <div className="order-customer-input-feild">
              <label className="order-customer-label-name">
                Box Label Send:
              </label>
              <input
                className="order-customer-lable-container"
                type="file"
                name="boxlabelSend"
                onChange={this.handleBoxlabelSendChange}
              />
            </div>
          </div>
          <div className="order-customer-field3-container">
            <div className="order-customer-input-feild">
              <label className="order-customer-label-name">Units:</label>
              <input
                className="order-customer-lable-container"
                type="number"
                name="units"
                onChange={this.handleChange}
                required
              />
            </div>
            <div className="order-customer-input-feild">
              <label className="order-customer-label-name">Tracking URL:</label>
              <input
                className="order-customer-lable-container"
                type="text"
                name="trackingURL"
                onChange={this.handleChange}
              />
            </div>
          </div>
        </form>
        <center>
          <button
            onClick={this.handleSubmit}
            className="order-customer-button-container"
            type="button"
          >
            Submit
          </button>
        </center>
      </div>
    );
  }
}

export default CustomerOrder;
