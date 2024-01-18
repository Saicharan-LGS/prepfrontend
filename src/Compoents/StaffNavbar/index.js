import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { BsFillPersonFill } from "react-icons/bs";
import {
  MdProductionQuantityLimits,
  MdOutlinePinch,
  MdLabelImportant,
  MdPeopleAlt,
  MdOutlinePeopleAlt,
} from "react-icons/md";
import { AiOutlineTeam } from "react-icons/ai";
import { IoLogOut, IoPaperPlane } from "react-icons/io5";
import { RiAccountCircleFill } from "react-icons/ri";
import { GiHamburgerMenu } from "react-icons/gi";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";
import { FaListAlt } from "react-icons/fa";
import { IoIosNotifications } from "react-icons/io";

import AdminHomePage from "../AdminHomePage";
import Customersignup from "../CustomerSignup";
import StaffSignupPage from "../StaffRegistration";
import DimensionOrderList from "../DimensionOrders";
import LabelOrders from "../labelOrders";
import AccountOrders from "../AccountantPage";
import StaffList from "../StaffList";
import CustomerList from "../CustomerList";
import { ProductServiceList } from "../Services";
import Dispatch from "../Dispatch";
import CustomerPendingList from "../CustomerPending";
import OrderViewDetail from "../AdminDetailPage";
import StaffTopNavbar from "../StaffTopNavbar";

