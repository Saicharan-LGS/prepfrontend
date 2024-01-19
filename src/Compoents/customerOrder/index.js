import React, { useState, useEffect } from "react";
import "./index.css";
import Toast from "../utlis/toast";

const CustomerOrder = () => {
  const [date, setDate] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [servicesReq, setServicesReq] = useState("Prep Service");
  const [productName, setProductName] = useState("");
  const [units, setUnits] = useState("");
  const [trackingURL, setTrackingURL] = useState("");
  const [fnskuSendFiles, setFnskuSendFiles] = useState([]);
  const [labelSendFiles, setLabelSendFiles] = useState([]);
  const [products, setProducts] = useState([]);
  const [services, setServices] = useState([]);
  const [customerId, setCustomerId] = useState("");
  const [instructions, setInstructions] = useState("");
  const [selectedServices, setSelectedServices] = useState([]);
  const [productQuantities, setProductQuantities] = useState({});

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

  const FETCH_URL = process.env.REACT_APP_FETCH_URL;

  useEffect(() => {
    const token = sessionStorage.getItem("token");

    fetch(`${FETCH_URL}customerdata`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Failed to fetch customer data");
        }
      })
      .then((data) => {
        setCustomerId(data.id);
      })
      .catch(() => {});

    // Fetch products
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
      });

    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const day = currentDate.getDate();
    const formattedDate = `${year}-${month.toString().padStart(2, "0")}-${day
      .toString()
      .padStart(2, "0")}`;
    setDate(formattedDate);
  }, [FETCH_URL]);

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
      case "instructions":
        setInstructions(value);
        break;
      default:
        break;
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

  const selectedServiceWithQunatity = selectedServices.map((productId) => ({
    id: productId,
    quantity: 1,
  }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const selectedProductsWithQuantity = Object.keys(productQuantities)
      .map((productId) => ({
        id: productId,
        quantity: productQuantities[productId] || 0,
      }))
      .filter((product) => product.quantity > 0);

    try {
      const token = sessionStorage.getItem("token");
      const formData = new FormData();
      formData.append("date", date);
      formData.append("name", customerName);
      formData.append("service", servicesReq);
      formData.append("product", productName);
      formData.append("units", units);
      formData.append("tracking_url", trackingURL);

      // Append multiple files for fnskuSend
      fnskuSendFiles.forEach((file, index) => {
        formData.append(`fnskuSendFiles`, file);
      });

      labelSendFiles.forEach((file, index) => {
        formData.append(`labelSendFiles`, file);
      });

      formData.append("customer_id", customerId);
      formData.append("instructions", instructions);
      formData.append(
        "selectedServices",
        JSON.stringify(selectedServiceWithQunatity)
      );
      formData.append(
        "selectedProducts",
        JSON.stringify(selectedProductsWithQuantity)
      );
      const response = await fetch(`${FETCH_URL}customerorder`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

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
        setFnskuSendFiles([]);
        setLabelSendFiles([]);
        setInstructions("");
        setSelectedServices([]);
        setProductQuantities({});
        setCustomerName("");
      } else {
        response.json().then((data) => {
          Toast.fire({
            icon: "error",
            title: data.message,
          });
        });
      }
    } catch (error) {
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
                <label className="order-customer-label-name">Order Name:</label>
                <input
                  className="order-customer-lable-container"
                  type="text"
                  name="customerName"
                  value={customerName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="order-customer-input-feild">
                <label className="order-customer-label-name">
                  FNSKU ({fnskuSendFiles.length} files selected):
                </label>
                <input
                  className="order-customer-lable-container order-customer-label-file"
                  type="file"
                  name="fnskuSend"
                  onChange={handleFnskuSendChange}
                  multiple
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
                <label className="order-customer-label-name">
                  Service Required:
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
                <label className="order-customer-label-name">
                  Label ({labelSendFiles.length} files selected):
                </label>
                <input
                  className="order-customer-lable-container order-customer-label-file"
                  type="file"
                  name="labelSend"
                  onChange={handleLabelSendChange}
                  multiple
                />
              </div>
              <div className="order-customer-service-container">
                <label className="order-customer-service-name">
                  Products :
                </label>
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
                      placeholder="Quantity"
                      className="order-customer-service-input"
                    />
                  </div>
                ))}
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
                />
              </div>
              <div className="order-customer-input-feild">
                <label className="order-customer-label-name">
                  Instructions:
                </label>
                <input
                  className="order-customer-lable-container"
                  type="text"
                  name="instructions"
                  value={instructions}
                  onChange={handleChange}
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
