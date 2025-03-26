import React from "react";
import { Routes, Route } from "react-router-dom";
import ProductList from "./components/Product/ProductList";
import ProductForm from "./components/Product/ProductForm";
import CustomerList from "./components/Customer/CustomerList";
import CustomerForm from "./components/Customer/CustomerForm";
import Login from "./components/Auth/LoginForm"; 

const AppRoutes = () => (
  <Routes>
    {/* Login Route */}
    <Route path="/login" element={<Login />} />

    {/* Product Routes */}
    <Route path="/products" element={<ProductList />} />
    <Route path="/products/create" element={<ProductForm />} />
    <Route path="/products/edit/:id" element={<ProductForm />} />

    {/* Customer Routes */}
    <Route path="/customers" element={<CustomerList />} />
    <Route path="/customers/create" element={<CustomerForm />} />
    <Route path="/customers/edit/:id" element={<CustomerForm />} />

    {/* Default Route */}
    <Route path="/" element={<ProductList />} />
  </Routes>
);

export default AppRoutes;
