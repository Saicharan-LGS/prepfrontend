import React, { useState, useEffect } from "react";
import "./index.css";
import { IoArrowBackCircle } from "react-icons/io5";
import { MdDeleteOutline } from "react-icons/md";
import { AiOutlineFilePdf } from "react-icons/ai";
import Toast from "../utlis/toast";
import Modal from "@mui/material/Modal";
import { Box } from "@mui/material";
import DimensionUpdatePage from "../DimensionUpdatePage";
import { useNavigate, useParams } from "react-router-dom";
import CommonNavbar from "../CommonNavbar";

function DimensionNewDetailPage() {
  const { id } = useParams();
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
    instructions: "",
  });
  const [fnskuSendFiles, setFnskuSendFiles] = useState([]);
  const [labelSendFiles, setLabelSendFiles] = useState([]);
  const [isModalOpen, setModalOpen] = React.useState(false);
  const [products, setProducts] = useState([]);
  const [services, setServices] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [productQuantities, setProductQuantities] = useState({});

  // Define separate state for dimensions and selected units
  const [dimensions, setDimensions] = useState({
    length: "",
    width: "",
    height: "",
    weight: "",
  });
  const [selectedUnits, setSelectedUnits] = useState({
    length: "inches",
    width: "inches",
    height: "inches",
    weight: "lb",
  });
  const token = sessionStorage.getItem("token");

  const FETCH_URL = process.env.REACT_APP_FETCH_URL;

  const fetchData = async () => {
    try {
      const response = await fetch(`${FETCH_URL}getAdminOrderDetails/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data1 = await response.json();
       
        const data = data1.order;
        const lengthParts = (data.length || "").match(/([\d.]+)([a-zA-Z]+)/);
        const widthParts = (data.width || "").match(/([\d.]+)([a-zA-Z]+)/);
        const heightParts = (data.height || "").match(/([\d.]+)([a-zA-Z]+)/);
        const weightParts = (data.weight || "").match(/([\d.]+)([a-zA-Z]+)/);

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
          date: data.date,
          name: data.name,
          service: data.service,
          product: data.product,
          unit: data.unit,
          tracking_url: data.tracking_url,
          fnskuButton: data.fnsku_status,
          labelButton: data.label_status,
          fnskuSend1: fnskuFiles,
          labelSend1: labelFiles,
          fnsku_status: data.fnsku_status,
          label_status: data.label_status,
          fnskuSend: null,
          labelSend: null,
          status: data.status,
          instructions: data.instructions,
        });

        const newDimensions = {};

        if (lengthParts && lengthParts[1] !== null) {
          newDimensions.length = parseFloat(lengthParts[1]);
        }

        if (widthParts && widthParts[1] !== null) {
          newDimensions.width = parseFloat(widthParts[1]);
        }

        if (heightParts && heightParts[1] !== null) {
          newDimensions.height = parseFloat(heightParts[1]);
        }

        if (weightParts && weightParts[1] !== null) {
          newDimensions.weight = parseFloat(weightParts[1]);
        }
        setDimensions(newDimensions);
        // Set selected units
        setSelectedUnits({
          length: lengthParts ? lengthParts[2] : "inches",
          width: widthParts ? widthParts[2] : "inches",
          height: heightParts ? heightParts[2] : "inches",
          weight: weightParts ? weightParts[2] : "lb",
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
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    const length1 =
      length !== undefined ? dimensions.length + selectedUnits.length : "";
    const width1 =
      width !== undefined ? dimensions.width + selectedUnits.width : "";
    const height1 =
      height !== undefined ? dimensions.height + selectedUnits.height : "";
    const weight1 =
      weight !== undefined ? dimensions.weight + selectedUnits.weight : "";
    if (dimensions.length > 25) {
      alert("Length is greater than 25. Enter a value below 25");
      return;
    }
    if (dimensions.width > 25) {
      alert("Width is greater than 25. Enter a value below 25");
      return;
    }
    if (dimensions.height > 25) {
      alert("Height is greater than 25. Enter a value below 25");
      return;
    }

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
    formDataToSend.append("orderId", id);
    formDataToSend.append("date", date || "");
    formDataToSend.append("name", name || "");
    formDataToSend.append("service", service);
    formDataToSend.append("product", product || "");
    formDataToSend.append("unit", unit || "");
    formDataToSend.append("tracking_url", tracking_url || "");
    formDataToSend.append("length", length1);
    formDataToSend.append("width", width1);
    formDataToSend.append("weight", weight1);
    formDataToSend.append("height", height1);
    formDataToSend.append("status", status);
    formDataToSend.append("instructions", instructions);

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

    fetch(`${FETCH_URL}updateOrderDetails/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
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
        setFnskuSendFiles([]);
        setLabelSendFiles([]);
      })
      .catch((error) => {});
  };

  const PDF_URL = process.env.REACT_APP_PDF_URL;

  const openFileInNewTab = (fileURL) => {
    if (fileURL) {
      window.open(`${PDF_URL}${fileURL}`, "_blank");
    }
  };

  const handleFnskuSendChange = (e) => {
    const files = e.target.files;
    setFnskuSendFiles([...fnskuSendFiles, ...files]);
  };

  const handleLabelSendChange = (e) => {
    const files = e.target.files;
    setLabelSendFiles([...labelSendFiles, ...files]);
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
    status,
    instructions,
  } = formData;
  const { length, width, height, weight } = dimensions;

  const getQuantityById = (productId) => {
    return productQuantities[productId] || "";
  };
  const handleQuantityChange = (productId, quantity) => {
    const updatedQuantities = { ...productQuantities };
    updatedQuantities[productId] = quantity;
    setProductQuantities(updatedQuantities);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
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
      return;
    }

    try {
      const response = await fetch(`${FETCH_URL}deleteFile/${fileId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: {
          orderId: id,
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
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate("/dimensionorders");
  };

  const handleDimensionUpdate = () => {
    setModalOpen(true);
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
          <h1 className="order-customer-main-heading">Order</h1>
        </center>
        <form className="order-customer-from-container">
          <div className="order-customer-field1-container">
            <div className="order-customer-input-feild">
              <label className="order-customer-label-name">Date:</label>
              <input
                className="order-customer-lable-container admin-order-accepted-readonly"
                type="date"
                name="date"
                readOnly
                value={date}
                onChange={handleChange}
                required
              />
            </div>
            <div className="order-customer-input-feild">
              <label className="order-customer-label-name">Customer Name:</label>
              <input
                className="order-customer-lable-container admin-order-accepted-readonly"
                type="text"
                name="Name"
                readOnly
                value={name}
                onChange={handleChange}
              />
            </div>
            <p
              className="order-customer-dimension-update-button-container"
              onClick={handleDimensionUpdate}
            >
              Update Dimensions
            </p>
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
                    readOnly
                    value={service.id}
                    checked={selectedServices.includes(service.id)}
                    onChange={(e) => handleServiceSelection(e, service.id)}
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
          </div>
          <div className="order-customer-field2-container">
            <div className="order-customer-input-feild">
              <label className="order-customer-label-name">Service:</label>
              <select
                className="order-customer-lable-container admin-order-accepted-readonly"
                onChange={handleChange}
                required
                readOnly
                value={service}
              >
                <option value="Prep Service">Prep Service</option>
              </select>
            </div>
            <div className="order-customer-input-feild">
              <label className="order-customer-label-name">Product Name:</label>
              <input
                className="order-customer-lable-container admin-order-accepted-readonly"
                type="text"
                name="product"
                value={product}
                readOnly
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="order-customer-field3-container">
            <div className="order-customer-input-feild">
              <label className="order-customer-label-name">Unit:</label>
              <input
                className="order-customer-lable-container admin-order-accepted-readonly"
                type="number"
                name="unit"
                readOnly
                value={unit}
                onChange={handleChange}
                required
              />
            </div>
            <div className="order-customer-input-feild">
              <label className="order-customer-label-name">Tracking_url:</label>
              <input
                className="order-customer-lable-container admin-order-accepted-readonly"
                type="text"
                name="tracking_url"
                readOnly
                value={tracking_url}
                onChange={handleChange}
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
                onChange={handleChange}
              />
            </div>
            <div className="order-customer-input-feild">
              <label className="order-customer-label-name">Status</label>
              <select
                className="order-customer-lable-container admin-order-accepted-readonly"
                type="text"
                name="status"
                readOnly
                value={status || "Unknown Status"}
              >
                <option value="0">Pending</option>
                <option value="1">Rejected</option>
                <option value="2">Received</option>
                <option value="3">Dimension Done</option>
                <option value="4">Labelling Done</option>
                <option value="5">Invoice Generated</option>
                <option value="6">Invoice Accepted</option>
                <option value="7">Invoice Rejected</option>
                <option value="8">Dispatch</option>
              </select>
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
          </div>*/}
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
                {/* <MdDeleteOutline
                  key={each}
                  onClick={(e) => onClickDeleteFile(e, each.id)}
                /> */}
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
          <DimensionUpdatePage updateId={id} onClose={handleCloseModal} />
        </Box>
      </Modal>
    </>
  );
}

export default DimensionNewDetailPage;
