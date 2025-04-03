import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as productApi from "../../api/productApi";
import "../../App.css";
import { useForm } from "react-hook-form";
import data from "../../data/searchdata.json";
import Offersdata from "../../data/planOffers.json";
import up from "../../assets/icon/up.svg";
import down from "../../assets/icon/down.svg";

const PlanOffers = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);
  const [isExpand, setExpann] = useState(true);
  const [tIndex, setIndex] = useState(0);
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

  const tableToogle = (value) => {
    setExpann(!isExpand);
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
          <div className="mt-5 ">
            <div className="d-flex align-items-center gap-2">
              <label className="mb-0">Copy From</label>
              <input
                {...register("vendor")}
                type="text"
                className="form-control w-10"
              />
              <input
                {...register("vendor")}
                type="text"
                className="form-control w-10"
              />
              <button type="submit" className="btn btn-primary px-4">
                Copy
              </button>
            </div>
          </div>
        </form>

        <div
          className="mt-4"
          style={{
            maxHeight: "300px",
            overflowY: "auto",
            borderRadius: "10px",
          }}
        >
          <table className="table ">
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
              {Offersdata.map((Offer, index) => (
                <React.Fragment key={index}>
                  <tr className={index % 2 === 0 ? "bg-light" : ""}>
                    <td style={{ marginLeft: "2vw" }} className="d-flex">
                      {" "}
                      <img
                        src={isExpand && tIndex == index ? down : up}
                        alt="up"
                        className="img-fluid"
                        style={{
                          maxWidth: "20px",
                          marginRight: "10px",
                          marginTop: "4px",
                        }}
                        onClick={() => {
                          setExpann(!isExpand);
                          setIndex(index);
                        }}
                      />
                      {Offer.id}
                    </td>
                    <td>{Offer.name}</td>
                    <td className="d-flex justify-content-end">
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
                  <tr>
                    <td colSpan="3">
                      {isExpand && tIndex == index ? (
                        <table className="table text-center text-size">
                        <thead className="text-black bg-color-header-sm">
                          <tr>
                            <th>Offer Name</th>
                            <th>Date Range</th>
                            <th>Sundays</th>
                            <th>Mondays</th>
                            <th>Wednesdays</th>
                            <th>Thursdays</th>
                            <th>Fridays</th>
                            <th>Saturdays</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {Offer.offers.map((i, offerIndex) => (
                            <tr key={offerIndex}>
                              <td>{i.offer_name}</td>
                              <td>{i.date_range}</td>
                              <td>{i.sundays}</td>
                              <td>{i.mondays}</td>
                              <td>{i.wednesdays}</td>
                              <td>{i.thursdays}</td>
                              <td>{i.fridays}</td>
                              <td>{i.saturdays}</td>
                              <td>
                                {" "}
                                <button className="btn btn-sm me-1">
                                  🗑️
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      ) : (
                        ""
                      )}
                      {/* <table className="table text-center text-size">
                        <thead className="text-black bg-color-header-sm">
                          <tr>
                            <th>Offer Name</th>
                            <th>Date Range</th>
                            <th>Sundays</th>
                            <th>Mondays</th>
                            <th>Wednesdays</th>
                            <th>Thursdays</th>
                            <th>Fridays</th>
                            <th>Saturdays</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {Offer.offers.map((i, offerIndex) => (
                            <tr key={offerIndex}>
                              <td>{i.offer_name}</td>
                              <td>{i.date_range}</td>
                              <td>{i.sundays}</td>
                              <td>{i.mondays}</td>
                              <td>{i.wednesdays}</td>
                              <td>{i.thursdays}</td>
                              <td>{i.fridays}</td>
                              <td>{i.saturdays}</td>
                              <td>
                                {" "}
                                <button className="btn btn-sm me-1">🗑️</button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table> */}
                    </td>
                  </tr>
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
