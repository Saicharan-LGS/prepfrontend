import React, { useState, useEffect } from "react";
import "./index.css";
import { useParams } from "react-router-dom";
import CommonNavbar from "../CommonNavbar";
function ViewDetailedOrder() {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    date: "",
    customerName: "",
    servicesReq: "Prep Service",
    productName: "",
    units: "",
    trackingURL: "",
    fnskuSend: null,
    labelSend: null,
    fnskuSend1: null,
    labelSend1: null,
    status: "",
    fnsku_status: "",
    label_status: "",
    fnskuButton: "",
    labelButton: "",
    fnsku_label_printed: null,
    length: "",
    height: "",
    width: "",
    weight: "",
  });
const token=sessionStorage.getItem("token")
  useEffect(() => {
    // Fetch data using the id passed as a prop
    console.log(id);
    async function fetchData() {
      try {
        const response = await fetch(
          `http://localhost:3009/api/v1/getAdminOrderDetails/${id}`,
          {
            method: "GET",
            headers: {
              Authorization: ` Bearer ${token}`,
            },
          }
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
            fnskuSend1: data.fnsku,
            labelSend1: data.label,
            fnskuButton: data.fnsku_status,
            labelButton: data.label_status,
            fnsku_status: data.fnsku_status,
            label_status: data.label_status,
            fnskuSend: null,
            labelSend: null,
            fnsku_label_printed: data.fnsku_label_printed,
            length: data.length,
            width: data.width,
            height: data.height,
            weight: data.weight,
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
    fnskuSend1,
    labelSend1,
    fnsku_status,
    label_status,
    fnsku_label_printed,
    length,
    width,
    weight,
    height,
  } = formData;

  return (
    <>
    <CommonNavbar/>
    <div className="order-customer-container">
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
              readOnly
            />
          </div>
          <div className="order-customer-input-feild">
            <label className="order-customer-label-name ">Customer Name:</label>
            <input
              className="order-customer-lable-container admin-order-accepted-readonly"
              type="text"
              name="customerName"
              value={customerName}
              readOnly
            />
          </div>
          {/* <div className="order-customer-input-feild">
            <label className="order-customer-label-name">Amount</label>
            <input
              className="order-customer-lable-container"
              type="number"
              name="customerName"
              value={customerName}
              onChange={handleChange}
              required
              readOnly
            />
          </div> */}
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
            <label className="order-customer-label-name">
              Service Required:
            </label>
            <select
              className="order-customer-lable-container admin-order-accepted-readonly"
              value={servicesReq}
              readOnly
            >
              <option value="Prep Service">Prep Service</option>
            </select>
          </div>
          <div className="order-customer-input-feild">
            <label className="order-customer-label-name">Product Name:</label>
            <input
              className="order-customer-lable-container admin-order-accepted-readonly"
              type="text"
              name="productName"
              value={productName}
              readOnly
            />
          </div>
          {/* <div className="order-customer-input-feild-fnsku-status">
            <input
              className="order-customer-lable-container-checkbox admin-order-accepted-readonly"
              type="checkbox"
              name="trackingURL"
              checked={fnsku_status === 1 ? true : false}
              readOnly
            />
            <label className="order-customer-label-name">FNSKU Status</label>
          </div> */}
          <div className="order-customer-input-feild">
            {/* <label className="order-customer-label-name">FNSKU Send:</label>
            <input
              className="order-customer-lable-container order-customer-label-file"
              type="file"
              name="fnskuSend"
              onChange={handleFnskuFileData}
            /> */}
           { fnsku_status==="1" && <button
              type="button"
              onClick={() => openFileInNewTab(fnskuSend1)}
              disabled={fnskuSend1 === null}
              className="order-customer-view-file-button-container"
            >
              View FNSKU File
            </button> }
          </div>

          {/* <div className="order-customer-input-feild-fnsku-status">
            <input
              className="order-customer-lable-container-checkbox"
              type="checkbox"
              name="trackingURL"
              checked={label_status === 1 ? true : false}
              readOnly
            />
            <label className="order-customer-label-name">Label Status</label>
          </div> */}
          <div className="order-customer-input-feild">
            {/* <label className="order-customer-label-name">Box Label Send:</label>
            <input
              className="order-customer-lable-container order-customer-label-file"
              type="file"
              name="labelSend"
              onChange={handleLabelFileData}
            /> */}
           { label_status==="1" && <button
              type="button"
              onClick={() => openFileInNewTab(labelSend1)}
              disabled={labelSend1 === null}
              className="order-customer-view-file-button-container"
            >
              View Box Label File
            </button> }
            {/* <div className="order-customer-input-feild-fnsku-status">
              <input
                className="order-customer-lable-container-checkbox admin-order-accepted-readonly"
                type="checkbox"
                name="trackingURL"
                checked={label_status === 1 ? true : false}
                readOnly
              />
              <label className="order-customer-label-name">
                Payment Status
              </label>
            </div> */}
            {/* <div className="order-customer-input-feild-fnsku-status">
              <input
                className="order-customer-lable-container-checkbox admin-order-accepted-readonly"
                type="checkbox"
                name="trackingURL"
                checked={fnsku_label_printed === 1 ? true : false}
                readOnly
              />
              <label className="order-customer-label-name">Labelling</label>
            </div> */}
          </div>
        </div>
        <div className="order-customer-field3-container">
          <div className="order-customer-input-feild">
            <label className="order-customer-label-name">Units:</label>
            <input
              className="order-customer-lable-container admin-order-accepted-readonly"
              type="number"
              name="units"
              value={units}
              readOnly
            />
          </div>
          <div className="order-customer-input-feild">
            <label className="order-customer-label-name">Tracking URL:</label>
            <input
              className="order-customer-lable-container admin-order-accepted-readonly"
              type="text"
              name="trackingURL"
              value={trackingURL}
              readOnly
            />
          </div>
        </div>
      </form>
    </div>
    </>
  );
}

export default ViewDetailedOrder;
