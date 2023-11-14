//import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

import "./index.css";

function CommonNavbar() {
  const navigate = useNavigate();
  const handleLogout = () => {
    sessionStorage.removeItem("token");
    localStorage.removeItem("role");
    sessionStorage.removeItem("sname");
    navigate("/");
  };

  const role = sessionStorage.getItem("role");
  const name = sessionStorage.getItem("sname");

  return (
    <div className="common-navbar">
      {/* <FaIcons.FaBars className='common-menu-bars' disable /> */}

      <div className="common-navbar-logout-button-container">
        <p className="common-navbar-nav-item-name">{name}</p>
        <p className="common-navbar-nav-item-name">{role}</p>
        <button className="common-navbar-logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}
export default CommonNavbar;
