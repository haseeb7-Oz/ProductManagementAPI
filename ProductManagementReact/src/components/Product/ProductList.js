import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as productApi from '../../api/productApi';
import '../../App.css';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [keyword, setKeyword] = useState('');
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, [keyword, pageNumber]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await productApi.getProducts(keyword, pageNumber, pageSize);
      debugger
      if (response.data && Array.isArray(response.data)) {
        setProducts(response.data);
      } else {
        setProducts([]); // Ensure products is an array
      }
  
      setTotalPages(response.data?.totalPages || 1);
    } catch (err) {
      setProducts([]); // Prevent undefined issues
      setError('Failed to fetch products. Please ensure the API is running.');
    } finally {
      setLoading(false);
    }
  };
  

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await productApi.deleteProduct(id);
        setProducts(products.filter((product) => product.id !== id));
      } catch (err) {
        setError('Failed to delete product');
      }
    }
  };

  const handleEdit = (id) => {
    navigate(`/products/edit/${id}`);
  };

  const handleSearchChange = (e) => {
    setKeyword(e.target.value);
    setPageNumber(1); // Reset to first page on search
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPageNumber(newPage);
    }
  };

  return (
    <div className="container">
      <header className="navbar">
        <h1>Product Management</h1>
        <nav>
          <button className="nav-button" onClick={() => navigate('/products/create')}>
            Add Product
          </button>
        </nav>
      </header>
      <main>
        {/* Search Input */}
        <input
          type="text"
          placeholder="Search products..."
          value={keyword}
          onChange={handleSearchChange}
          className="search-input"
        />

        {loading && <div className="loading">Loading...</div>}
        {error && <div className="error">{error}</div>}

        {!loading && !error && (
          <>
            <table className="dt-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {(!products && products.length === 0)  ? (
                  <tr>
                    <td colSpan="5" className="no-data">No products found</td>
                  </tr>
                ) : (
                  products.map((product) => (
                    <tr key={product.id}>
                      <td>{product.name}</td>
                      <td>{product.description}</td>
                      <td>${product.price}</td>
                      <td>{product.stock}</td>
                      <td>
                        <button className="action-button edit" onClick={() => handleEdit(product.id)}>
                          Edit
                        </button>
                        <button className="action-button delete" onClick={() => handleDelete(product.id)}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>

            {/* Pagination Controls */}
            <div className="pagination">
              <button onClick={() => handlePageChange(pageNumber - 1)} disabled={pageNumber === 1}>
                Prev
              </button>
              <span>
                Page {pageNumber} of {totalPages}
              </span>
              <button onClick={() => handlePageChange(pageNumber + 1)} disabled={pageNumber === totalPages}>
                Next
              </button>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default ProductList;
