import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as customerApi from '../../api/customerApi';
import '../../App.css';

const CustomerForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    phoneNumber: '',
  });
  const [error, setError] = useState(null);

  const fetchCustomer = useCallback(async () => {
    try {
      const response = await customerApi.getCustomerById(id);
      setCustomer({
        id: response.data.id,
        firstName: response.data.firstName,
        lastName: response.data.lastName,
        email: response.data.email || '',
        address: response.data.address || '',
        phoneNumber: response.data.phoneNumber || '',
      });
    } catch (err) {
      setError('Failed to fetch customer');
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      fetchCustomer();
    }
  }, [id, fetchCustomer]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomer((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (id) {
        await customerApi.updateCustomer(id, customer);
      } else {
        await customerApi.createCustomer(customer);
      }
      navigate('/customers');
    } catch (err) {
      setError(`Failed to ${id ? 'update' : 'create'} customer`);
    }
  };

  return (
    <div className="container">
      <header className="navbar">
        <h1>{id ? 'Edit Customer' : 'Create Customer'}</h1>
        <nav>
          <button className="nav-button" onClick={() => navigate('/customers')}>
            Back to List
          </button>
        </nav>
      </header>
      <main>
        {error && <div className="error">{error}</div>}
        <form className="customer-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={customer.firstName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={customer.lastName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={customer.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              name="address"
              value={customer.address}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="phoneNumber">Phone Number</label>
            <input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              value={customer.phoneNumber}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-actions">
            <button type="submit" className="submit-button">
              {id ? 'Update' : 'Create'} Customer
            </button>
            <button
              type="button"
              className="cancel-button"
              onClick={() => navigate('/customers')}
            >
              Cancel
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default CustomerForm;
