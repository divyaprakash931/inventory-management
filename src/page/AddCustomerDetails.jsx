import React, { useState } from 'react';
import { toast } from 'react-toastify';

const AddCustomerDetails = () => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    address: '',
    pan: '',
    gst: '',
    phone: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Retrieve the existing excelData from localStorage
    const excelData = JSON.parse(localStorage.getItem('excelData')) || [];

    // Add new customer details as an array
    const newCustomer = [
      formData.name,
      formData.company,
      formData.email,
      formData.address,
      formData.pan,
      formData.gst,
      formData.phone,
    ];

    // Check if the first row is the header (optional step)
    if (excelData.length > 0 && excelData[0][0] === 'Name') {
      // Add new customer to the existing data
      excelData.push(newCustomer);
    } else {
      // If the header row is missing, add it before adding customer data
      const header = ['Name', 'Company', 'Email', 'Address', 'PAN', 'GST', 'Phone'];
      excelData.unshift(header);
      excelData.push(newCustomer);
    }

    // Save the updated excelData back to localStorage
    localStorage.setItem('excelData', JSON.stringify(excelData));

    // Show a success message
    toast.success('Customer added successfully!');

    // Reset form
    setFormData({
      name: '',
      company: '',
      email: '',
      address: '',
      pan: '',
      gst: '',
      phone: '',
    });
  };

  return (
    <div className="max-w-6xl mx-auto bg-white shadow-md rounded-md p-6">
      <h1 className="text-2xl font-bold mb-4">Add Customer Details</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col md:flex-row md:space-x-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700">Company Name</label>
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700">Email ID</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Address</label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
            rows="2"
          ></textarea>
        </div>
        <div className="flex flex-col md:flex-row md:space-x-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700">PAN Number</label>
            <input
              type="text"
              name="pan"
              value={formData.pan}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700">GST Number</label>
            <input
              type="text"
              name="gst"
              value={formData.gst}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700">Phone Number</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
            />
          </div>
        </div>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-700">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddCustomerDetails;
