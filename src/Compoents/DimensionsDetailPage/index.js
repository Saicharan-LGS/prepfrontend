import { useState, useEffect } from "react";
import "./index.css";
import Toast from "../utlis/toast";

function DimensionDetailPage({ dimensionData, fetchData1, index }) {
  const id = dimensionData.id;
  console.log(dimensionData, "llllllllllllllllllllllll");

  const [dimensions, setDimensions] = useState({
    length: "",
    width: "",
    height: "",
    weight: "",
    itemNo: "",
    boxBy: "prep",
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

  const FETCH_URL = process.env.REACT_APP_FETCH_URL;
  const token = sessionStorage.getItem("token");

  const data = dimensionData;
  console.log(data, "kpilraj reddy");
  useEffect(() => {
    const lengthParts = (dimensionData.length || "").match(
      /([\d.]+)([a-zA-Z]+)/
    );
    const widthParts = (dimensionData.width || "").match(/([\d.]+)([a-zA-Z]+)/);
    const heightParts = (dimensionData.height || "").match(
      /([\d.]+)([a-zA-Z]+)/
    );
    const weightParts = (dimensionData.weight || "").match(
      /([\d.]+)([a-zA-Z]+)/
    );

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
    newDimensions.itemNo = dimensionData.itemNo;
    newDimensions.boxBy = dimensionData.boxBy;

    setDimensions(newDimensions);

    setSelectedUnits({
      length: lengthParts ? lengthParts[2] : "inches",
      width: widthParts ? widthParts[2] : "inches",
      height: heightParts ? heightParts[2] : "inches",
      weight: weightParts ? weightParts[2] : "lb",
    });
  }, [dimensionData]);

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
        itemNo: dimensions.itemNo,
        boxBy: dimensions.boxBy,
      };

      const response = await fetch(`${FETCH_URL}updatedimensionbyid/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dimensionsWithUnits),
      });
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
          length: "inches",
          width: "inches",
          height: "inches",
          weight: "lb",
        });
        console.log("fetchData1 callings ....");
        fetchData1();
      } else {
        response.json().then((data) => {
          Toast.fire({
            icon: "error",
            title: data.message,
          });
        });
      }
    } catch {}
  };

  const deletedimension = async () => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this Dimension?"
    );
    if (!isConfirmed) {
      return;
    }
    const response = await fetch(`${FETCH_URL}deleteDimension/${id}`, {
      method: "delete",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      response.json().then((data) => {
        Toast.fire({
          icon: "success",
          title: data.message,
        });
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value, "name");
    setDimensions({
      ...dimensions,
      [name]: value,
    });
  };
  const handleQuantityChange = (e) => {};
  const handleUnitChange = (e, dimension) => {
    const selectedUnit = e.target.value;
    setSelectedUnits({
      ...selectedUnits,
      [dimension]: selectedUnit,
    });
  };

  return (
    <div className="dimensions-main-container">
      <form
        className="dimensions-details-form-container"
        onSubmit={handleSubmit}
      >
              <h3>Box No: {index + 1}</h3>

        <div className="dimension-flex">
          {["length", "width", "height", "weight"].map((dimension) => (
            <div key={dimension} className="dimensions-details-input-container">
              <label className="dimensions-label-text">
                {dimension.charAt(0).toUpperCase() + dimension.slice(1)}:
              </label>
              <div className="dimension-detail-select-container">
                <input
                  className="dimensions-details-input"
                  type="text"
                  name={dimension}
                  value={dimensions[dimension]}
                  onChange={handleInputChange}
                  required
                />
                <select
                  className="dimensions-details-select"
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
          <div className="dimension-details-input-container-1">
            <label className="dimensions-label-text">Quantity</label>
            <input
              type="number"
              name="itemNo"
              onChange={handleInputChange}
              placeholder="Enter the quantity"
              className="dimensions-details-input-1"
              value={dimensions.itemNo}
            />
          </div>
          <div className="dimension-details-input-container-1">
            <label className="dimensions-label-text">Box By</label>
            <select
              className="dimensions-details-input-1"
              value={dimensions.boxBy}
            >
              <option value="prep">Prep</option>
              <option value="customer">Customer</option>
            </select>
          </div>
        </div>

        <center style={{display:"flex",justifyContent:"center",gap:"20px"}}>
          <button className="dimensions-details-button" type="submit">
            Update
          </button>
          <button
            onClick={deletedimension}
            value={dimensions.id}
            className="dimensions-details-button"
          >
            Delete
          </button>
        </center>
      </form>
    </div>
  );
}
export default DimensionDetailPage;
