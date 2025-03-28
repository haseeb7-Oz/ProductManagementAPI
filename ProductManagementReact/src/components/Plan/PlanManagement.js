import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as planApi from "../../api/planApi";
import "../../App.css";
import { PropertyArray,StatusArray ,MonthsArray,YearsArray   } from "../../constant";
const PlanList = () => {
  const [year, setYear] = useState("2024");
  const [month, setMonth] = useState("");
  const [planNumber, setPlanNumber] = useState("");
  const [planName, setPlanName] = useState("");
  const [status, setStatus] = useState("");
  const [property, setProperty] = useState("");
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();
 
  const handleSearch = async () => {
  
 

    const searchParams = {
      year,
      month,
      planNumber,
      planName,
      status,
      property,
    };

    try {
      setLoading(true);
      const response = await planApi.getPlans(searchParams, pageNumber, pageSize);
      debugger
      setPlans(response.data || []);
      setTotalPages(response.data?.totalPages || 1);
    } catch (err) {
      setPlans([]);
      setError("Failed to fetch plans. Please ensure the API is running.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleSearch();
  }, [pageNumber]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this plan?")) {
      try {
        await planApi.deletePlan(id);
        setPlans(plans.filter((plan) => plan.id !== id));
      } catch (err) {
        setError("Failed to delete plan");
      }
    }
  };

  const handleEdit = (id) => {
    navigate(`/plan-management/edit/${id}`);
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
          <button className="nav-button" onClick={() => navigate("/plan-management/create")}>
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
          <select className="form-control" value={year} onChange={(e) => setYear(Number(e.target.value))}>
  <option value="">Select Year</option>
  {YearsArray.map((y) => (
    <option key={y.value} value={y.value}>
      {y.label}
    </option>
  ))}
</select>
          </div>
          <div className="col-md-2">
            <label className="mb-1">Month</label>
          </div>
          <div className="col-md-4">
          <select className="form-control" value={month} onChange={(e) => setMonth(Number(e.target.value))}>
  <option value="">Select Month</option>
  {MonthsArray.map((m) => (
    <option key={m.value} value={m.value}>
      {m.label}
    </option>
  ))}
</select>
          </div>
          <div className="col-md-2">
            <label className="mb-1">Plan Number</label>
          </div>
          <div className="col-md-4">
            <input type="text" className="form-control" value={planNumber} onChange={(e) => setPlanNumber(e.target.value)} />
          </div>
          <div className="col-md-2">
            <label className="mb-1">Plan Name</label>
          </div>
          <div className="col-md-4">
            <input type="text" className="form-control" value={planName} onChange={(e) => setPlanName(e.target.value)} />
          </div>
          <div className="col-md-2">
            <label className="mb-1">Status</label>
          </div>
          <div className="col-md-4">
          <select className="form-control" value={status} onChange={(e) => setStatus(Number(e.target.value))}>
  <option value="">Select Status</option>
  {StatusArray.map((s) => (
    <option key={s.value} value={s.value}>
      {s.label}
    </option>
  ))}
</select>
          </div>
          <div className="col-md-2">
            <label className="mb-1">Property</label>
          </div>
          <div className="col-md-4">
          <select className="form-control" value={property} onChange={(e) => setProperty(Number(e.target.value))}>
  <option value="">Select Property</option>
  {PropertyArray.map((p) => (
    <option key={p.value} value={p.value}>
      {p.label}
    </option>
  ))}
</select>
          </div>
        </div>
        <div className="mt-3 d-flex justify-content-end">
          <button className="btn btn-primary px-4" onClick={handleSearch}>Search</button>
        </div>
        <div className="mt-4" style={{ maxHeight: "400px", overflowY: "auto" }}>
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
              {plans.map((plan, index) => (
                <tr key={plan.id} className={index % 2 === 0 ? "bg-light" : ""}>
                  <td>{plan.planNumber}</td>
                  <td>{plan.planName}</td>
                  <td>{plan.property}</td>
                  <td>{plan.status}</td>
                  <td>
                    <button className="btn btn-sm me-1" onClick={() => handleEdit(plan.id)}>✏️</button>
                    <button className="btn btn-sm me-1" onClick={() => handleDelete(plan.id)}>🗑️</button>
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

export default PlanList;
