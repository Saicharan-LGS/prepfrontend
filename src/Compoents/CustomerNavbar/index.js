// // import React, { useState, useEffect } from "react";
// // import * as FaIcons from "react-icons/fa";
// // import * as AiIcons from "react-icons/ai";
// // import { Link } from "react-router-dom";
// // import { CustomerNavbarData } from "./CustomerNavbar.js";
// // import './index.css';
// // import { IconContext } from "react-icons";
// // import { useNavigate } from "react-router-dom";
// // import CustomerHomePage from "../CustomerHomePage";
// // import CustomerAccepted from "../CustomerHomePage/customerAccepted.js";
// // import CustomerRejected from "../CustomerHomePage/customerRejected.js";
// // import CustomerAllProducts from "../CustomerHomePage/customerAllproducts.js";
// // import CustomerOrder from "../customerOrder/index.js";
// // import TransactionSummary from "./Amount.js";

// // function CustomerNavbar({ totalAmount, fetchTotalAmount }) {
// //   const [sidebar, setSidebar] = useState(false);
// //   const [status, setStatus] = useState(() => {
// //     // Get status from cookie or default to 5
// //     let savedStatus = localStorage.getItem("status");
// //     console.log(savedStatus,"SAVED");

// //     // Check if status is null or not a valid number
// //     if (savedStatus === undefined || isNaN(parseInt(savedStatus, 10))) {
// //       // If status is not present in local storage or not a valid number, set it to 5
// //       savedStatus = 5;
// //       localStorage.setItem("status", savedStatus);
// //     } else {
// //       // Parse the valid status to ensure it's a number
// //       savedStatus = parseInt(savedStatus, 10);
// //     }

// //     return savedStatus;
// //   });

// //   const [, setCurrentComponent] = useState(
// //     <CustomerHomePage key={status} id={status} />
// //   );

// //   console.log(status);

// //   const showSidebar = () => setSidebar(!sidebar);

// //   const handleSidebarItemClick = (path, component,id) => {
// //     setSidebar(false);
// //     setCurrentComponent(component);
// //     console.log(component,id)
// //     setStatus(id)
// //   };

// //   useEffect(() => {
// //     fetchTotalAmount();
// //     handleSidebarItemClick(status);
// //     // Update the currentComponent when status changes
// //     setCurrentComponent(<CustomerHomePage key={status} id={status} />);
// //     // Save status to cookie
// //     localStorage.setItem("status", status);
// //   }, []);

// //   const navigate = useNavigate();

// //   const handleLogout = () => {
// //     sessionStorage.removeItem("token");
// //     localStorage.removeItem("role");
// //     sessionStorage.removeItem("sname");
// //     navigate("/");
// //   };

// //   const name = sessionStorage.getItem("sname");

// //   const activeToggle = sidebar ? "menu-bars toggle" : `menu-bars`;
// //   console.log(status)
// //   return (
// //     <div className="navbar-container">
// //       <IconContext.Provider value={{ color: "#000" }}>
// //         <div className={`navbar ${sidebar ? "shifted" : ""}`}>
// //           <Link to="#" className={activeToggle}>
// //             <FaIcons.FaBars onClick={showSidebar} />
// //           </Link>
// //           <div className="navbar-logout-button-container">
// //           <TransactionSummary  totalAmount={totalAmount}   />
// //             <p className="navbar-nav-item-name">{name}</p>
// //             {/* <p className="customer-navbar-nav-item-name">{role}</p> */}
// //             <button className="navbar-logout-button" onClick={handleLogout}>Logout</button>
// //           </div>
// //         </div>
// //         <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
// //           <ul className="nav-menu-items" onClick={showSidebar}>
// //             <li className="navbar-toggle">
// //               <Link to="#" className="menu-bars">
// //                 <AiIcons.AiOutlineClose />
// //               </Link>
// //               </li>
// //             {CustomerNavbarData.map((item, index) => {
// //               const activeClassName = status===item.id?`active-nav-item nav-text`:`nav-text`
// //               return(
// //               <li key={index} className={activeClassName} onClick={() => handleSidebarItemClick(item.path, item.component,item.id)}>
// //                   {item.icon}
// //                   <span>{item.title}</span>
// //               </li>
// //               );
// //             })}
// //           </ul>
// //         </nav>
// //       </IconContext.Provider>
// //       <div className={`content-container ${sidebar ? "shifted" : ""}`}>
// //         {status === 5 ? (
// //           <CustomerHomePage fetchTotalAmount={fetchTotalAmount} />
// //         ) : status === 6 ? (
// //           <CustomerAccepted />
// //         ) : status === 7 ? (
// //           <CustomerRejected />
// //         ) : status === 8 ? (
// //           <CustomerAllProducts />
// //         ) : (
// //           <CustomerOrder />
// //         )}
// //       </div>
// //     </div>
// //   );
// // }

// // export default CustomerNavbar;

