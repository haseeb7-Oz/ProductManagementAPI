import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProductList from './components/Product/ProductList';
import ProductForm from './components/Product/ProductForm';

const AppRoutes = () => (
  <Routes>
    <Route path="/products" element={<ProductList />} />
    <Route path="/products/create" element={<ProductForm />} />
    <Route path="/products/edit/:id" element={<ProductForm />} />
    <Route path="/" element={<ProductList />} />
  </Routes>
);

export default AppRoutes;