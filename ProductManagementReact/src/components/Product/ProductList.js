import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as productApi from '../../api/productApi';
import '../../App.css';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(null);
  const [keyword, setKeyword] = useState(null);
  const [pageNumber, setPageNumber] = useState();
  const [pageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, [keyword, pageNumber]);

  const fetchProducts = async () => {
    try {
        debugger
      setLoading(true);
      const response = await productApi.getProducts();
      debugger
      // Ensure response.data is always an array
      if (response.data && Array.isArray(response.data)) {
        setProducts(response.data|| []);
      } else {
        setProducts([]); // Set an empty array if response.data is not iterable
      }
  
      setLoading(false);
    } catch (err) {
      setProducts([]); // Ensure the products state is always an array
      setError('Failed to fetch products. Please ensure the API is running.');
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
    setPageNumber(1);
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
            <table className="table text-center">
              <thead className="text-white bg-color-header">
                <tr>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.length === 0 ? (
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