// import React, { useState, useEffect } from "react";
// import * as FaIcons from "react-icons/fa";
// import * as AiIcons from "react-icons/ai";
// import { Link } from "react-router-dom";
// import { CustomerNavbarData } from "./CustomerNavbar.js";
// import "./index.css";
// import { IconContext } from "react-icons";
// import { useNavigate } from "react-router-dom";
// import CustomerHomePage from "../CustomerHomePage";
// import CustomerAccepted from "../CustomerHomePage/customerAccepted.js";
// import CustomerRejected from "../CustomerHomePage/customerRejected.js";
// import CustomerAllProducts from "../CustomerHomePage/customerAllproducts.js";
// import CustomerOrder from "../customerOrder/index.js";
// import TransactionSummary from "./Amount.js";
// function CustomerNavbar({ totalAmount,fetchTotalAmount}) {
//   const [sidebar, setSidebar] = useState(false);
//   const [status, setStatus] = useState(5);
//   const [currentComponent, setCurrentComponent] = useState(
//     <CustomerHomePage key={status} id={status} />
//   );

//   console.log(status);

//   const showSidebar = () => setSidebar(!sidebar);

//   const handleSidebarItemClick = ( component,id) => {
//     setSidebar(false);
//     setCurrentComponent(component);
//     setStatus(id)
//   };

//   useEffect(() => {
//     handleSidebarItemClick(status);
//     // Update the currentComponent when status changes
//     setCurrentComponent(<CustomerHomePage key={status} id={status} />);
//   }, [status]);

//   const navigate=useNavigate()

//   const handleLogout = () => {
//     sessionStorage.removeItem("token");
//     localStorage.removeItem("role");
//     sessionStorage.removeItem("sname");
//     navigate("/");
//   };
//   const postOrder=()=>{
//     navigate("/upload")
//   }
//   const role = sessionStorage.getItem("role")
//   const name = sessionStorage.getItem("sname")

//   const activeToggle=sidebar?"menu-bars toggle":`menu-bars`

//   return (
//     <div className="navbar-container">
//       <IconContext.Provider value={{ color: "#000" }}>
//         <div className={`navbar ${sidebar ? "shifted" : ""}`}>
//           <Link to="#" className={activeToggle}>
//             <FaIcons.FaBars onClick={showSidebar} />
//           </Link>
//           <div className="navbar-logout-button-container">
//           <TransactionSummary  totalAmount={totalAmount}   />
//             <p className="navbar-nav-item-name">{name}</p>
//             {/* <p className="customer-navbar-nav-item-name">{role}</p> */}
//             <button className="navbar-logout-button" onClick={handleLogout}>Logout</button>
//           </div>

//         </div>
//         <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
//           <ul className="nav-menu-items" onClick={showSidebar}>
//             <li className="navbar-toggle">
//               <Link to="#" className="menu-bars">
//                 <AiIcons.AiOutlineClose />
//               </Link>
//             </li>
//             {CustomerNavbarData.map((item, index) => {
//               console.log(item.id);
//               const activeClassName = status===item.id?`active-nav-item nav-text a`:`nav-text`
//               return (
//                 <li
//                   key={index}
//                   className={activeClassName}
//                   onClick={() => handleSidebarItemClick(item.id)}
//                 >

//                     {item.icon}
//                     <span className=".span">{item.title}</span>
//                 </li>
//               );
//             })}

//           </ul>

//         </nav>
//       </IconContext.Provider>

//       <div className={`content-container ${sidebar ? "shifted" : ""}`}>
//         {status === 5 ? (
//           <CustomerHomePage fetchTotalAmount={fetchTotalAmount} />
//         ) : status ===6 ? (
//           <CustomerAccepted />
//         ) : status === 7 ? (
//           <CustomerRejected />
//         ) : status === 8 ? (
//           <CustomerAllProducts />
//         ) : (
//           <CustomerOrder/>
//         )}
//       </div>

//     </div>
//   );
// }

// export default CustomerNavbar;

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
function CustomerNavbar({ totalAmount, fetchTotalAmount }) {
  const [sidebar, setSidebar] = useState(false);
  const [status, setStatus] = useState(5);

  const showSidebar = () => setSidebar(!sidebar);

  const handleSidebarItemClick = async (id) => {
    await setSidebar(false);
    await setStatus(id);
  };
  useEffect(() => {
    fetchTotalAmount();
  }, []);

  useEffect(() => {
    fetchTotalAmount();
    handleSidebarItemClick(status);
  }, [status]);

  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    localStorage.removeItem("role");
    sessionStorage.removeItem("sname");
    navigate("/");
  };

  const name = sessionStorage.getItem("sname");
  const activeToggle = sidebar ? "menu-bars toggle" : `menu-bars`;

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
              <Link to="#" className="menu-bars">
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            {CustomerNavbarData.map((item, index) => {
            
              const activeClassName = status===item.id?`active-nav-item nav-text a`:`nav-text`
              const activeTabIcon = status===item.id?`sidebar-icon-active`:`sidebar-icon`
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
