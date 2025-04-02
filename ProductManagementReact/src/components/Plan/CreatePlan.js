import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import "../../App.css";

const PlanManager = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);

  const navigate = useNavigate();

  useEffect(() => {}, []);

  return (
    <div className="container">
      <header className="navbar">
        <h1>
          <span
            style={{ color: "blue", cursor: "default" }}
            onClick={() => navigate("/plan-management")}
          >
            Plan Management
          </span>{" "}
          / Create Plan
        </h1>
      </header>
      <main>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row g-3 align-items-end">
            <div className="col-md-2">
              <label className="mb-1">Year</label>
            </div>
            <div className="col-md-4">
              <input
                {...register("year")}
                type="text"
                className="form-control"
              />
            </div>
            <div className="col-md-2">
              <label className="mb-1">Month</label>
            </div>
            <div className="col-md-4">
              <input
                {...register("month")}
                type="text"
                className="form-control"
              />
            </div>
            <div className="col-md-2">
              <label className="mb-1">Plan Number</label>
            </div>
            <div className="col-md-4">
              <input
                type="text"
                {...register("planNumber")}
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
                <option value="">-- Select Status --</option>
                <option value="Execution">Execution</option>
                <option value="Initiation">Initiation</option>
                <option value="Planning">Planning</option>
              </select>
            </div>
            <div className="col-md-2">
              <label className="mb-1">Property</label>
            </div>
            <div className="col-md-4">
              <select {...register("property")} className="form-control">
                <option value="">Select Property</option>
                <option value="HRCIN">HRCIN</option>
              </select>
            </div>
            <div className="col-md-2">
              <label className="mb-1">Criteria</label>
            </div>
            <div className="col-md-10">
              <input
                {...register("criteria")}
                type="text"
                className="form-control"
              />
            </div>
            <div className="col-md-2">
              <label className="mb-1">Vendors</label>
            </div>
            <div className="col-md-10">
              <input
                {...register("vendor")}
                type="text"
                className="form-control"
              />
            </div>
            <div className="col-md-2">
              <label className="mb-1">Notes</label>
            </div>
            <div className="col-md-10">
              <textarea
                {...register("description")}
                className="form-control"
                id="description"
                name="description"
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
              onClick={() => navigate("/plan-management")}
            >
              Cancel
            </button>
            <button type="submit" className="submit-button">
              Save
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default PlanManager;
