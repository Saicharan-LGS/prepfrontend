import React, { useEffect, useState } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Link } from "react-router-dom";
import { SidebarData } from "./sidebar";
import "./index.css";
import { IconContext } from "react-icons";
import AdminMainPage from "../AdminMainPage";
import DimensionOrderList from "../DimensionOrders";
import LabelOrders from "../labelOrders";
import AccountOrders from "../AccountantPage";
function Navbar() {
  const [sidebar, setSidebar] = useState(false);
  const [currentComponent, setCurrentComponent] = useState("");

  const showSidebar = () => setSidebar(!sidebar);
  useEffect(() => {
    const role = sessionStorage.getItem("role");
    if (role === "Admin") {
      setCurrentComponent(<AdminMainPage />);
    } else if (role === "Dimension") {
      setCurrentComponent(<DimensionOrderList />);
    } else if (role === "Label") {
      setCurrentComponent(<LabelOrders />);
    }else if (role==="Accountant"){
      setCurrentComponent(<AccountOrders />)
    }
  }, []);

  const handleSidebarItemClick = (path, component) => {
    setSidebar(false);
    setCurrentComponent(component);
  };

  return (
    <div className="navbar-container">
      <IconContext.Provider value={{ color: "#fff" }}>
        <div className={`navbar ${sidebar ? "shifted" : ""}`}>
          <Link to="#" className="menu-bars">
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
          <p className="navbar-logout-button">Logout</p>
        </div>
        <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
          <ul className="nav-menu-items" onClick={showSidebar}>
            <li className="navbar-toggle">
              <Link to="#" className="menu-bars">
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            {SidebarData.map((item, index) => {
              const role = sessionStorage.getItem("role");
              console.log(role, item.value);
              let button1;
              if (role === item.value) {
                button1 = false;
              } else {
                button1 = true;
              }
              return (
                <button
                  key={index}
                  className={item.cName}
                  disabled={button1}
                  onClick={() =>
                    handleSidebarItemClick(item.path, item.component)
                  }
                >
                  <Link to={item.path}>
                    {item.icon}
                    <button className=".span">{item.title}</button>
                  </Link>
                </button>
              );
            })}
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
