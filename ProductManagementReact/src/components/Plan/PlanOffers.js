import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as planOfferApi from "../../api/planOfferApi";
import "../../App.css";
import { useForm } from "react-hook-form";
import data from "../../data/searchdata.json";
import up from "../../assets/icon/up.svg";
import down from "../../assets/icon/down.svg";

const PlanOffers = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);
  const [isExpand, setExpand] = useState(true);
  const [tIndex, setIndex] = useState(0);
  const [tiers, setTiers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPlanOffers();
  }, []);

  const fetchPlanOffers = async () => {
    try {
      setLoading(true);
      const response = await planOfferApi.getPlanOffers();
      if (response.data && Array.isArray(response.data)) {
        setTiers(response.data);
      } else {
        setTiers([]);
      }
    } catch (err) {
      setTiers([]);
      setError("Failed to fetch plan offers. Please ensure the API is running.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const tableToggle = (value) => {
    setExpand(!isExpand);
    setIndex(value);
  };

  return (
    <div className="container">
      <header className="navbar">
        <h1>Plan Offers</h1>
        <nav>
          <button className="nav-button">Add Tier/Offers +</button>
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
              <label className="mb-1">Data Source</label>
            </div>
            <div className="col-md-4">
              <input
                {...register("dataSource")}
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
              <label className="mb-1">Criteria</label>
            </div>
            <div className="col-md-4">
              <input
                {...register("criteria")}
                type="text"
                className="form-control"
              />
            </div>
            <div className="col-md-2">
              <label className="mb-1">Vendors</label>
            </div>
            <div className="col-md-4">
              <input
                {...register("vendor")}
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
          </div>
          <div className="mt-5">
            <div className="d-flex align-items-center gap-2">
              <label className="mb-0">Copy From</label>
              <input
                {...register("copyFrom1")}
                type="text"
                className="form-control w-10"
              />
              <input
                {...register("copyFrom2")}
                type="text"
                className="form-control w-10"
              />
              <button type="submit" className="btn btn-primary px-4">
                Copy
              </button>
            </div>
          </div>
        </form>

        {loading && <div>Loading...</div>}
        {error && <div className="text-danger">{error}</div>}

        <div
          className="mt-4"
          style={{
            maxHeight: "300px",
            overflowY: "auto",
            borderRadius: "10px",
          }}
        >
          <table className="table">
            <thead className="text-white bg-color-header">
              <tr>
                <th style={{ marginLeft: "3vw" }} className="d-flex">
                  Tier ID
                </th>
                <th>Tier Name</th>
                <th
                  style={{ marginRight: "3vw" }}
                  className="d-flex justify-content-end"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {tiers.map((tier, index) => (
                <React.Fragment key={tier.id}>
                  <tr className={index % 2 === 0 ? "bg-light" : ""}>
                    <td style={{ marginLeft: "2vw" }} className="d-flex">
                      <img
                        src={isExpand && tIndex === index ? down : up}
                        alt="toggle"
                        className="img-fluid"
                        style={{
                          maxWidth: "20px",
                          marginRight: "10px",
                          marginTop: "4px",
                          cursor: "pointer",
                        }}
                        onClick={() => tableToggle(index)}
                      />
                      {tier.id}
                    </td>
                    <td>{tier.name}</td>
                    <td className="d-flex justify-content-end">
                      <button
                        className="btn btn-sm me-1"
                        onClick={() => navigate(`/plan-offers/${tier.id}`)}
                      >
                        ✏️
                      </button>
                      <button className="btn btn-sm me-1">🗑️</button>
                      <button className="btn btn-sm">📅</button>
                    </td>
                  </tr>
                  {isExpand && tIndex === index && (
                    <tr>
                      <td colSpan="3">
                        <table className="table text-center text-size">
                          <thead className="text-black bg-color-header-sm">
                            <tr>
                              <th>Offer Name</th>
                              <th>Date Range</th>
                              <th>Sundays</th>
                              <th>Mondays</th>
                              <th>Tuesdays</th> {/* Added missing day */}
                              <th>Wednesdays</th>
                              <th>Thursdays</th>
                              <th>Fridays</th>
                              <th>Saturdays</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {tier.offers.map((offer) => (
                              <tr key={offer.id}>
                                <td>{offer.offerName}</td>
                                <td>{offer.dateRange}</td>
                                <td>{offer.sundays}</td>
                                <td>{offer.mondays}</td>
                                <td>{offer.tuesdays}</td> {/* Added missing day */}
                                <td>{offer.wednesdays}</td>
                                <td>{offer.thursdays}</td>
                                <td>{offer.fridays}</td>
                                <td>{offer.saturdays}</td>
                                <td>
                                  <button className="btn btn-sm me-1">🗑️</button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default PlanOffers;