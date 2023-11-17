import React, { useState, useEffect } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Link } from "react-router-dom";
import { CustomerNavbarData } from "./CustomerNavbar.js";
import "./index.css";
import { useNavigate } from "react-router-dom";
import CustomerHomePage from "../CustomerHomePage";
import CustomerAccepted from "../CustomerHomePage/customerAccepted.js";
import CustomerRejected from "../CustomerHomePage/customerRejected.js";
import CustomerAllProducts from "../CustomerHomePage/customerAllproducts.js";
import CustomerOrder from "../customerOrder/index.js";
import TransactionSummary from "./Amount.js";
import CustomerOrderViewDetail from "../CustomerDetailP/index.js";

function CustomerNavbar({ totalAmount, fetchTotalAmount }) {
  const [sidebar, setSidebar] = useState(false);
  const [orderId, setOrderId] = useState("");
  // const [status, setStatus] = useState(() => {
  //   const savedStatus = parseInt(localStorage.getItem("status"), 10);
  //   return isNaN(savedStatus) ? 5 : savedStatus;
  // });

const [status, setStatus]=useState(5)

  const [prevStatus, setPrevStatus] = useState(null);
  const showSidebar = () => setSidebar(!sidebar);

  const handleSidebarItemClick = async (id) => {
    // Save the current status to the previous status
    setPrevStatus(status);
    await setSidebar(false);
    await setStatus(id);
  };
  useEffect(() => {
    fetchTotalAmount();
    handleSidebarItemClick(status);
    // Save status to cookie
    localStorage.setItem("status", status);
    localStorage.setItem("prevStatus", prevStatus);
  }, [status]);

  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    localStorage.removeItem("role");
    sessionStorage.removeItem("sname");
    localStorage.removeItem("prevStatus");
    localStorage.removeItem("status");
    navigate("/");
  };

  const name = sessionStorage.getItem("sname");
  const activeToggle = sidebar ? "menu-bars toggle" : `menu-bars`;

  const openDetailPage = (id) => {
 
    if (id) {
      setPrevStatus(status);
      localStorage.setItem("prevStatus", status);
      localStorage.setItem("status", 10);
      setStatus(10);
      setOrderId(id);
      // navigate(`/CustomerOrderViewDetail/${id}`);
    } 
  };
  return (
    <div className="navbar-container">
      {/* <IconContext.Provider value={{ color: "#000" }}> */}
      <div className={`navbar ${sidebar ? "shifted" : ""}`}>
        <Link to="#" className={activeToggle}>
          <FaIcons.FaBars onClick={showSidebar} />
        </Link>
        <div className="navbar-logout-button-container">
          <TransactionSummary totalAmount={totalAmount} />
          <p className="navbar-nav-item-name">{name}</p>
          {/* <p className="customer-navbar-nav-item-name">{role}</p> */}
          <button className="navbar-logout-button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
      <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
        <ul className="nav-menu-items" onClick={showSidebar}>
          <li className="navbar-toggle">
            <div className=""></div>
            <Link to="#" className="menu-bars">
              <AiIcons.AiOutlineClose />
            </Link>
          </li>
          {CustomerNavbarData.map((item, index) => {
            const activeClassName =
              status === item.id ? `active-nav-item nav-text a` : `nav-text`;
            const activeTabIcon =
              status === item.id ? `sidebar-icon-active` : `sidebar-icon`;
            return (
              <li
                key={index}
                className={activeClassName}
                onClick={() => handleSidebarItemClick(item.id)}
              >
                <span className={activeTabIcon}>{item.icon}</span>
                <span className=".span">{item.title}</span>
              </li>
            );
          })}
        </ul>
      </nav>
      {/* </IconContext.Provider> */}

      <div className={`content-container ${sidebar ? "shifted" : ""}`}>
        {parseInt(status) === 5 ? (
          <CustomerHomePage
            fetchTotalAmount={fetchTotalAmount}
            openDetailPage={openDetailPage}
          />
        ) : parseInt(status) === 6 ? (
          <CustomerAccepted openDetailPage={openDetailPage} />
        ) : parseInt(status) === 7 ? (
          <CustomerRejected openDetailPage={openDetailPage} />
        ) : parseInt(status) === 8 ? (
          <CustomerAllProducts openDetailPage={openDetailPage} />
        ) : parseInt(status) === 10 ? (
          <CustomerOrderViewDetail
            prevStatus={prevStatus}
            orderId={orderId}
            setStatus={setStatus}
          />
        ) : (
          <CustomerOrder />
        )}
      </div>
    </div>
  );
}

export default CustomerNavbar;
