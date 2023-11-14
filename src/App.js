import React, { useState, useEffect } from "react";
import "./App.css";
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
import ProtectedRoute from "./Compoents/ProtectedRoute";
import CustomerNavbar from "./Compoents/CustomerNavbar";
import CustomerOrderViewDetail from "./Compoents/CustomerDetailP";
import CommonNavbar from "./Compoents/CommonNavbar";

function App() {
  const role = localStorage.getItem("role");
  const [totalAmount, setTotalAmount] = useState(null);

  const fetchTotalAmount = () => {
    const token = sessionStorage.getItem("token");
    console.log("called total amount");
    if (!token) {
      return;
    }
    fetch(`http://localhost:3009/api/v1/getAmount`, {
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
        console.error("Error fetching data:", error);
        setTotalAmount(null);
      });
  };

  useEffect(() => {
    if (role === "Customer") {
      fetchTotalAmount();
    }
  }, [role]);

  return (
    <Routes>
      <Route path="/CustomerLogin" element={<CustomerLogin />} />
      <Route path="/" element={<StaffSigninPage />} />
      {/* <Route
        path="/Customersignup"
        element={
          <ProtectedRoute allowedRoles={["Admin"]}>
            <Customersignup />
          </ProtectedRoute>
        }
      /> */}
      <Route
        path="/CustomerOrderViewDetail/:id"
        element={
          <ProtectedRoute allowedRoles={["Customer"]}>
            <CustomerOrderViewDetail />
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
            <DimensionsUpdate />
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
        path="/navbar"
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
