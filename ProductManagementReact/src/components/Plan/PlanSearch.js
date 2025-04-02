import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as productApi from "../../api/productApi";
import "../../App.css";
import { useForm } from "react-hook-form";
import data from "../../data/searchdata.json";
import tabledata from "../../data/plandata.json";

const PlanSearch = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [keyword, setKeyword] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(data.search);
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
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row g-3 align-items-end">
            <div className="col-md-2">
              <label className="mb-1">Year</label>
            </div>
            <div className="col-md-4">
              <select {...register("year")} className="form-control">
                {data.search.years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-2">
              <label className="mb-1">Month</label>
            </div>
            <div className="col-md-4">
              <select {...register("month")} className="form-control">
                {data.search.months.map((month) => (
                  <option key={month} value={month}>
                    {month}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-2">
              <label className="mb-1">Plan Number</label>
            </div>
            <div className="col-md-4">
              <input
                {...register("planNumber")}
                type="text"
                className="form-control"
              />
            </div>
            <div className="col-md-2">
              <label className="mb-1">Plan Name</label>
            </div>
            <div className="col-md-4">
              <input
                {...register("planName")}
                type="text"
                className="form-control"
              />
            </div>
            <div className="col-md-2">
              <label className="mb-1">Status</label>
            </div>
            <div className="col-md-4">
              <select {...register("status")} className="form-control">
                {data.search.status.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-2">
              <label className="mb-1">Property</label>
            </div>
            <div className="col-md-4">
              <select {...register("property")} className="form-control">
                {data.search.property.map((property) => (
                  <option key={property} value={property}>
                    {property}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="mt-3 d-flex justify-content-end">
            <button type="submit" className="btn btn-primary px-4">
              Search
            </button>
          </div>
        </form>

        <div className="mt-4" style={{ maxHeight: "300px", overflowY: "auto" ,borderRadius: "10px"}}>
          <table className="table text-center">
            <thead className="text-white bg-color-header">
              <tr>
                <th>Plan Number</th>
                <th>Plan Name</th>
                <th>Property</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tabledata.plans.map((plan, index) => (
                <tr key={index} className={index % 2 === 0 ? "bg-light" : ""}>
                  <td>{plan.plan_number}</td>
                  <td>{plan.plan_name}</td>
                  <td>{plan.property}</td>
                  <td>{plan.status}</td>
                  <td>
                    <button
                      className="btn btn-sm me-1"
                      onClick={() => navigate(`/plan-offers`)}
                    >
                      ✏️
                    </button>
                    <button className="btn btn-sm me-1">🗑️</button>
                    <button className="btn btn-sm">📅</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default PlanSearch;
