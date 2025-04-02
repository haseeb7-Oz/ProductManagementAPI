import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as productApi from '../../api/productApi';
import '../../App.css';

const PlanManager = () => {
   const [year, setYear] = useState("2024");
    const [month, setMonth] = useState("");
    const [planNumber, setPlanNumber] = useState("");
    const [planName, setPlanName] = useState("");
    const [status, setStatus] = useState("");
    const [property, setProperty] = useState("");

  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
  });
  const [error, setError] = useState(null);
  const handleSearch = () => {
    console.log({ year, month, planNumber, planName, status, property });
  }; 

  const fetchProduct = useCallback(async () => {
    try {
      const response = await productApi.getProductById(id);
      setProduct({
        id: response.data.id,
        name: response.data.name,
        description: response.data.description || '',
        price: response.data.price.toString(),
        stock: response.data.stock,
      });
    } catch (err) {
      setError('Failed to fetch product');
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      fetchProduct();
    }
  }, [id, fetchProduct]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const productData = {
      ...product,
      price: parseFloat(product.price),
    };

    try {
      if (id) {
        await productApi.updateProduct(id, productData);
      } else {
        await productApi.createProduct(productData);
      }
      navigate('/plan-management');
    } catch (err) {
      setError(`Failed to ${id ? 'update' : 'create'} product`);
    }
  };

  return (
    <div className="container">
      <header className="navbar">
        <h1><span style={{color:'blue', cursor:'default'}}  onClick={()=>navigate('/plan-management')} >Plan Management</span> / Create Plan</h1>
        <nav>
          {/* <button className="nav-button" onClick={() => navigate('/plan-management')}>
            Back to List
          </button> */}
        </nav>
      </header>
      <main>
        <div className="row g-3 align-items-end">
          <div className="col-md-2">
            <label className="mb-1">Year</label>
          </div>
          <div className="col-md-4">
            <select
              className="form-control"
              value={year}
              onChange={(e) => setYear(e.target.value)}
            >
              <option>2024</option>
            </select>
          </div>
          <div className="col-md-2">
            <label className="mb-1">Month</label>
          </div>
          <div className="col-md-4">
            <select
              className="form-control"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
            >
              <option value="">Select Month</option>
              <option>October</option>
              <option>Novemvber</option>
              <option>December</option>
            </select>
          </div>
          <div className="col-md-2">
            <label className="mb-1">Plan Number</label>
          </div>
          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              value={planNumber}
              onChange={(e) => setPlanNumber(e.target.value)}
            />
          </div>
          <div className="col-md-2">
            <label className="mb-1">Plan Name</label>
          </div>
          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              value={planName}
              onChange={(e) => setPlanName(e.target.value)}
            />
          </div>
          <div className="col-md-2">
            <label className="mb-1">Status</label>
          </div>
          <div className="col-md-4">
            <select
              className="form-control"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="">-- Select Status --</option>
              <option value="">Execution</option>
              <option value="">Initiation</option>
              <option value="">Planning</option>
            </select>
          </div>
          <div className="col-md-2">
            <label className="mb-1">Property</label>
          </div>
          <div className="col-md-4">
            <select
              className="form-control"
              value={property}
              onChange={(e) => setProperty(e.target.value)}
            >
              <option value="">Select Property</option>
              <option value="">HRCIN</option>
            </select>
          </div>
          <div className="col-md-2">
          <label className="mb-1">Criteria</label>
          </div>
          <div className="col-md-10">
          <input
            type="text"
              className="form-control"
              value={product.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-2">
          <label className="mb-1">Vendors</label>
          </div>
          <div className="col-md-10">
          <input
            type="text"
              className="form-control"
              value={product.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-2">
          <label className="mb-1">Notes</label>
          </div>
          <div className="col-md-10">
          <textarea
          className="form-control"
              id="description"
              name="description"
              value={product.description}
              onChange={handleChange}
            />
          </div>
        </div>
          <div className="button-container justify-content-end d-flex">
            <button type="submit" className="submit-button">
               Offers
            </button>
            <button
              type="button"
              className="cancel-button"
              onClick={() => navigate('/plan-management')}
            >
              Cancel
            </button>
            <button type="submit" className="submit-button">
             Save
            </button>
          </div>
      
      </main>
    </div>
  );
};

export default PlanManager;