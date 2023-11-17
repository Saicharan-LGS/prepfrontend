import React, { useEffect, useState } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Link } from "react-router-dom";
import { SidebarData } from "./sidebar";
import "./index.css";
import { useNavigate } from "react-router-dom";
import AdminHomePage from "../AdminHomePage";
import Customersignup from "../CustomerSignup";
import AccountOrders from "../AccountantPage";
import LabelOrders from "../labelOrders";
import StaffSignupPage from "../StaffRegistration";
import DimensionOrderList from "../DimensionOrders";
import OrderViewDetail from "../AdminDetailPage";



function Navbar() {
  const [sidebar, setSidebar] = useState(false);
  const [status, setStatus] = useState(1);
  const [orderId, setOrderId] = useState("");
  const showSidebar = () => setSidebar(!sidebar);
  const [prevStatus, setPrevStatus] = useState(null);

  const handleSidebarItemClick = async (id) => {
    setPrevStatus(status);
    await setSidebar(false);
    await setStatus(id);
  };
  useEffect(() => {
    handleSidebarItemClick(status);
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
  const openDetailPageComponent = (id) => {
    if (id) {
      setPrevStatus(status);
      localStorage.setItem("prevStatus", status);
      localStorage.setItem("status", 10);
      setStatus(10);
      setOrderId(id);
      // navigate(`/CustomerOrderViewDetail/${id}`);
    } else {
    }
  };
  const role = sessionStorage.getItem("role");
  const name = sessionStorage.getItem("sname");

  const activeToggle = sidebar ? "menu-bars toggle" : `menu-bars`;
  return (
    <div className="navbar-container">
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
              <AiIcons.AiOutlineClose className="toggle-icon" />
            </Link>
          </li>
          {SidebarData.map((item, index) => {
            const activeClassName =
              status === item.id ? `active-nav-item nav-text a` : `nav-text`;
            const activeTabIcon =
              status === item.id ? `sidebar-icon-active` : `sidebar-icon`;
            return (
              <li
                key={index}
                className={activeClassName}
                onClick={() =>
                  handleSidebarItemClick(item.id)
                }
              >
                <span className={activeTabIcon}>{item.icon}</span>
                <span>{item.title}</span>
              </li>
            );
          })}
        </ul>
      </nav>
      {/* <div className={`content-container ${sidebar ? "shifted" : ""}`}>
        {currentComponent}
      </div> */}
       <div className={`content-container ${sidebar ? "shifted" : ""}`}>
        {parseInt(status) === 1 ? (
          <AdminHomePage openDetailPageComponent={openDetailPageComponent} />
        ) : parseInt(status) === 2 ? (
          <Customersignup openDetailPageComponent={openDetailPageComponent} />
        ) : parseInt(status) === 3 ? (
          <StaffSignupPage openDetailPageComponent={openDetailPageComponent} />
        ) : parseInt(status) === 4 ? (
          <DimensionOrderList openDetailPageComponent={openDetailPageComponent} />
        ) : parseInt(status) === 5 ? (
          <LabelOrders openDetailPageComponent={openDetailPageComponent} />
         ): parseInt(status) === 6 ? (
          <AccountOrders openDetailPageComponent={openDetailPageComponent} />
        ) : (
          <OrderViewDetail orderId={orderId} setStatus={setStatus}/>
          )}
      </div>
    </div>
  );
}

export default Navbar;
