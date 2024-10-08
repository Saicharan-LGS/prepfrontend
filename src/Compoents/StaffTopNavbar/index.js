import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Popup from "reactjs-popup";
import AdminProfileView from "../AdminProfileView";
import axxpress from "../images/Axxpress1-1.png";
import "./index.css";

function StaffTopNavbar() {
  const [userDetatils, setUserDetails] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const navigate = useNavigate();
  const handleLogout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("role");
    sessionStorage.removeItem("sname");
    sessionStorage.removeItem("prevStatus");
    sessionStorage.removeItem("status");
    navigate("/stafflogin");
  };

  const handleCloseClick = () => {
    setIsPopupOpen(false);
  };

  const role = sessionStorage.getItem("role");
  const name = sessionStorage.getItem("sname");

  const REACT_APP_PDF_URL = process.env.REACT_APP_PDF_URL;

  const FETCH_URL = process.env.REACT_APP_FETCH_URL;
  const fetchProducts = async () => {
    try {
      const token = sessionStorage.getItem("token");
      const response = await fetch(`${FETCH_URL}getSpecificStaffDetails`, {
        method: "GET",
        headers: {
          Authorization: ` Bearer ${token}`,
        },
      }); // Replace with your API endpoint
      if (response.ok) {
        const data = await response.json();
        setUserDetails(data.staff);
      } else {
        setUserDetails("");
      }
    } catch (error) {
      setUserDetails("");
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="navbar-main-container" style={{ paddingRight: "40px" }}>
      <img
        src={axxpress}
        style={{
          width: "150px",
          height: "40px",
          marginLeft: "40px",
          marginTop: "3px",
        }}
        alt="axxpress"
      />
      <div className="navbar-sub-container">
        <div className="navbar-logout-button-container">
          <p className="navbar-nav-item-name">{name}</p>
          <p className="navbar-nav-item-name">{role}</p>
          <Popup
            closeOnDocumentClick={false}
            open={isPopupOpen}
            onClose={handleCloseClick}
            contentStyle={{
              minWidth: "400px",
              padding: "20px",
              maxWidth: "max-content !importtant",
            }}
            trigger={
              <img
                src={`${REACT_APP_PDF_URL}${
                  userDetatils && userDetatils.profile
                }`}
                alt=""
                className="navbar-profile-image"
                onClick=""
              />
            }
            position="bottom right"
          >
            <AdminProfileView
              onClose={handleCloseClick}
              fetchProducts1={fetchProducts}
            />
          </Popup>
          {/* <button className="navbar-logout-button" onClick={handleLogout}>
            Logout
          </button>
          <IoMdLogOut
            className="navbar-logout-button-icon"
            onClick={handleLogout}
          /> */}
          {/* <Clock handleLogout={handleLogout} /> */}
        </div>
      </div>
    </div>
  );
}
export default StaffTopNavbar;
