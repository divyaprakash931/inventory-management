import React, { useState } from "react";
import * as XLSX from "xlsx";
import { toast } from "react-toastify";
import downloadExcel from "../components/DownloadExcel";
import Button from "../components/Button";

const ExcelFileReader = () => {
  const [excelData, setExcelData] = useState([]);
  const [rawMaterialData, setRawMaterialData] = useState([]);
  const [attendanceData, setAttendanceData] = useState([]); // State for attendance data

  // Function to handle Excel file upload
  const handleFileUpload = (event) => {
    const file = event.target.files[0];

    if (file && file.type.includes("spreadsheetml")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const sheetData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        setExcelData(sheetData);
        localStorage.setItem("excelData", JSON.stringify(sheetData));
        toast.success("Data stored in localStorage for future use");
      };
      reader.readAsArrayBuffer(file);
    } else {
      toast.error("Please upload a valid Excel file");
    }
  };

  // Function to handle raw material file upload
  const handleRawMaterialUpload = (event) => {
    const file = event.target.files[0];

    if (file && file.type.includes("spreadsheetml")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const sheetData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        setRawMaterialData(sheetData);
        localStorage.setItem("rawMaterialData", JSON.stringify(sheetData));
        toast.success("Raw material stock data stored in localStorage");
      };
      reader.readAsArrayBuffer(file);
    } else {
      toast.error("Please upload a valid Excel file for raw material stock");
    }
  };

  // Function to handle attendance file upload
  const handleAttendanceUpload = (event) => {
    const file = event.target.files[0];

    if (file && file.type.includes("spreadsheetml")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const sheetData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        setAttendanceData(sheetData);
        localStorage.setItem("attendanceData", JSON.stringify(sheetData));
        toast.success("Attendance data stored in localStorage");
      };
      reader.readAsArrayBuffer(file);
    } else {
      toast.error("Please upload a valid Excel file for attendance data");
    }
  };

  // Function to clear localStorage and reset state
  const clearLocalStorage = () => {
    localStorage.clear();
    setExcelData([]);
    setRawMaterialData([]);
    setAttendanceData([]); // Reset attendance data
    toast.info("Local storage data cleared");
  };

  return (
    <div className="container max-w-full mx-auto p-5">
      <h1 className="text-xl font-bold mb-4">Excel File Reader</h1>

      {/* Three input boxes in a single row */}
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <input
          type="file"
          accept=".xlsx, .xls"
          onChange={handleFileUpload}
          className="border border-gray-300 rounded p-2 w-full md:w-auto"
          placeholder="Upload Excel Data"
        />
        <input
          type="file"
          accept=".xlsx, .xls"
          onChange={handleRawMaterialUpload}
          className="border border-gray-300 rounded p-2 w-full md:w-auto"
          placeholder="Upload Raw Material Stock"
        />
        <input
          type="file"
          accept=".xlsx, .xls"
          onChange={handleAttendanceUpload}
          className="border border-gray-300 rounded p-2 w-full md:w-auto"
          placeholder="Upload Attendance Data"
        />
      </div>

      {/* Two buttons in a single row */}
      <div className="flex flex-col md:flex-row gap-4">
        <Button
          className="bg-red-600 text-white shadow-md hover:bg-red-700"
          onClick={clearLocalStorage}
        >
          Clear Local Storage
        </Button>
        <Button
          className="bg-blue-600 text-white shadow-md hover:bg-blue-700"
          onClick={downloadExcel}
        >
          Download Excel
        </Button>
      </div>
    </div>
  );
};

export default ExcelFileReader;
