//import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

import "./index.css";
import Popup from "reactjs-popup";
import AdminProfileView from "../AdminProfileView";
import { useState } from "react";

function CommonNavbar() {

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const navigate = useNavigate();
  const handleLogout = () => {
    sessionStorage.removeItem("token");
    localStorage.removeItem("role");
    sessionStorage.removeItem("sname");
    navigate("/login");
  };

  const role = sessionStorage.getItem("role");
  const name = sessionStorage.getItem("sname");

  const handleCloseClick=()=>{
    setIsPopupOpen(false)
  }

  return (
    <div className="common-navbar">
      {/* <FaIcons.FaBars className='common-menu-bars' disable /> */}

      <div className="common-navbar-logout-button-container">
        <p className="common-navbar-nav-item-name">{name}</p>
        <p className="common-navbar-nav-item-name">{role}</p>
        <Popup closeOnDocumentClick={false}  contentStyle={{ width: '400px', padding: '20px' }}  trigger={<img src="https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg" alt="" className="navbar-profile-image" onClick=""/>} position="bottom right">
                <AdminProfileView onClose={handleCloseClick}/>
          </Popup>
        <button className="common-navbar-logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}
export default CommonNavbar;
