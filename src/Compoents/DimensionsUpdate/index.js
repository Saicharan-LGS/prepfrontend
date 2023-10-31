import React, { useState } from "react";
import "./index.css";

const DimensionsUpdate = () => {
  const [dimensions, setDimensions] = useState({
    length: "",
    width: "",
    height: "",
    weight: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDimensions({
      ...dimensions,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(dimensions);
  };
  fetch("https://your-api-endpoint.com/post", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dimensions),
  })
    .then((response) => response.json())
    .then((data) => {
      // Handle the response from the server
      console.log(data);
    })
    .catch((error) => {
      // Handle errors here
      console.error("Error:", error);
    });

  return (
    <div className="Dimention-container">
      <form className="Dimention-form-container" onSubmit={handleSubmit}>
        <div className="Dimention-whole-container">
          <div className="Dimention-length-container">
            <label className="Dimention-lable-container">
              Length:
              <input
                className="Dimention-input-container"
                type="text"
                name="length"
                value={dimensions.length}
                onChange={handleInputChange}
              />
            </label>
          </div>
          <div className="Dimention-length-container">
            <label className="Dimention-lable-container">
              Width:
              <input
                className="Dimention-input-container"
                type="text"
                name="width"
                value={dimensions.width}
                onChange={handleInputChange}
              />
            </label>
          </div>
          <div className="Dimention-length-container">
            <label className="Dimention-lable-container">
              Height:
              <input
                className="Dimention-input-container"
                type="text"
                name="height"
                value={dimensions.height}
                onChange={handleInputChange}
              />
            </label>
          </div>
        </div>
        <div className="Dimention-weight-container">
          <label className="Dimention-lable-container">
            Weight:
            <input
              className="Dimention-input-container"
              type="text"
              name="weight"
              value={dimensions.weight}
              onChange={handleInputChange}
            />
          </label>
        </div>
        <center>
          <button type="submit">Update</button>
        </center>
      </form>
    </div>
  );
};

export default DimensionsUpdate;
