import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as customerApi from '../../api/customerApi';
import '../../App.css';

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [keyword, setKeyword] = useState('');
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCustomers();
  }, [keyword, pageNumber]);

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      const response = await customerApi.getCustomers(keyword, pageNumber, pageSize);
      if (response.data && Array.isArray(response.data)) {
        setCustomers(response.data);
      } else {
        setCustomers([]);
      }
      setTotalPages(response.data?.totalPages || 1);
    } catch (err) {
      setCustomers([]);
      setError('Failed to fetch customers. Please ensure the API is running.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this customer?')) {
      try {
        await customerApi.deleteCustomer(id);
        setCustomers(customers.filter((customer) => customer.id !== id));
      } catch (err) {
        setError('Failed to delete customer');
      }
    }
  };

  const handleEdit = (id) => {
    navigate(`/customers/edit/${id}`);
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
        <h1>Customer Management</h1>
        <nav>
          <button className="nav-button" onClick={() => navigate('/customers/create')}>
            Add Customer
          </button>
        </nav>
      </header>
      <main>
        <input
          type="text"
          placeholder="Search customers..."
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
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th>Phone Number</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {customers.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="no-data">No customers found</td>
                  </tr>
                ) : (
                  customers.map((customer) => (
                    <tr key={customer.id}>
                      <td>{customer.firstName}</td>
                      <td>{customer.lastName}</td>
                      <td>{customer.email}</td>
                      <td>{customer.phoneNumber}</td>
                      <td>
                        <button className="action-button edit" onClick={() => handleEdit(customer.id)}>
                          Edit
                        </button>
                        <button className="action-button delete" onClick={() => handleDelete(customer.id)}>
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

export default CustomerList;