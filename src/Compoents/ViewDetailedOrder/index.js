import React, { useState, useEffect } from "react";
import "./index.css";
import { useParams,useNavigate } from "react-router-dom";
import CommonNavbar from "../CommonNavbar";
import { AiOutlineFilePdf } from "react-icons/ai";
import CustomerDimensionView from "../CustomerDimensionView";
import { Box, Modal } from "@mui/material";
import { IoArrowBackCircle } from "react-icons/io5";
function ViewDetailedOrder({setStatus}) {
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
    instructions: "",
  });
  const [isModalOpen, setModalOpen] = React.useState(false);
  const token = sessionStorage.getItem("token");
  const role = sessionStorage.getItem("role")

  const FETCH_URL = process.env.REACT_APP_FETCH_URL;
  const PDF_URL = process.env.REACT_APP_PDF_URL;

  useEffect(() => {
    // Fetch data using the id passed as a prop
    async function fetchData() {
      try {
        const response = await fetch(`${FETCH_URL}getAdminOrderDetails/${id}`, {
          method: "GET",
          headers: {
            Authorization: ` Bearer ${token}`,
          },
        });
        if (response.ok) {
          const data1 = await response.json();
          console.log(data1, "data saicharan");
          const data = data1.order;

          const fnskuFiles =
            data1.files.filter((file) => file.type === "fnskuSend") || [];

          const labelFiles =
            data1.files.filter((file) => file.type === "labelSend") || [];

          console.log(labelFiles, "labelFiles");

          console.log("called sai2");

          setFormData({
            ...formData,
            date: data.date,
            customerName: data.name,
            servicesReq: data.service,
            productName: data.product,
            units: data.unit,
            trackingURL: data.tracking_url,
            fnskuSend1: fnskuFiles,
            labelSend1: labelFiles,

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
            instructions: data.instructions,
          });
        } else {
        }
      } catch (error) {}
    }

    fetchData();
  }, [id]);

  const openFileInNewTab = (fileURL) => {
    if (fileURL) {
      window.open(`${PDF_URL}${fileURL}`, "_blank");
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
    instructions,
  } = formData;

  const handleDimensionUpdate = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };
 
  const navigate = useNavigate()

  const handleBackClick = () => {
    if(role==="Label"){
      navigate('/labelorders')
    }else if(role==="Dimension"){
      navigate('/dimensionorders')
    }else if(role==="Accountant"){
      navigate('/accountOrders')
    }
    
  };
 

  return (
    <>
      <CommonNavbar />
      <div className="order-customer-container">
      <button
          className="order-customer-backward-button"
          onClick={handleBackClick}
        >
          <IoArrowBackCircle className="order-customer-backward-icon" />
        </button>
        <center>
          <h1 className="order-customer-main-heading"> Order Details</h1>
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
              <label className="order-customer-label-name ">
                Customer Name:
              </label>
              <input
                className="order-customer-lable-container admin-order-accepted-readonly"
                type="text"
                name="customerName"
                value={customerName}
                readOnly
              />
            </div>
            <p
              className="order-customer-dimension-update-button-container"
              onClick={handleDimensionUpdate}
            >
              See Dimensions
            </p>
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
            {/* <div className="order-customer-input-feild">
              <label className="order-customer-label-name">Length</label>
              <input
                className="order-customer-lable-container admin-order-accepted-readonly"
                type="text"
                name="customerName"
                value={length}
                readOnly
              />
            </div> */}
            {/* <div className="order-customer-input-feild">
              <label className="order-customer-label-name">Width</label>
              <input
                className="order-customer-lable-container admin-order-accepted-readonly"
                type="text"
                name="customerName"
                value={width}
                readOnly
              />
            </div> */}
            {/* <div className="order-customer-input-feild">
              <label className="order-customer-label-name">Height</label>
              <input
                className="order-customer-lable-container admin-order-accepted-readonly"
                type="text"
                name="customerName"
                value={height}
                readOnly
              />
            </div> */}
            {/* <div className="order-customer-input-feild">
              <label className="order-customer-label-name">Weight</label>
              <input
                className="order-customer-lable-container admin-order-accepted-readonly"
                type="text"
                name="customerName"
                value={weight}
                readOnly
              />
            </div> */}
          </div>
          <div className="order-customer-field2-container">
            <div className="order-customer-input-feild">
              <label className="order-customer-label-name">
                Services Required:
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
              {/* {fnsku_status === 1 && (
                <button
                  type="button"
                  onClick={() => openFileInNewTab(fnskuSend1)}
                  disabled={fnskuSend1 === null}
                  className="order-customer-view-file-button-container"
                >
                  View FNSKU File
                </button>
              )} */}
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
              {/* {label_status === 1 && (
                <button
                  type="button"
                  onClick={() => openFileInNewTab(labelSend1)}
                  disabled={labelSend1 === null}
                  className="order-customer-view-file-button-container"
                >
                  View Box Label File
                </button>
              )} */}
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
            <div className="order-customer-input-feild">
              <label className="order-customer-label-name">Instructions</label>
              <input
                className="order-customer-lable-container admin-order-accepted-readonly"
                type="text"
                name="instructions"
                value={instructions}
                readOnly
              />
            </div>
          </div>
        </form>
        <p style={{ marginLeft: "30px" }} className="order-customer-label-name">
          Fnsku Files
        </p>
        {fnskuSend1 && (
          <div
            style={{ display: "flex", flexWrap: "wrap", marginLeft: "30px" }}
          >
            {fnskuSend1.map((each) => (
              <div style={{ display: "flex", margin: "20px" }}>
                <AiOutlineFilePdf
                  key={each} // Ensure to provide a unique key when mapping over elements
                  onClick={() => openFileInNewTab(each.name)}
                  className="viewpdf-button"
                />
              </div>
            ))}
          </div>
        )}
        <p style={{ marginLeft: "30px" }} className="order-customer-label-name">
          Label Files
        </p>
        {labelSend1 && (
          <div
            style={{ display: "flex", flexWrap: "wrap", marginLeft: "30px" }}
          >
            {labelSend1.map((each) => (
              <div style={{ display: "flex", margin: "20px" }}>
                <AiOutlineFilePdf
                  key={each} // Ensure to provide a unique key when mapping over elements
                  onClick={() => openFileInNewTab(each.name)}
                  className="viewpdf-button"
                />
              </div>
            ))}
          </div>
        )}
      </div>
      <Modal
        open={isModalOpen}
        onClose={handleCloseModal}
        style={{ width: "100%" }}
      >
        <Box
          sx={{
            position: "absolute",
            width: "70%",
            top: "50%",
            left: "50%",
            height: "500px",
            overflow: "scroll",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            borderRadius: "8px",
            p: 3,
          }}
        >
          <CustomerDimensionView
            updateId={id}
            onClose={handleCloseModal}
          />
        </Box>
      </Modal>
    </>
  );
}

export default ViewDetailedOrder;
