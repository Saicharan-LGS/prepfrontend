import React from "react";
import { Routes, Route } from "react-router-dom";
import ProductList from "./Compoents/adminOrders";
import LabelOrders from "./Compoents/labelOrders";
import BodyComponent from "./Compoents/HomePage/BodyComponent";
import HeaderComponent from "./Compoents/HomePage/HeaderComponent";
import CustomerOrder from "./Compoents/customerOrder";
import OrderViewDetail from "./Compoents/AdminDetailPage";
function App() {
  return (
    <Routes>
      <Route path="/upload" element={<CustomerOrder />} />
      <Route path="/adminViewDetail/:id" element={<OrderViewDetail />} />
      <Route path="/" element={<HeaderComponent />} />
      <Route path="/adminOrders" element={<ProductList />} />
      <Route path="/labelOrders" element={<LabelOrders />} />
    </Routes>
  );
}

export default App;
