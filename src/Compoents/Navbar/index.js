import React, { useState } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Link } from "react-router-dom";
import { SidebarData } from "./sidebar";
import "./index.css";
import { useNavigate } from "react-router-dom";
import { IconContext } from "react-icons";
import AdminHomePage from "../AdminHomePage";
function Navbar() {
  const [sidebar, setSidebar] = useState(false);
  const [currentComponent, setCurrentComponent] = useState(<AdminHomePage />);
  const [currentId, setCurrentId] = useState('1');

  const showSidebar = () => setSidebar(!sidebar);

  const handleSidebarItemClick = (path, component,id) => {
    setSidebar(false);
    setCurrentComponent(component);
    setCurrentId(id)
  };

  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    localStorage.removeItem("role");
    sessionStorage.removeItem("sname");
    navigate("/");
  };

  const role = sessionStorage.getItem("role");
  const name = sessionStorage.getItem("sname");

  
  const activeToggle=sidebar?"menu-bars toggle":`menu-bars`

  return (
    <div className="navbar-container">
      <IconContext.Provider value={{ color: "#000" }}>
        <div className="navbar">
          <Link to="#" className={activeToggle}>
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
          <div className="navbar-logout-button-container">
            <p className="navbar-nav-item-name">{name}</p>
            <p className="navbar-nav-item-name">{role}</p>
            <button className="navbar-logout-button" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
        <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
          <ul className="nav-menu-items" onClick={showSidebar}>
            <li className="navbar-toggle">
              <Link to="#" className="menu-bars">
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            {SidebarData.map((item, index) => {
              const activeClassName = currentId===item.id?`active-nav-item nav-text a`:`nav-text`
        
              return(
               
              <li key={index} className={activeClassName} onClick={() => handleSidebarItemClick(item.path, item.component,item.id)}>
                
                  {item.icon}
                  <span>{item.title}</span>
                  
              </li>
              
              
            )})}
          </ul>
        </nav>
      </IconContext.Provider>
      <div className={`content-container ${sidebar ? "shifted" : ""}`}>
        {currentComponent}
      </div>
    </div>
  );
}

export default Navbar;
