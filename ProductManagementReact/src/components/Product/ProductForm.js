import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as productApi from '../../api/productApi';
import '../../App.css';

const ProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
  });
  const [error, setError] = useState(null);

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
      navigate('/products');
    } catch (err) {
      setError(`Failed to ${id ? 'update' : 'create'} product`);
    }
  };

  return (
    <div className="container">
      <header className="navbar">
        <h1>{id ? 'Edit Product' : 'Create Product'}</h1>
        <nav>
          <button className="nav-button" onClick={() => navigate('/products')}>
            Back to List
          </button>
        </nav>
      </header>
      <main>
        {error && <div className="error">{error}</div>}
        <form className="product-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="productName">Product Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={product.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={product.description}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="price">Price</label>
            <input
              type="number"
              id="price"
              name="price"
              value={product.price}
              onChange={handleChange}
              required
              min="0"
              step="0.01"
            />
          </div>
          <div className="form-group">
            <label htmlFor="price">Stock</label>
            <input
              type="number"
              id="stock"
              name="stock"
              value={product.stock}
              onChange={handleChange}
              required
              min="0"
              step="0.01"
            />
          </div>
          <div className="form-actions">
            <button type="submit" className="submit-button">
              {id ? 'Update' : 'Create'} Product
            </button>
            <button
              type="button"
              className="cancel-button"
              onClick={() => navigate('/products')}
            >
              Cancel
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default ProductForm;