import React from "react";
import { Routes, Route } from "react-router-dom";
import ProductList from "./Compoents/adminOrders";
import LabelOrders from "./Compoents/labelOrders";
import CustomerOrder from "./Compoents/customerOrder";
import OrderViewDetail from "./Compoents/AdminDetailPage";
import DimensionsUpdate from "./Compoents/DimensionsUpdate";
import DimensionOrderList from "./Compoents/DimensionOrders";
import AdminHomePage from "./Compoents/AdminHomePage";
import Navbar from "./Compoents/Navbar";
import AccountOrders from "./Compoents/AccountantPage";
import StaffSigninPage from "./Compoents/StaffLogin";
import StaffSignupPage from "./Compoents/StaffRegistration";

import CustomerHomePage from "./Compoents/CustomerHomePage";

import Customersignup from "./Compoents/CustomerSignup";
import CustomerLogin from "./Compoents/CustomerLogin";
import ViewDetailedOrder from "./Compoents/ViewDetailedOrder";

import CustomerNavbar from "./Compoents/CustomerNavbar";
import CustomerOrderViewDetail from "./Compoents/CustomerDetailP";

import CommonNavbar from "./Compoents/CommonNavbar";

// import Login from "./Compoents/Login";
const role = sessionStorage.getItem("role");

console.log(role, "app");
function App() {
  return (
    <Routes>
      <Route path="/Customersignup" element={<Customersignup />} />
      <Route path="/" element={<StaffSigninPage />} />
      {role === undefined && (
        <Route path="/staffsignup" element={<StaffSignupPage />} />
      )}
      {role === "Customer" && (
        <Route
          path="/CustomerOrderViewDetail/:id"
          element={<CustomerOrderViewDetail />}
        />
      )}
      {<Route path="/CustomerLogin" element={<CustomerLogin />} />}

      {(role === "Accountant" || role === "Admin") && (
        <Route path="/accountOrders" element={<AccountOrders />} />
      )}
      {(role === "Dimension" || role === "Admin") && (
        <Route path="/dimensionorders" element={<DimensionOrderList />} />
      )}
      {(role === "Dimension" || role === "Admin") && (
        <Route path="/dimensionupdate/:id" element={<DimensionsUpdate />} />
      )}
      {role === "Customer" && (
        <Route path="/upload" element={<CustomerOrder />} />
      )}
        <Route path="/adminViewDetail/:id" element={<OrderViewDetail />} />
  
      {role === "Admin" && (
        <Route path="/adminOrders" element={<ProductList />} />
      )}
      <Route path="/labelOrders" element={<LabelOrders />} />
      {role === "Customer" && (
        <Route path="/adminhomepage" element={<AdminHomePage />} />
      )}
      <Route path="/navbar" element={<Navbar />} />
      {role === "Customer" && (
        <Route path="/customerhomepage" element={<CustomerHomePage />} />
      )}
      <Route path="/viewDetailedorder/:id" element={<ViewDetailedOrder />} />
      {role === "Customer" && (
        <Route path="/customernavbar" element={<CustomerNavbar />} />
      )}
      <Route path="/commonNavbar" element={<CommonNavbar />} />
      {/* <Route path="/" element={<Login />} /> */}
    </Routes>
  );
}

export default App;
