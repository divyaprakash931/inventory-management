import * as XLSX from "xlsx"; 
import { toast } from 'react-toastify';

const DownloadExcel = () => {
    // Retrieve data from localStorage
    const excelData = JSON.parse(localStorage.getItem('excelData'));
    const storedData = JSON.parse(localStorage.getItem("rawMaterialData"));
    const attendanceData = JSON.parse(localStorage.getItem("attendanceData"));

    // Check if datasets are available
    if (!excelData || excelData.length === 0) {
        toast.error("No customer data available to download");
        return;
    }
    
    if (!storedData || storedData.length === 0) {
        toast.error("No raw material data available to download");
        return;
    }

    if (!attendanceData || attendanceData.length === 0) {
        toast.error("No attendance data available to download");
        return;
    }

    // Function to download a single Excel file
    const downloadFile = (data, fileName, sheetName) => {
        const worksheet = XLSX.utils.aoa_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
        XLSX.writeFile(workbook, fileName);
    };


    // Download each file separately
    downloadFile(excelData, "CustomerData.xlsx", "Customers");
    downloadFile(storedData, "RawMaterialData.xlsx", "Raw Materials");
    downloadFile(attendanceData, "AttendanceData.xlsx", "Attendance");

    toast.success("Excel files downloaded successfully!");
};

export default DownloadExcel;
