function CustomerDimension({ dimensionData, index }) {
  return (
    <div className="dimensions-main-container">
      <form className="dimensions-details-form-container">
        <h3>Box No: {index + 1}</h3>
        <div className="dimension-flex">
          {["length", "width", "height", "weight"].map((dimension) => (
            <div key={dimension} className="dimensions-details-input-container">
              <label className="dimensions-label-text">
                {dimension.charAt(0).toUpperCase() + dimension.slice(1)}:
              </label>
              <div className="dimension-detail-select-container">
                {/* <input
                  className="dimensions-details-input"
                  type="text"
                  name={dimension}
                  value={dimensions[dimension]}
                  onChange={handleInputChange}
                  readOnly
                /> */}
                <p className="customer-dimension-length">
                  {dimensionData.length}
                </p>
                {/* <select
                  className="dimensions-details-select"
                  value={selectedUnits[dimension]}
                  onChange={(e) => handleUnitChange(e, dimension)}
                  readOnly
                >
                  {unitOptions[dimension].map((unit) => (
                    <option key={unit} value={unit} readOnly>
                      {unit}
                    </option>
                  ))}
                </select> */}
              </div>
            </div>
          ))}
          <div className="dimension-details-input-container-1">
            <label className="dimensions-label-text">Quantity</label>
            <input
              type="number"
              placeholder="Enter the quantity"
              className="dimensions-details-input-1"
              value={dimensionData.itemNo}
              readOnly
            />
          </div>
          <div className="dimension-details-input-container-1">
            <label className="dimensions-label-text">Box By</label>
            <select
              className="dimensions-details-input-1"
              value={dimensionData.boxBy}
              readOnly
            >
              <option value="prep">Prep</option>
              <option value="customer">Customer</option>
            </select>
          </div>
        </div>

        {/* <center>
          <button className="dimensions-details-button" type="submit">
            Update
          </button>
        </center> */}
      </form>
    </div>
  );
}
export default CustomerDimension;
