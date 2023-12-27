import React, { useState } from "react";
import "./index.css";
import Toast from "../utlis/toast";
const DimensionsUpdate = ({ id, fetchProducts }) => {
  const [dimensions, setDimensions] = useState({
    length: "",
    width: "",
    height: "",
    weight: "",
  });

  const [unitOptions] = useState({
    length: ["cm", "inches", "feet", "meters"],
    width: ["cm", "inches", "feet", "meters"],
    height: ["cm", "inches", "feet", "meters"],
    weight: ["g", "kg", "lb"],
  });

  const [selectedUnits, setSelectedUnits] = useState({
    length: "inches",
    width: "inches",
    height: "inches",
    weight: "lb",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDimensions({
      ...dimensions,
      [name]: value,
    });
  };

  const handleUnitChange = (e, dimension) => {
    const selectedUnit = e.target.value;
    setSelectedUnits({
      ...selectedUnits,
      [dimension]: selectedUnit,
    });
  };

  const FETCH_URL = process.env.REACT_APP_FETCH_URL
  

  const handleSubmit = async (e) => {
    e.preventDefault();
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
    try {
      const dimensionsWithUnits = {
        length: dimensions.length + selectedUnits.length,
        width: dimensions.width + selectedUnits.width,
        height: dimensions.height + selectedUnits.height,
        weight: dimensions.weight + selectedUnits.weight,
      };
      const token = sessionStorage.getItem("token");

      const response = await fetch(
        `${FETCH_URL}dimensionupdate/${id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dimensionsWithUnits),
        }
      );
      if (response.ok) {
        response.json().then((data) => {
          Toast.fire({
            icon: "success",
            title: data.message,
          });
        });
        setDimensions({
          length: "",
          width: "",
          height: "",
          weight: "",
        });

        setSelectedUnits({
          length: "cm",
          width: "cm",
          height: "cm",
          weight: "g",
        });

        fetchProducts();
      } else {
        response.json().then((data) => {
          Toast.fire({
            icon: "error",
            title: data.message,
          });
        });
        fetchProducts();
      }
    } catch  {
    }
  };

  return (
    <div className="dimensions-main-container">
      <form className="dimensions-form-container" onSubmit={handleSubmit}>
        <div>
          {["length", "width", "height", "weight"].map((dimension) => (
            <div key={dimension} className="dimensions-input-container">
              <label className="dimensions-label-text">
                {dimension.charAt(0).toUpperCase() + dimension.slice(1)}:
              </label>
              <div className="dimension-select-container">
                <input
                  className="dimensions-input"
                  type="text"
                  name={dimension}
                  value={dimensions[dimension]}
                  onChange={handleInputChange}
                  required
                />
                <select
                  className="dimensions-select"
                  value={selectedUnits[dimension]}
                  onChange={(e) => handleUnitChange(e, dimension)}
                >
                  {unitOptions[dimension].map((unit) => (
                    <option key={unit} value={unit}>
                      {unit}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          ))}
        </div>
        <center>
          <button className="dimensions-button" type="submit">
            Update
          </button>
        </center>
      </form>
    </div>
  );
};

export default DimensionsUpdate;
