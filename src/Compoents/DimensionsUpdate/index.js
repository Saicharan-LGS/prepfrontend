import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./index.css";
import Toast from "../utlis/toast";
const DimensionsUpdate = (props) => {
  const {productId} = props
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
    length: "cm",
    width: "cm",
    height: "cm",
    weight: "g",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDimensions({
      ...dimensions,
      [name]: value,
    });
  };
  const navigate = useNavigate();

  const handleUnitChange = (e, dimension) => {
    const selectedUnit = e.target.value;
    setSelectedUnits({
      ...selectedUnits,
      [dimension]: selectedUnit,
    });
  };

  const { id } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const dimensionsWithUnits = {
        length: dimensions.length + selectedUnits.length,
        width: dimensions.width + selectedUnits.width,
        height: dimensions.height + selectedUnits.height,
        weight: dimensions.weight + selectedUnits.weight,
      };
      console.log(dimensionsWithUnits);
      const token = sessionStorage.getItem("token");

      const response = await fetch(
        `http://localhost:3009/api/v1/dimensionupdate/${productId}`,
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
        console.log("Dimension Updated successfully");
      } else {
        response.json().then((data) => {
          Toast.fire({
            icon: "error",
            title: data.message,
          });
        });
        console.error("Error creating the order");
      }
    } catch (error) {
      console.error("Error creating the order: ", error);
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
