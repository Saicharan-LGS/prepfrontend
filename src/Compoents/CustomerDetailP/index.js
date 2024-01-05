import React, { useState, useEffect } from "react";
import "./index.css";
import Toast from "../utlis/toast";
import { MdDeleteOutline } from "react-icons/md";
import { AiOutlineFilePdf } from "react-icons/ai";
import { IoArrowBackCircle } from "react-icons/io5";
import { Box, Modal } from "@mui/material";
import CustomerDimensionView from "../CustomerDimensionView";
function CustomerOrderViewDetail({ orderId, setStatus }) {
  const [formData, setFormData] = useState({
    date: "",
    name: "",
    service: "Prep Service",
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
    length: "",
    height: "",
    width: "",
    weight: "",
    amount: "",
    instructions: "",
    quantity_received: "",
  });
  const [fnskuSendFiles, setFnskuSendFiles] = useState([]);
  const [labelSendFiles, setLabelSendFiles] = useState([]);
  const [isModalOpen, setModalOpen] = React.useState(false);
  const [products, setProducts] = useState([]);
  const [services, setServices] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [productQuantities, setProductQuantities] = useState({});

  const statusLabels = {
    0: "Pending",
    1: "Rejected",
    2: "Received",
    3: "Dimension Done",
    4: "Labelling Done",
    5: "Invoice Generated",
    6: "Invoice Accepted",
    7: "Invoice Rejected",
  };
  const token = sessionStorage.getItem("token");
  const FETCH_URL = process.env.REACT_APP_FETCH_URL;
  const PDF_URL = process.env.REACT_APP_PDF_URL;

  const fetchData = async () => {
    try {
      const response = await fetch(
        `${FETCH_URL}getCustomerDetailOrder/${orderId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`, // Set the Content-Type to JSON
          },
        }
      );
      if (response.ok) {
        const data1 = await response.json();
        console.log(data1, "data saicharan");
        const data = data1.order;

        const fnskuFiles =
          data1.files.filter((file) => file.type === "fnskuSend") || [];

        const labelFiles =
          data1.files.filter((file) => file.type === "labelSend") || [];

        const productServicesIds = data1.services.Services.map(
          (productService) => productService.services
        );
        setSelectedServices(productServicesIds);

        data1.services.Products.forEach((item) => {
          productQuantities[item.services] = item.quantity;
        });

        setFormData({
          ...formData,
          date: data.date,
          name: data.name,
          service: data.service,
          product: data.product,
          unit: data.unit,
          tracking_url: data.tracking_url,
          fnskuSend1: fnskuFiles,
          labelSend1: labelFiles,
          fnskuButton: data.fnsku_status,
          labelButton: data.label_status,
          fnsku_status: data.fnsku_status,
          label_status: data.label_status,
          fnskuSend: null,
          labelSend: null,
          length: data.length,
          width: data.width,
          height: data.height,
          weight: data.weight,
          amount: data.amount,
          status: data.status,
          instructions: data.instructions,
          quantity_received: data.quantity_received,
        });
      } else {
      }
    } catch (error) {}
  };
  useEffect(() => {
    fetch(`${FETCH_URL}getprep-productlist`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((productsResponse) => {
        if (productsResponse.ok) {
          return productsResponse.json();
        } else {
          throw new Error("Failed to fetch products");
        }
      })
      .then((productsData) => {
        setProducts(productsData.products);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });

    // Fetch services
    fetch(`${FETCH_URL}getprep-servicelist`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((servicesResponse) => {
        if (servicesResponse.ok) {
          return servicesResponse.json();
        } else {
          throw new Error("Failed to fetch services");
        }
      })
      .then((servicesData) => {
        setServices(servicesData.services);
      })
      .catch((error) => {
        console.error("Error fetching services:", error);
      });
    fetchData();
  }, [orderId]);

  const handleBackClick = () => {
    const prevStatus = localStorage.getItem("prevStatus");
    setStatus(prevStatus);
    localStorage.setItem("status", prevStatus);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFnskuSendChange = (e) => {
    const files = e.target.files;
    setFnskuSendFiles([...fnskuSendFiles, ...files]);
  };
  const handleLabelSendChange = (e) => {
    const files = e.target.files;
    setLabelSendFiles([...labelSendFiles, ...files]);
  };

  const getQuantityById = (productId) => {
    return productQuantities[productId] || "";
  };
  const handleQuantityChange = (productId, quantity) => {
    const updatedQuantities = { ...productQuantities };
    updatedQuantities[productId] = quantity;
    setProductQuantities(updatedQuantities);
  };

  const handleServiceSelection = (e, serviceId) => {
    const isChecked = e.target.checked;
    if (isChecked) {
      setSelectedServices([...selectedServices, serviceId]);
    } else {
      const updatedServices = selectedServices.filter((id) => id !== serviceId);
      setSelectedServices(updatedServices);
    }
  };

  const onClickDeleteFile = async (e, fileId) => {
    e.preventDefault();
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this file?"
    );

    if (!isConfirmed) {
      return; // User canceled the deletion
    }
    try {
      const response = await fetch(`${FETCH_URL}deleteFile/${fileId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: {
          orderId: orderId,
        },
      });

      if (response.ok) {
        // File deleted successfully
        fetchData(); // Update your component state or UI as needed
      } else {
        const errorData = await response.json();
        console.error("Error deleting file:", errorData);
      }
    } catch (error) {
      console.error("Error deleting file:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const selectedServiceWithQunatity = selectedServices.map((productId) => ({
      id: productId,
      quantity: 1,
    }));
    const selectedProductsWithQuantity = Object.keys(productQuantities).map(
      (productId) => ({
        id: productId,
        quantity: productQuantities[productId] || 0,
      })
    );
    const formDataToSend = new FormData();
    formDataToSend.append("date", date);
    formDataToSend.append("name", name);
    formDataToSend.append("service", service);
    formDataToSend.append("product", product);
    formDataToSend.append("unit", unit);
    formDataToSend.append("tracking_url", tracking_url);
    // formDataToSend.append("fnskuSend", fnskuSend);
    // formDataToSend.append("labelSend", labelSend);
    formDataToSend.append("instructions", instructions);
    formDataToSend.append("orderId", orderId);
    // Add any other fields you want to update
    fnskuSendFiles.forEach((file, index) => {
      formDataToSend.append(`fnskuSendFiles`, file);
    });

    formDataToSend.append(
      "selectedServices",
      JSON.stringify(selectedServiceWithQunatity)
    );
    formDataToSend.append(
      "selectedProducts",
      JSON.stringify(selectedProductsWithQuantity)
    );

    labelSendFiles.forEach((file, index) => {
      formDataToSend.append(`labelSendFiles`, file);
    });

    fetch(`${FETCH_URL}customerOrderDetail/${orderId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`, // Set the Content-Type to JSON
      },
      body: formDataToSend,
    })
      .then((response) => response.json())
      .then((data) => {
        Toast.fire({
          icon: "success",
          title: data.message,
        });
        fetchData();
      })
      .catch((error) => {
        fetchData();
      });
  };

  const openFileInNewTab = (fileURL) => {
    if (fileURL) {
      window.open(`${PDF_URL}${fileURL}`, "_blank");
    }
  };

  const {
    date,
    name,
    service,
    product,
    unit,
    tracking_url,
    fnskuSend1,
    labelSend1,
    quantity_received,
    status,
    instructions,
  } = formData;

  const handleDimensionUpdate = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const readOnlyInput = status==="0"? 'order-customer-lable-container':'order-customer-lable-container admin-order-accepted-readonly'

  return (
    <>
      <div className="order-customer-container">
        <button
          className="order-customer-backward-button"
          onClick={handleBackClick}
        >
          <IoArrowBackCircle className="order-customer-backward-icon" />
        </button>
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
                onChange={handleChange}
                required
                readOnly
              />
            </div>
            <div className="order-customer-input-feild">
              <label className="order-customer-label-name"> Name:</label>
              <input
                className={readOnlyInput}
                type="text"
                name="name"
                value={name}
                readOnly={status === "0" ? false : true}
                onChange={handleChange}
                required
              />
            </div>
            <div className="order-customer-input-feild">
              <label className="order-customer-label-name">
                Received Quantity:
              </label>
              <input
                className="order-customer-lable-container admin-order-accepted-readonly"
                type="text"
                name="receivedQuantity"
                value={quantity_received}
                onChange={handleChange}
                required
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
              <label className="order-customer-label-name">Length</label>
              <input
                className="order-customer-lable-container admin-order-accepted-readonly"
                type="text"
                name="customerName"
                value={length}
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
            </div> */}
          </div>
          <div className="order-customer-field2-container">
            <div className="order-customer-input-feild">
              <label className="order-customer-label-name">Service:</label>
              <select
                className="order-customer-lable-container"
                onChange={handleChange}
                required
                value={service}
              >
                <option value="Prep Service">Prep Service</option>
              </select>
            </div>
            <div className="order-customer-input-feild">
              <label className="order-customer-label-name">Product :</label>
              <input
                className={readOnlyInput}
                type="text"
                name="product"
                value={product}
                readOnly={status === "0" ? false : true}
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
                onChange={handleFnskuSendChange}
                multiple
              />
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
            <div className="order-customer-input-feild">
              <label className="order-customer-label-name">
                Box Label Send:
              </label>
              <input
                className="order-customer-lable-container order-customer-label-file"
                type="file"
                name="labelSend"
                onChange={handleLabelSendChange}
                multiple
              />
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
            </div>
          </div>
          <div className="order-customer-field3-container">
            <div className="order-customer-input-feild">
              <label className="order-customer-label-name" >Unit:</label>
              <input
                className={readOnlyInput}
                type="number"
                name="unit"
                value={unit}
                readOnly={status === "0" ? false : true}
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
            {/* <div className="order-customer-input-feild">
              <label className="order-customer-label-name">Amount</label>
              <input
                className="order-customer-lable-container admin-order-accepted-readonly"
                type="text"
                name="tracking_url"
                value={amount}
                onChange={handleChange}
              />
            </div> */}
            <div className="order-customer-input-feild">
              <label className="order-customer-label-name">Instructions</label>
              <input
                className="order-customer-lable-container "
                type="text"
                name="instructions"
                value={instructions}
                onChange={handleChange}
              />
            </div>
            <div className="order-customer-input-feild">
              <label className="order-customer-label-name">Status</label>
              <input
                className="order-customer-lable-container"
                type="text"
                name="tracking_url"
                value={statusLabels[status] || "Unknown Status"}
                onChange={handleChange}
              />
            </div>
            <div className="order-customer-service-container">
              <p className="order-customer-service-name">Services :</p>
              {services.map((service) => (
                <div
                  key={service.id}
                  className="order-customer-service-input-container"
                >
                  <input
                    type="checkbox"
                    id={service.id}
                    name="selectedServices"
                    value={service.id}
                    // readOnly={status === "0" ? false : true}
                    checked={selectedServices.includes(service.id)}
                    onChange={(e) =>status === "0" ? handleServiceSelection(e, service.id): null }
                    className="order-customer-input-checkbox"
                  />
                  <label
                    htmlFor={service.id}
                    className="order-customer-label-name"
                  >
                    {service.name}
                  </label>
                </div>
              ))}
            </div>
            <div className="order-customer-service-container">
              <label className="order-customer-service-name">Products :</label>
              {products.map((product) => (
                <div
                  key={product.id}
                  className="order-customer-service-input-container"
                >
                  <label
                    htmlFor={`product-${product.id}`}
                    className="order-customer-label-name"
                  >
                    {product.name} :
                  </label>
                  <input
                    type="number"
                    id={`product-${product.id}`}
                    name={`product-${product.id}`}
                    value={getQuantityById(product.id)}
                    onChange={(e) =>
                      handleQuantityChange(product.id, e.target.value)
                    }
                    placeholder="Enter Quantity"
                    className="order-customer-service-input"
                  />
                </div>
              ))}
            </div>
            {/* <div className="order-customer-input-feild-fnsku-status">
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
          </div> */}
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
                <MdDeleteOutline
                  key={each}
                  onClick={(e) => onClickDeleteFile(e, each.id)}
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
                <MdDeleteOutline
                  key={each}
                  onClick={(e) => onClickDeleteFile(e, each.id)}
                />
              </div>
            ))}
          </div>
        )}
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
            updateId={orderId}
            onClose={handleCloseModal}
          />
        </Box>
      </Modal>
    </>
  );
}

export default CustomerOrderViewDetail;
