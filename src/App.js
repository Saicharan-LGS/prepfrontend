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

function App() {
  return (
    <Routes>
      <Route path="/CustomerLogin" element={<CustomerLogin />} />
      <Route path="/Customersignup" element={<Customersignup />} />
      <Route path="/staffsignin" element={<StaffSigninPage />} />
      <Route path="/staffsignup" element={<StaffSignupPage />} />
      <Route path="/accountOrders" element={<AccountOrders />} />
      <Route path="/dimensionorderlist" element={<DimensionOrderList />} />
      <Route path="/dimensionupdate/:id" element={<DimensionsUpdate />} />
      <Route path="/upload" element={<CustomerOrder />} />
      <Route path="/adminViewDetail/:id" element={<OrderViewDetail />} />
      <Route path="/adminOrders" element={<ProductList />} />
      <Route path="/labelOrders" element={<LabelOrders />} />
      <Route path="/adminhomepage" element={<AdminHomePage />} />
      <Route path="/navbar" element={<Navbar />} />
      <Route path="/customerhomepage" element={<CustomerHomePage />} />
      <Route path="/viewDetailedorder/:id" element={<ViewDetailedOrder />} />
      <Route path="/customernavbar" element={<CustomerNavbar />} />
    </Routes>
  );
}

export default App;
