import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';

const RawMaterialDetails = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [rawMaterialData, setRawMaterialData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("rawMaterialData"));
    if (storedData) {
      setRawMaterialData(storedData);
    }
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredMaterials = rawMaterialData
    .slice(1)
    .filter((row) =>
      row.join(" ").toLowerCase().includes(searchTerm.toLowerCase())
    );

  const clearLocalStorage = () => {
    localStorage.removeItem("rawMaterialData");
    setRawMaterialData([]);
    toast.info("Raw material local storage cleared");
  };

  return (
    <div>
      <div className="max-w-6xl mx-auto bg-white shadow-md rounded-md p-6">
        <h1 className="text-2xl font-bold">Raw Material Details</h1>

        {/* Input Box and Buttons */}
        <div className="flex flex-col sm:flex-row mb-4">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="border border-gray-300 rounded-md px-3 py-2 mb-2 sm:mb-0 sm:mr-2"
          />
          <div className="flex gap-2">
            <button
              className="bg-red-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-red-700"
              onClick={clearLocalStorage}
            >
              Clear Local Storage
            </button>
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-700"
              onClick={() => navigate('/add-Raw-Material-details')}
            >
              +Add Raw Material
            </button>
          </div>
        </div>

        {/* Table for Raw Material Data */}
        <div className="overflow-x-auto mb-4">
          <table className="min-w-full table-auto border-2 text-nowrap">
            <thead className="bg-gray-600">
              <tr>
                {rawMaterialData[0]?.map((header, index) => (
                  <th
                    key={index}
                    className="px-6 py-3 border-b-2 border-gray-200 text-left text-sm leading-4 text-white tracking-wider"
                  >
                    {header}
                  </th>
                ))}
                <th className="px-6 py-3 border-b-2 border-gray-200 text-left text-sm leading-4 text-white tracking-wider">
                  Edit
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {filteredMaterials.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((cell, cellIndex) => (
                    <td
                      key={cellIndex}
                      className="px-6 py-4 whitespace-no-wrap border-b border-gray-200"
                    >
                      {cell}
                    </td>
                  ))}
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-blue-600 cursor-pointer hover:underline">
                    Edit
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RawMaterialDetails;
