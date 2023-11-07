import React, { useState, useEffect } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Link } from "react-router-dom";
import { CustomerNavbarData } from "./CustomerNavbar.js";
import "./index.css";
import { IconContext } from "react-icons";
import { useNavigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import CustomerHomePage from "../CustomerHomePage";
import CustomerAccepted from "../CustomerHomePage/customerAccepted.js";
import CustomerRejected from "../CustomerHomePage/customerRejected.js";
import CustomerAllProducts from "../CustomerHomePage/customerAllproducts.js";
function CustomerNavbar() {
  const [sidebar, setSidebar] = useState(false);
  const [status, setStatus] = useState(5);
  const [currentComponent, setCurrentComponent] = useState(
    <CustomerHomePage key={status} id={status} />
  );

  console.log(status);

  const showSidebar = () => setSidebar(!sidebar);

  const handleSidebarItemClick = async (id) => {
    await setSidebar(false);
    console.log(id, "called");
    await setStatus(id);
  };

  useEffect(() => {
    handleSidebarItemClick(status);
    // Update the currentComponent when status changes
    setCurrentComponent(<CustomerHomePage key={status} id={status} />);
  }, [status]);

  const navigate=useNavigate()

  const postOrder=()=>{
    navigate("/upload")
  }

  return (
    <div className="navbar-container">
      <IconContext.Provider value={{ color: "#fff" }}>
        <div className={`navbar ${sidebar ? "shifted" : ""}`}>
          <Link to="#" className="menu-bars">
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
          <div className="navbar-logout-button-container">
            <button className="navbar-logout-button" onClick={postOrder}>Post Order</button>
            <button className="navbar-logout-button">Logout</button>
          </div>
          
        </div>
        <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
          <ul className="nav-menu-items" onClick={showSidebar}>
            <li className="navbar-toggle">
              <Link to="#" className="menu-bars">
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            {CustomerNavbarData.map((item, index) => {
              console.log(item.id);
              return (
                <li
                  key={index}
                  className={item.cName}
                  onClick={() => handleSidebarItemClick(item.id)}
                >
                  <Link to={item.path}>
                    {item.icon}
                    <span className=".span">{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </IconContext.Provider>

      <div className={`content-container ${sidebar ? "shifted" : ""}`}>
        {status === 5 ? (
          <CustomerHomePage />
        ) : status ===6 ? (
          <CustomerAccepted />
        ) : status === 7 ? (
          <CustomerRejected />
        ) : status === 8 ? (
          <CustomerAllProducts />
        ) : (
          <div>Other components for different status values</div>
        )}
      </div>
    </div>
  );
}

export default CustomerNavbar;