function SideBar() {
  const [isCollapsed, setIsCollapsed] = useState(true);
  
  const [prevStatus, setPrevStatus] = useState(null);
  const [orderId, setOrderId] = useState("");
  const [activeTab, setActiveTab] = useState(1);

  const navigate = useNavigate();

  const [status, setStatus] = useState(() => {
    const storedStatus = sessionStorage.getItem("status");
    if (storedStatus === "12") {
      return sessionStorage.getItem("prevStatus");
    } else if (storedStatus === "") {
      return 9;
    } else {
      return parseInt(storedStatus);
    }
  });

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    localStorage.removeItem("role");
    sessionStorage.removeItem("sname");
    localStorage.removeItem("prevStatus");
    localStorage.removeItem("status");
    navigate("/login");
  };

  const handleMouseEnter=()=>{
    setIsCollapsed(false)
  }

  const handleMouseLeave=()=>{
    setIsCollapsed(true)
  }

  const handleSidebarItemClick = async (id) => {
    console.log(id,"id")
    setPrevStatus(status);
    await setStatus(id);
    setActiveTab(id)
  };

  useEffect(() => {
    handleSidebarItemClick(status);
    sessionStorage.setItem("status", status);
    sessionStorage.setItem("prevStatus", prevStatus);
  }, [status]);

  const openDetailPageComponent = (id) => {
    if (id) {
      setPrevStatus(status);
      localStorage.setItem("prevStatus", status);
      // localStorage.setItem("status", 12);
      setStatus(12);
      setOrderId(id);
      setActiveTab(id)
  
      // navigate(`/CustomerOrderViewDetail/${id}`);
    } else {
    }
  };

  console.log(status,activeTab,"kapil")

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar
        backgroundColor="#ffc03d"
        className="sidebar-container"
        collapsed={isCollapsed}
        collapsedWidth="60px"
      >
        <Menu
          menuItemStyles={{
            button: {
              "&.active": {
                backgroundColor: "#212d45",
                color: "#fff",
              },
              backgroundColor: "#ffc03d", // Background color for menu items
              color: "#212d45", // Default text color for menu items
              "&:hover": {
                backgroundColor: "#212d45", // Background color on hover
                color: "#ffffff", // Text color on hover
              },
            },
          }}
        >
          <div className="hamburger-icon">
            <GiHamburgerMenu style={{color:"#212d45"}} onMouseEnter={handleMouseEnter}
             onClick={() => setIsCollapsed(!isCollapsed)} />
          </div>
          <MenuItem onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            icon={<MdProductionQuantityLimits fontSize="25px" />}
            onClick={() => handleSidebarItemClick(1)}
            style={status === 1 ? { backgroundColor: "#212d45", color: "#fff" } : {}}
          >
            Receiving
          </MenuItem>
          <MenuItem onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            icon={<MdOutlinePinch fontSize="25px" />}
            onClick={() => handleSidebarItemClick(4)}
            style={status === 4 ? { backgroundColor: "#212d45", color: "#fff" } : {}}
            
          >
            Dimensions
          </MenuItem>
          <MenuItem onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            icon={<MdLabelImportant fontSize="25px" />}
            onClick={() => handleSidebarItemClick(5)}
            style={status === 5 ? { backgroundColor: "#212d45", color: "#fff" } : {}}
          >
           Label Orders
          </MenuItem>
          <MenuItem onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            icon={<RiAccountCircleFill fontSize="25px" />}
            onClick={() => handleSidebarItemClick(6)}
            style={status === 6 ? { backgroundColor: "#212d45", color: "#fff" } : {}}
          >
            Accountant
          </MenuItem>
          <MenuItem onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            icon={<IoPaperPlane fontSize="20px" />}
            onClick={() => handleSidebarItemClick(10)}
            style={status === 10 ? { backgroundColor: "#212d45", color: "#fff" } : {}}
          >
            Dispatch
          </MenuItem>
          <MenuItem onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            icon={<BsFillPersonFill fontSize="25px" />}
            onClick={() => handleSidebarItemClick(2)}
            style={status === 2 ? { backgroundColor: "#212d45", color: "#fff" } : {}}
          >
            Add Customer
          </MenuItem>
          <MenuItem onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            icon={<MdPeopleAlt fontSize="25px" />}
            onClick={() => handleSidebarItemClick(8)}
            style={status === 8 ? { backgroundColor: "#212d45", color: "#fff" } : {}}
          >
            Customers List
          </MenuItem>
          <MenuItem onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            icon={<AiOutlineTeam fontSize="25px"  />}
            onClick={() => handleSidebarItemClick(3)}
            style={status === 3 ? { backgroundColor: "#212d45", color: "#fff" } : {}}
          >
            Add Staff
          </MenuItem>
          <MenuItem onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            icon={<MdOutlinePeopleAlt fontSize="25px"  />}
            onClick={() => handleSidebarItemClick(7)}
            style={status === 7 ? { backgroundColor: "#212d45", color: "#fff" } : {}}
          >
            Staff List
          </MenuItem>
          <MenuItem onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            icon={<FaListAlt fontSize="20px"  />}
            onClick={() => handleSidebarItemClick(9)}
            style={status === 9 ? { backgroundColor: "#212d45", color: "#fff" } : {}}
          >
            Product & Services
          </MenuItem>
          <MenuItem onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            icon={<IoIosNotifications fontSize="25px"  />}
            onClick={() => handleSidebarItemClick(11)}
            style={status === 11 ? { backgroundColor: "#212d45", color: "#fff" } : {}}
          >
            Customer Requests
          </MenuItem>
          <MenuItem onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave} icon={<IoLogOut />} onClick={handleLogout}>
            Logout
          </MenuItem>
        </Menu>
        <div>
          {/* <img
            src={Logo}
            alt="OrganizeWise Logo"
            className="organizeWise-logo"
          /> */}
        </div>
      </Sidebar>
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "30px",
        }}
      > 

      <StaffTopNavbar/>
        
       {parseInt(status) === 1 ? (
          <AdminHomePage openDetailPageComponent={openDetailPageComponent} />
        ) : parseInt(status) === 2 ? (
          <Customersignup openDetailPageComponent={openDetailPageComponent} />
        ) : parseInt(status) === 3 ? (
          <StaffSignupPage openDetailPageComponent={openDetailPageComponent} />
        ) : parseInt(status) === 4 ? (
          <DimensionOrderList
            openDetailPageComponent={openDetailPageComponent}
          />
        ) : parseInt(status) === 5 ? (
          <LabelOrders openDetailPageComponent={openDetailPageComponent} />
        ) : parseInt(status) === 6 ? (
          <AccountOrders openDetailPageComponent={openDetailPageComponent} />
        ) : parseInt(status) === 7 ? (
          <StaffList openDetailPageComponent={openDetailPageComponent} />
        ) : parseInt(status) === 8 ? (
          <CustomerList openDetailPageComponent={openDetailPageComponent} />
        ) : parseInt(status) === 9 ? (
          <ProductServiceList />
        ) : parseInt(status) === 10 ? (
          <Dispatch />
        ): parseInt(status) === 11 ? (
          <CustomerPendingList />
        ) : (
          <OrderViewDetail orderId={orderId} setStatus={setStatus} />
        )}
     

       
      </div>
    </div>
  );
}

export default SideBar;



