import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import * as planApi from "../../api/planApi";
import { MonthsArray, YearsArray, StatusArray, PropertyArray } from "../../constant";
import "../../App.css";

const PlanForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [plan, setPlan] = useState({
    name: "",
    plannumber: "",
    monthid: 0,
    yearid: 0,
    statusid: 0,
    propertyid: 0,
  });

  const [error, setError] = useState(null);

  const fetchPlan = useCallback(async () => {
    try {
      const response = await planApi.getPlanById(id);
      setPlan({
        id: response.data.id,
        name: response.data.name,
        plannumber: response.data.plannumber || "",
        monthid: response.data.monthid,
        yearid: response.data.yearid,
        statusid: response.data.statusid,
        propertyid: response.data.propertyid,
      });
    } catch (err) {
      setError("Failed to fetch plan");
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      fetchPlan();
    }
  }, [id, fetchPlan]);

  const handleChange = (e) => {
    debugger
    const { name, value } = e.target;
    setPlan((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await planApi.updatePlan(id, plan);
      } else {
        await planApi.createPlan(plan);
      }
      navigate("/plan-management");
    } catch (err) {
      setError(`Failed to ${id ? "update" : "create"} plan`);
    }
  };

  return (
    <div className="container">
      <header className="navbar">
        <h1>{id ? "Edit Plan" : "Create Plan"}</h1>
        <nav>
          <button className="nav-button" onClick={() => navigate("/plan-management")}>
            Back to List
          </button>
        </nav>
      </header>
      <main>
        {error && <div className="error">{error}</div>}
        <form className="plan-form" onSubmit={handleSubmit}>
          <div className="row g-3 align-items-end">
            <div className="col-md-2">
              <label className="mb-1">Year</label>
            </div>
            <div className="col-md-4">
              <select className="form-control" name="yearid" value={plan.yearid} onChange={handleChange} required>
                <option value="">Select Year</option>
                {YearsArray.map((y) => (
                  <option key={y.value} value={y.value}>{y.label}</option>
                ))}
              </select>
            </div>
            <div className="col-md-2">
              <label className="mb-1">Month</label>
            </div>
            <div className="col-md-4">
              <select className="form-control" name="monthid" value={plan.monthid} onChange={handleChange} required>
                <option value="">Select Month</option>
                {MonthsArray.map((m) => (
                  <option key={m.value} value={m.value}>{m.label}</option>
                ))}
              </select>
            </div>
            <div className="col-md-2">
              <label className="mb-1">Plan Number</label>
            </div>
            <div className="col-md-4">
              <input type="text" className="form-control" name="plannumber" value={plan.plannumber} onChange={handleChange} />
            </div>
            <div className="col-md-2">
              <label className="mb-1">Plan Name</label>
            </div>
            <div className="col-md-4">
              <input type="text" className="form-control" name="name" value={plan.name} onChange={handleChange} required />
            </div>
            <div className="col-md-2">
              <label className="mb-1">Status</label>
            </div>
            <div className="col-md-4">
              <select className="form-control" name="statusid" value={plan.statusid} onChange={handleChange} required>
                <option value="">Select Status</option>
                {StatusArray.map((s) => (
                  <option key={s.value} value={s.value}>{s.label}</option>
                ))}
              </select>
            </div>
            <div className="col-md-2">
              <label className="mb-1">Property</label>
            </div>
            <div className="col-md-4">
              <select className="form-control" name="propertyid" value={plan.propertyid} onChange={handleChange} required>
                <option value="">Select Property</option>
                {PropertyArray.map((p) => (
                  <option key={p.value} value={p.value}>{p.label}</option>
                ))}
              </select>
            </div>
           
          </div>
          <br></br>
          <div className="col-md-12 text-end">
   
    <button type="button" className="btn btn-secondary me-2" onClick={() => navigate("/plan-management")}>
      Cancel
    </button>
    <button type="submit" className="btn btn-primary ">{id ? "Update" : "Save"}</button>
  </div>
        </form>
      </main>
    </div>
  );
};

export default PlanForm;