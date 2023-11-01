import React from "react";
import { Routes, Route } from "react-router-dom";
import ProductList from "./Compoents/adminOrders";
import LabelOrders from "./Compoents/labelOrders";
import BodyComponent from "./Compoents/HomePage/BodyComponent";
import HeaderComponent from "./Compoents/HomePage/HeaderComponent";
import CustomerOrder from "./Compoents/customerOrder";
import OrderViewDetail from "./Compoents/AdminDetailPage";
import DimensionsUpdate from "./Compoents/DimensionsUpdate";
import DimensionOrderList from "./Compoents/DimensionOrders";
import AdminHomePage from "./Compoents/AdminHomePage";
function App() {
  return (
    <Routes>
      <Route path="dimensionorderlist" element={<DimensionOrderList />} />
      <Route path="/dimensionupdate/:id" element={<DimensionsUpdate />} />
      <Route path="/upload" element={<CustomerOrder />} />
      <Route path="/adminViewDetail/:id" element={<OrderViewDetail />} />
      <Route path="/" element={<HeaderComponent />} />
      <Route path="/adminOrders" element={<ProductList />} />
      <Route path="/labelOrders" element={<LabelOrders />} />
      <Route path="/adminhomepage" element={<AdminHomePage />} />
    </Routes>
  );
}

export default App;
