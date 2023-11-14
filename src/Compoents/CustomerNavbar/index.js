import React, { useState, useEffect } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Link } from "react-router-dom";
import { CustomerNavbarData } from "./CustomerNavbar.js";
import "./index.css";
import { IconContext } from "react-icons";
import { useNavigate } from "react-router-dom";
import CustomerHomePage from "../CustomerHomePage";
import CustomerAccepted from "../CustomerHomePage/customerAccepted.js";
import CustomerRejected from "../CustomerHomePage/customerRejected.js";
import CustomerAllProducts from "../CustomerHomePage/customerAllproducts.js";
import CustomerOrder from "../customerOrder/index.js";
import TransactionSummary from "./Amount.js";
function CustomerNavbar({ totalAmount, fetchTotalAmount }) {
  const [sidebar, setSidebar] = useState(false);
  const [status, setStatus] = useState(5);
  const [, setCurrentComponent] = useState(
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

  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    localStorage.removeItem("role");
    sessionStorage.removeItem("sname");
    navigate("/");
  };
  // const postOrder=()=>{
  //   navigate("/upload")
  // }
  // const role = sessionStorage.getItem("role")
  const name = sessionStorage.getItem("sname");

  const activeToggle = sidebar ? "menu-bars toggle" : `menu-bars`;

  return (
    <div className="navbar-container">
      <IconContext.Provider value={{ color: "#000" }}>
        <div className={`navbar ${sidebar ? "shifted" : ""}`}>
          <Link to="#" className={activeToggle}>
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
          <div className="customer-navbar-logout-button-container">
            <TransactionSummary totalAmount={totalAmount} />
            <p className="customer-navbar-nav-item-name">{name}</p>
            {/* <p className="customer-navbar-nav-item-name">{role}</p> */}
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
          <CustomerHomePage fetchTotalAmount={fetchTotalAmount} />
        ) : status === 6 ? (
          <CustomerAccepted />
        ) : status === 7 ? (
          <CustomerRejected />
        ) : status === 8 ? (
          <CustomerAllProducts />
        ) : (
          <CustomerOrder />
        )}
      </div>
    </div>
  );
}

export default CustomerNavbar;
