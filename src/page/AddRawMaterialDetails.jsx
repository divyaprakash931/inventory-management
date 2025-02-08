import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'; // For navigation

const AddRawMaterialDetails = () => {
  const navigate = useNavigate(); // For navigating to the previous page

  const [formData, setFormData] = useState({
    rowId: '',
    company: 'Andal', // Default value set to 'Andal'
    colour: 'gold',
    size: '',
    gsm: '100',
    bf: '12',
    dateOfEntry: '',
    balance: '10%',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Retrieve the existing excelData from localStorage
    const excelData = JSON.parse(localStorage.getItem('rawMaterialData')) || [];

    // Add new raw material details as an array
    const newRawMaterial = [
      formData.rowId,
      formData.company,
      formData.colour,
      formData.size,
      formData.gsm,
      formData.bf,
      formData.dateOfEntry,
      formData.balance,
    ];

    // Check if the first row is the header (optional step)
    if (excelData.length > 0 && excelData[0][0] === 'Row ID') {
      excelData.push(newRawMaterial);
    } else {
      const header = ['Row ID', 'Company', 'Colour', 'Size', 'GSM', 'BF', 'Date of Entry', 'Balance'];
      excelData.unshift(header);
      excelData.push(newRawMaterial);
    }

    // Save the updated excelData back to localStorage
    localStorage.setItem('rawMaterialData', JSON.stringify(excelData));

    // Show a success message
    toast.success('Raw material details added successfully!');

    // Reset form
    setFormData({
      rowId: '',
      company: 'Andal',
      colour: 'gold',
      size: '',
      gsm: '100',
      bf: '12',
      dateOfEntry: '',
      balance: '10%',
    });
  };

  const handleCancel = () => {
    // Reset form data
    setFormData({
      rowId: '',
      company: 'Andal',
      colour: 'gold',
      size: '',
      gsm: '100',
      bf: '12',
      dateOfEntry: '',
      balance: '10%',
    });
  };

  const handleBack = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <div className="max-w-6xl mx-auto bg-white shadow-md rounded-md p-6">
      <button onClick={handleBack} className="text-gray-600 mb-4">
        ← Back
      </button>
      <h1 className="text-2xl font-bold mb-4">Add Raw Material Details</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col md:flex-row md:space-x-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700">Row ID</label>
            <input
              type="text"
              name="rowId"
              value={formData.rowId}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700">Company</label>
            <select
              name="company"
              value={formData.company}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
            >
              <option value="Andal">Andal</option>
              <option value="Subam">Subam</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:space-x-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700">Colour</label>
            <select
              name="colour"
              value={formData.colour}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
            >
              <option value="gold">Gold</option>
              <option value="brown">Brown</option>
              <option value="white">White</option>
            </select>
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700">Size</label>
            <input
              type="text"
              name="size"
              value={formData.size}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:space-x-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700">GSM</label>
            <select
              name="gsm"
              value={formData.gsm}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
            >
              <option value="100">100</option>
              <option value="120">120</option>
              <option value="150">150</option>
              <option value="180">180</option>
              <option value="200">200</option>
              <option value="230">230</option>
              <option value="250">250</option>
            </select>
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700">BF</label>
            <select
              name="bf"
              value={formData.bf}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
            >
              <option value="12">12</option>
              <option value="14">14</option>
              <option value="16">16</option>
              <option value="18">18</option>
              <option value="20">20</option>
              <option value="22">22</option>
              <option value="24">24</option>
              <option value="26">26</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:space-x-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700">Date of Entry</label>
            <input
              type="date"
              name="dateOfEntry"
              value={formData.dateOfEntry}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700">Balance</label>
            <select
              name="balance"
              value={formData.balance}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
            >
              <option value="10%">10%</option>
              <option value="30%">30%</option>
              <option value="50%">50%</option>
              <option value="75%">75%</option>
              <option value="100%">100%</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end gap-4 mt-4">
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-700">
            Submit
          </button>
          <button type="button" onClick={handleCancel} className="bg-red-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-red-700">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddRawMaterialDetails;
