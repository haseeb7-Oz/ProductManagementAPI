import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import PlanSearch from "./components/Plan/PlanSearch";
import PlanOffers from "./components/Plan/PlanOffers";
import CreatePlan from "./components/Plan/CreatePlan";
import CustomerList from "./components/Customer/CustomerList";
import CustomerForm from "./components/Customer/CustomerForm";

const AppRoutes = ({ 
  
  isAuthenticated }) => (
  <Routes>
    {isAuthenticated ? (
      <>
        <Route path="/plan-management" element={<PlanSearch />} />
        <Route path="/plan-offers" element={<PlanOffers />} />
        <Route path="/plan-management/create" element={<CreatePlan />} />
        {/* <Route path="/plan-management/edit/:id" element={<PlanManager />} /> */}
        <Route path="/customers" element={<CustomerList />} />
        <Route path="/customers/create" element={<CustomerForm />} />
        <Route path="/customers/edit/:id" element={<CustomerForm />} />
        <Route path="/" element={<PlanSearch />} />
      </>
    ) : (
      <Route path="*" element={<Navigate to="/login" />} />
    )}
  </Routes>
);

export default AppRoutes;