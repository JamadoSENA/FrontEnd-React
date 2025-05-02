import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import DashboardProducts from './Dashboards/DashboardProducts.js';
import ProductForm from './Create/CreateProduct.js';
import EditFormProduct from './Edit/EditProduct.js';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<DashboardProducts />} />
          <Route path="/products/edit/:id" element={<EditFormProduct />} />
          <Route path="/products/create" element={<ProductForm />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

