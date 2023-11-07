import React, { useState, useEffect } from "react";
import "./index.css";
import { useParams } from "react-router-dom";
function CustomerOrderViewDetail() {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    date: "",
    name: "",
    service: "Labeling",
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

  const handleFnskuFileData = (e) => {
    const { name, files } = e.target;
    console.log(e.target.name);
    console.log("fnsku called", files[0]);
     setFormData({ ...formData, ["fnskuSend"]: files[0] });
  };
  
  const handleLabelFileData = async (e) => {
    const { name, files } = e.target;
    console.log(e.target.name);
    console.log("label called", files[0]);
   setFormData({ ...formData, ["labelSend"]: files[0] });
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    console.log(fnskuSend, labelSend);
    formDataToSend.append("date", date);
    formDataToSend.append("name", name);
    formDataToSend.append("service", service);
    formDataToSend.append("product", product);
    formDataToSend.append("unit", unit);
    formDataToSend.append("tracking_url", tracking_url);
    formDataToSend.append("fnskuSend", fnskuSend);
    formDataToSend.append("labelSend", labelSend);

    // Add any other fields you want to update

    fetch(`http://localhost:3009/api/v1/customerOrderDetail/${id}`, {
      method: "PUT",
      body: formDataToSend,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Data submitted successfully: ", data);
        console.log(formDataToSend);
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
  } = formData;

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
            <label className="order-customer-label-name"> Name:</label>
            <input
              className="order-customer-lable-container"
              type="text"
              name="name"
              value={name}
              onChange={handleChange}
              required
              readOnly
            />
          </div>
        </div>
        <div className="order-customer-field2-container">
          <div className="order-customer-input-feild">
            <label className="order-customer-label-name">
              Service:
            </label>
            <select
              className="order-customer-lable-container"
              onChange={handleChange}
              required
              value={service}
            >
              <option value="Labeling">labeling</option>
              <option value="Shipping">Shipping</option>
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
            <button
              type="button"
              onClick={() => openFileInNewTab(fnskuSend1)}
              disabled={fnskuSend1 === null}
              className="order-customer-view-file-button-container"
            >
              View FNSKU File
            </button>
          </div>
          <div className="order-customer-input-feild">
            <label className="order-customer-label-name">Box Label Send:</label>
            <input
              className="order-customer-lable-container order-customer-label-file"
              type="file"
              name="labelSend"
              onChange={handleLabelFileData}
            />
            <button
              type="button"
              onClick={() => openFileInNewTab(labelSend1)}
              disabled={labelSend1 === null}
              className="order-customer-view-file-button-container"
            >
              View Box Label File
            </button>
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
          <div className="order-customer-input-feild-fnsku-status">
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

export default CustomerOrderViewDetail;

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
//       <input type="file" name="fnskuSend" onChange={handleFnskuFileData} />
//       <button
//         type="button"
//         onClick={() => openFileInNewTab(fnskuSend1)}
//         disabled={fnskuSend1 === null}
//       >
//         View FNSKU File
//       </button>
//       <br />
//       <label>Box Label Send:</label>
//       <input type="file" name="labelSend" onChange={handleLabelFileData} />
//       <button
//         type="button"
//         onClick={() => openFileInNewTab(labelSend1)}
//         disabled={labelSend1 === null}
//       >
//         View Box Label File
//       </button>
//       <button type="submit">Submit</button>
//     </form>
//   </div>
// );
