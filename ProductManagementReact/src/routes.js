import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ProductList from "./components/Product/ProductList";
import ProductForm from "./components/Product/ProductForm";
import CustomerList from "./components/Customer/CustomerList";
import CustomerForm from "./components/Customer/CustomerForm";

const AppRoutes = ({ 
  
  isAuthenticated }) => (
  <Routes>
    {isAuthenticated ? (
      <>
        <Route path="/plan-management" element={<ProductList />} />
        <Route path="/plan-management/create" element={<ProductForm />} />
        <Route path="/plan-management/edit/:id" element={<ProductForm />} />
        <Route path="/customers" element={<CustomerList />} />
        <Route path="/customers/create" element={<CustomerForm />} />
        <Route path="/customers/edit/:id" element={<CustomerForm />} />
        <Route path="/" element={<ProductList />} />
      </>
    ) : (
      <Route path="*" element={<Navigate to="/login" />} />
    )}
  </Routes>
);

export default AppRoutes;
