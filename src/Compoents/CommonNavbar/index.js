//import { Link } from 'react-router-dom';
import {useEffect,useState}  from 'react'
import { useNavigate } from "react-router-dom";

import "./index.css";
import Popup from "reactjs-popup";
import AdminProfileView from "../AdminProfileView";

function CommonNavbar() {

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [userDetatils, setUserDetails] = useState([]);

  const navigate = useNavigate();
  const handleLogout = () => {
    sessionStorage.removeItem("token");
    localStorage.removeItem("role");
    sessionStorage.removeItem("sname");
    navigate("/stafflogin");
  };

  const role = sessionStorage.getItem("role");
  const name = sessionStorage.getItem("sname");

  const handleCloseClick=()=>{
    setIsPopupOpen(false)
  }

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
        setUserDetails(data.staff, "stafffffffffffffffffffffffffffffffffffff");
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
    <div className="common-navbar">
      {/* <FaIcons.FaBars className='common-menu-bars' disable /> */}

      <div className="common-navbar-logout-button-container">
        <p className="common-navbar-nav-item-name">{name}</p>
        <p className="common-navbar-nav-item-name">{role}</p>
        <Popup
            closeOnDocumentClick={false}
            open={isPopupOpen}
            onClose={handleCloseClick}
            contentStyle={{ width: "500px", padding: "20px" }}
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
        <button className="common-navbar-logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}
export default CommonNavbar;
