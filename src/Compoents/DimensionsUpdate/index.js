import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "./index.css";

const DimensionsUpdate = () => {
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
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InByYXNoYW50aHJlZGR5Nzc5OTU1QGdtYWlsLmNvbSIsImlhdCI6MTY5ODgzMTA3NSwiZXhwIjoxNjk4ODM0Njc1fQ.I1acr2Zd7rIEhVF2TXrzz_W0S6wTjEWIjoLaG2lLWtk";
      const response = await fetch(
        `http://localhost:3009/api/v1/dimensionupdate/${id}`,
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
        console.log("Dimension Updated successfully");
      } else {
        console.error("Error creating the order");
      }
    } catch (error) {
      console.error("Error creating the order: ", error);
    }
  };

  return (
    <div className="Dimension-container">
      <form className="Dimension-form-container" onSubmit={handleSubmit}>
        <div className="Dimension-whole-container">
          {["length", "width", "height", "weight"].map((dimension) => (
            <div key={dimension} className="Dimension-length-container">
              <label className="Dimension-label-container">
                {dimension.charAt(0).toUpperCase() + dimension.slice(1)}:
              </label>
              <div className="dimension-label-units-conatiner">
                <input
                  className="Dimension-input-container"
                  type="text"
                  name={dimension}
                  value={dimensions[dimension]}
                  onChange={handleInputChange}
                />
                <select
                  className="Dimension-unit-select"
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
          <button type="submit">Update</button>
        </center>
      </form>
    </div>
  );
};

export default DimensionsUpdate;
