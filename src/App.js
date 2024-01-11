import React, { useState, useEffect } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import ProductList from "./Compoents/adminOrders";
import LabelOrders from "./Compoents/labelOrders";
import OrderViewDetail from "./Compoents/AdminDetailPage";
import DimensionOrderList from "./Compoents/DimensionOrders";
import AdminHomePage from "./Compoents/AdminHomePage";
import Navbar from "./Compoents/Navbar";
import AccountOrders from "./Compoents/AccountantPage";
import StaffSigninPage from "./Compoents/StaffLogin";
import CustomerHomePage from "./Compoents/CustomerHomePage";
import CustomerLogin from "./Compoents/CustomerLogin";
import ViewDetailedOrder from "./Compoents/ViewDetailedOrder";
import ProtectedRoute from "./Compoents/ProtectedRoute";
import CustomerNavbar from "./Compoents/CustomerNavbar";
import CustomerOrderViewDetail from "./Compoents/CustomerDetailP";
import CommonNavbar from "./Compoents/CommonNavbar";
import DimensionUpdatePage from "./Compoents/DimensionUpdatePage";
import NotFound from "./Compoents/NotFound";
import Dispatch from "./Compoents/Dispatch";
import DimensionNewDetailPage from "./Compoents/DimensionDetailPage";
import CustomerResetPasswordUpdate from "./Compoents/CustomerNavbar/CustomerResetPassword";
import Customersignup2 from "./Compoents/CustomerSignup/CustomerSignup2";
import CustomerForgotPassword from "./Compoents/CustomerNavbar/CustomerForgot";
import CustomerOtpVerification from "./Compoents/CustomerNavbar/CustomerOtp";

function App() {
  const role = localStorage.getItem("role");
  const [totalAmount, setTotalAmount] = useState(0);
  const token = sessionStorage.getItem("token");

  const fetchTotalAmount = () => {
    if (!token) {
      return;
    }
    fetch(`${process.env.REACT_APP_FETCH_URL}getAmount`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setTotalAmount(data.total_amount);
        console.log(data.total_amount);
      })
      .catch((error) => {
        console.log(error);
        setTotalAmount(0);
      });
  };

  useEffect(() => {
    if (role === "Customer") {
      fetchTotalAmount();
    }
  }, [role]);

  return (
    <Routes>
      <Route path="/CustomerOtpVerification" element={<CustomerOtpVerification />} />
      <Route path="/CustomerForgotPassword"  element={<CustomerForgotPassword />} />
      <Route path="/signup" element={<Customersignup2 />} />
      <Route path="/CustomerResetPasswordUpdate" element={<CustomerResetPasswordUpdate />} />
      <Route path="*" element={<NotFound />} />

      <Route path="/" element={<CustomerLogin />} />
      <Route path="/login" element={<StaffSigninPage />} />
      <Route
        path="/dimensiondetailpage/:id"
        element={
          <ProtectedRoute allowedRoles={["Dimension"]}>
            <DimensionNewDetailPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/CustomerOrderViewDetail/:id"
        element={
          <ProtectedRoute allowedRoles={["Customer"]}>
            <CustomerOrderViewDetail />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dispatch"
        element={
          <ProtectedRoute allowedRoles={["Accountant", "Dispatch"]}>
            <Dispatch />
          </ProtectedRoute>
        }
      />
      <Route
        path="/accountOrders"
        element={
          <ProtectedRoute allowedRoles={["Accountant", "Admin"]}>
            <AccountOrders />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dimensionorders"
        element={
          <ProtectedRoute allowedRoles={["Dimension", "Admin"]}>
            <DimensionOrderList />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dimensionupdate/:id"
        element={
          <ProtectedRoute allowedRoles={["Dimension", "Admin"]}>
            <DimensionUpdatePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/adminViewDetail/:id"
        element={
          <ProtectedRoute allowedRoles={["Admin"]}>
            <OrderViewDetail />
          </ProtectedRoute>
        }
      />
      <Route
        path="/adminOrders"
        element={
          <ProtectedRoute allowedRoles={["Admin"]}>
            <ProductList />
          </ProtectedRoute>
        }
      />
      <Route
        path="/labelOrders"
        element={
          <ProtectedRoute allowedRoles={["Label", "Admin"]}>
            <LabelOrders />
          </ProtectedRoute>
        }
      />
      <Route
        path="/commonNavbar"
        element={
          <ProtectedRoute allowedRoles={["Label", "Accountant", "Dimension"]}>
            <CommonNavbar />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRoles={["Admin"]}>
            <Navbar />
          </ProtectedRoute>
        }
      />
      <Route
        path="/adminhomepage"
        element={
          <ProtectedRoute allowedRoles={["Admin"]}>
            <AdminHomePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/customerhomepage"
        element={
          <ProtectedRoute allowedRoles={["Customer"]}>
            <CustomerHomePage />
          </ProtectedRoute>
        }
      />
      <Route path="/viewDetailedorder/:id" element={<ViewDetailedOrder />} />
      <Route
        path="/customernavbar"
        element={
          <ProtectedRoute allowedRoles={["Customer"]}>
            <CustomerNavbar
              totalAmount={totalAmount}
              fetchTotalAmount={fetchTotalAmount}
            />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
