import React, { useState, useEffect } from "react";
import "./index.css";
import Toast from "../utlis/toast";
import { useNavigate } from "react-router-dom";

const CustomerOrder = ({ history }) => {
  const [date, setDate] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [servicesReq, setServicesReq] = useState("Prep Service");
  const [productName, setProductName] = useState("");
  const [units, setUnits] = useState("");
  const [trackingURL, setTrackingURL] = useState("");
  const [fnskuSend, setFnskuSend] = useState(null);
  const [labelSend, setLabelSend] = useState(null);
  const [customerId, setCustomerId] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    console.log(token);
    fetch("http://localhost:3009/api/v1/customerdata", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`, // You should include your authorization token here
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json(); // Assuming the response is in JSON format
        } else {
          throw new Error("Failed to fetch customer data");
        }
      })
      .then((data) => {
        // Set the customerName in the state based on the response data
        console.log(data);
        setCustomerName(data.name);
        setCustomerId(data.id);
      })
      .catch((error) => {
        console.error("Error fetching customer data: ", error);
      });

    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const day = currentDate.getDate();
    const formattedDate = `${year}-${month.toString().padStart(2, "0")}-${day
      .toString()
      .padStart(2, "0")}`;
    setDate(formattedDate);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "date":
        setDate(value);
        break;
      case "customerName":
        setCustomerName(value);
        break;
      case "servicesReq":
        setServicesReq(value);
        break;
      case "productName":
        setProductName(value);
        break;
      case "units":
        setUnits(value);
        break;
      case "trackingURL":
        setTrackingURL(value);
        break;
      default:
        break;
    }
  };

  const handleFnskuSendChange = (e) => {
    const file = e.target.files[0];
    setFnskuSend(file);
  };

  const handleLabelSendChange = (e) => {
    const file = e.target.files[0];
    setLabelSend(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = sessionStorage.getItem("token");
      const formData = new FormData();
      formData.append("date", date);
      formData.append("customerName", customerName);
      formData.append("service", servicesReq);
      formData.append("product", productName);
      formData.append("units", units);
      formData.append("tracking_url", trackingURL);
      formData.append("fnskuSend", fnskuSend);
      formData.append("labelSend", labelSend);
      formData.append("customer_id", customerId);
      console.log(formData);
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
        response.json().then((data) => {
          Toast.fire({
            icon: "success",
            title: data.message,
          });
        });
        setProductName("");
        setUnits("");
        setTrackingURL("");
        setFnskuSend(null);
        setLabelSend(null);
        navigate("/customernavbar");
      } else {
        response.json().then((data) => {
          Toast.fire({
            icon: "error",
            title: data.message,
          });
        });
      }
    } catch (error) {
      console.error("Error creating the order: ", error);
    }
  };

  return (
    <>
      <div className="order-customer-container">
        <center>
          <h1 className="order-customer-main-heading">Post Order</h1>
        </center>
        <form onSubmit={handleSubmit}>
          <div className="order-customer-from-container">
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
              <div className="order-customer-input-feild">
                <label className="order-customer-label-name">FNSKU Send:</label>
                <input
                  className="order-customer-lable-container order-customer-label-file"
                  type="file"
                  name="fnskuSend"
                  onChange={handleFnskuSendChange}
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
                  name="servicesReq"
                  value={servicesReq}
                  onChange={handleChange}
                  required
                >
                  <option value="Prep Service">Prep Service</option>
                </select>
              </div>
              <div className="order-customer-input-feild">
                <label className="order-customer-label-name">
                  Product Name:
                </label>
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
                <label className="order-customer-label-name">Label Send:</label>
                <input
                  className="order-customer-lable-container order-customer-label-file"
                  type="file"
                  name="labelSend"
                  onChange={handleLabelSendChange}
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
                  value={units}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="order-customer-input-feild">
                <label className="order-customer-label-name">
                  Tracking URL:
                </label>
                <input
                  className="order-customer-lable-container"
                  type="text"
                  name="trackingURL"
                  value={trackingURL}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>
          <div className="order-customer-submit-button-container">
            <button className="order-customer-button-container" type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CustomerOrder;
