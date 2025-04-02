import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import PlanList from "./components/Plan/PlanSearch";
import PlanOffers from "./components/Plan/CreatePlan";
import PlanManager from "./components/Plan/CreatePlan";
import CustomerList from "./components/Customer/CustomerList";
import CustomerForm from "./components/Customer/CustomerForm";

const AppRoutes = ({ 
  
  isAuthenticated }) => (
  <Routes>
    {isAuthenticated ? (
      <>
        <Route path="/plan-management" element={<PlanList />} />
        <Route path="/plan-offers" element={<PlanOffers />} />
        <Route path="/plan-management/create" element={<PlanManager />} />
        <Route path="/plan-management/edit/:id" element={<PlanManager />} />
        <Route path="/customers" element={<CustomerList />} />
        <Route path="/customers/create" element={<CustomerForm />} />
        <Route path="/customers/edit/:id" element={<CustomerForm />} />
        <Route path="/" element={<PlanList />} />
      </>
    ) : (
      <Route path="*" element={<Navigate to="/login" />} />
    )}
  </Routes>
);

export default AppRoutes;