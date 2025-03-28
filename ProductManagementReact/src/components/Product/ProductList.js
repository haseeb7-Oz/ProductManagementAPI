import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as productApi from "../../api/productApi";
import "../../App.css";

const ProductList = () => {
  const [year, setYear] = useState("2024");
  const [month, setMonth] = useState("");
  const [planNumber, setPlanNumber] = useState("");
  const [planName, setPlanName] = useState("");
  const [status, setStatus] = useState("");
  const [property, setProperty] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [keyword, setKeyword] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  const handleSearch = () => {
    console.log({ year, month, planNumber, planName, status, property });
  };
  useEffect(() => {
    fetchProducts();
  }, [keyword, pageNumber]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await productApi.getProducts(
        keyword,
        pageNumber,
        pageSize
      );
      debugger;
      if (response.data && Array.isArray(response.data)) {
        setProducts(response.data);
      } else {
        setProducts([]); // Ensure products is an array
      }

      setTotalPages(response.data?.totalPages || 1);
    } catch (err) {
      setProducts([]); // Prevent undefined issues
      setError("Failed to fetch products. Please ensure the API is running.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await productApi.deleteProduct(id);
        setProducts(products.filter((product) => product.id !== id));
      } catch (err) {
        setError("Failed to delete product");
      }
    }
  };

  const handleEdit = (id) => {
    navigate(`/plan-management/edit/${id}`);
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
        <h1>Plan Management</h1>
        <nav>
          <button
            className="nav-button"
            onClick={() => navigate("/plan-management/create")}
          >
            Create a Plan +
          </button>
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
        </div>
        <div className="mt-3 d-flex justify-content-end">
          <button className="btn btn-primary px-4" onClick={handleSearch}>
            Search
          </button>
        </div>

        <div className="mt-4" style={{ maxHeight: "400px", overflowY: "auto" }}>
          <table className="table  text-center">
            <thead className="text-white bg-color-header" >
              <tr>
                <th>Plan Number</th>
                <th>Plan Name</th>
                <th>Property</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {[...Array(6)].map((_, index) => (
                <tr key={index} className={index % 2 === 0 ? "bg-light" : ""}>
                  <td>HRCIN-202410-001</td>
                  <td>HRCIN October 2024 Core</td>
                  <td>HRCIN</td>
                  <td>
                    {index % 3 === 0
                      ? "Execution"
                      : index % 3 === 1
                      ? "Initiation"
                      : "Planning"}
                  </td>
                  <td>
                    <button className="btn btn-sm me-1">✏️</button>
                    <button className="btn btn-sm  me-1">🗑️</button>
                    <button className="btn btn-sm ">📅</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      <main>
        {/* Search Input */}
        {/* <input
          type="text"
          placeholder="Search products..."
          value={keyword}
          onChange={handleSearchChange}
          className="search-input"
        /> */}

        {/* {loading && <div className="loading">Loading...</div>}
        {error && <div className="error">{error}</div>} */}

        {!loading && !error && (
          <>
            {/* <table className="dt-table">
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
                {!products && products.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="no-data">
                      No products found
                    </td>
                  </tr>
                ) : (
                  products.map((product) => (
                    <tr key={product.id}>
                      <td>{product.name}</td>
                      <td>{product.description}</td>
                      <td>${product.price}</td>
                      <td>{product.stock}</td>
                      <td>
                        <button
                          className="action-button edit"
                          onClick={() => handleEdit(product.id)}
                        >
                          Edit
                        </button>
                        <button
                          className="action-button delete"
                          onClick={() => handleDelete(product.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table> */}

            {/* Pagination Controls */}
            {/* <div className="pagination">
              <button
                onClick={() => handlePageChange(pageNumber - 1)}
                disabled={pageNumber === 1}
              >
                Prev
              </button>
              <span>
                Page {pageNumber} of {totalPages}
              </span>
              <button
                onClick={() => handlePageChange(pageNumber + 1)}
                disabled={pageNumber === totalPages}
              >
                Next
              </button>
            </div> */}
          </>
        )}
      </main>
    </div>
  );
};

export default ProductList;
