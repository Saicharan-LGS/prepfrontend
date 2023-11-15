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
import CustomerOrderViewDetail from "../CustomerDetailP/index.js";

function CustomerNavbar({ totalAmount, fetchTotalAmount }) {
  const [sidebar, setSidebar] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [status, setStatus] = useState(() => {
    // Get status from cookie or default to 5
    const savedStatus = parseInt(localStorage.getItem("status"), 10);
    console.log(savedStatus, "updated");
    return isNaN(savedStatus) ? 5 : savedStatus;
  });

  const [prevStatus, setPrevStatus] = useState(null);

  console.log(status);

  const showSidebar = () => setSidebar(!sidebar);

  const handleSidebarItemClick = async (id) => {
    // Save the current status to the previous status
    setPrevStatus(status);
    await setSidebar(false);
    console.log(id, "called");
    await setStatus(id);
  };
  useEffect(() => {
    fetchTotalAmount();
    handleSidebarItemClick(status);
    // Update the currentComponent when status changes
    console.log(status, "called staus");
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
    console.log("called");
    console.log("Clicked on item with id:", id);
    // console.log(`/adminViewDetail/${e.target.id}`)

    if (id) {
      setPrevStatus(status);
      localStorage.setItem("prevStatus", status);
      localStorage.setItem("status", 10);
      setStatus(10);
      setOrderId(id);
      // navigate(`/CustomerOrderViewDetail/${id}`);
    } else {
      console.error("Invalid id:", id);
    }
  };
  console.log(status, "sai");
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
