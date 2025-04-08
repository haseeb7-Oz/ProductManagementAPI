import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import PlanManagement from "./components/Plan/PlanManagement";
import PlanForm from "./components/Plan/PlanForm";
import PlanOffers from "./components/Plan/PlanOffers";
import CustomerList from "./components/Customer/CustomerList";
import CustomerForm from "./components/Customer/CustomerForm";
import ProductList from './components/Product/ProductList';
import ProductForm from './components/Product/ProductForm';
const AppRoutes = ({ 
  
  isAuthenticated }) => (
  <Routes>
    {isAuthenticated ? (
      <>
        <Route path="/plan-management" element={<PlanManagement />} />
        <Route path="/plan-management/create" element={<PlanForm />} />
        <Route path="/plan-offers" element={<PlanOffers />} /> 
        <Route path="/plan-management/edit/:id" element={<PlanForm />} />
        <Route path="/customers" element={<CustomerList />} />
        <Route path="/customers/create" element={<CustomerForm />} />
        <Route path="/customers/edit/:id" element={<CustomerForm />} />
        <Route path="/" element={<PlanManagement />} />

        <Route path="/products" element={<ProductList />} />
    <Route path="/products/create" element={<ProductForm />} />
    <Route path="/products/edit/:id" element={<ProductForm />} />
   
      </>
    ) : (
      <Route path="*" element={<Navigate to="/login" />} />
    )}
  </Routes>
);

export default AppRoutes;
