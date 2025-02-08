import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import CustomerDetails from './page/CustomerDetails';
import AddCustomerDetails from './page/AddCustomerDetails';
import Dashboard from './page/Dashboard';
import localStorage from './page/LocalStorage'
import InvoiceForm from './page/InvoiceForm';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PdfGenerator from './page/Pdfgenerator';
import Login from './components/Login';
import RawMaterialDetails from './page/RawMaterialDetails'
import AddRawMaterialDetails from './page/AddRawMaterialDetails'
import Attendance  from './page/Attendance'
import TodoList from './page/TodoList';
const App = () => {
  return (
    <>
    <ToastContainer />
    <Router>
      <Routes>
        {/* Pass the routed component as a prop to Navbar */}
        {/* <Route path="/" element={<Navbar component={localStorage} />} /> */}
        <Route path="/" element={<Login />} />
        <Route path="/localStorage" element={<Navbar component={localStorage} />} />
        <Route path="/dashboard" element={<Navbar component={Dashboard} />} />
        <Route path="/customer-details" element={<Navbar component={CustomerDetails} />} />
        <Route path="/add-customer-details" element={<Navbar component={AddCustomerDetails} />} />
        <Route path="/invoice-form" element={<Navbar component={InvoiceForm} />} />
        <Route path="/pdf-generator" element={<Navbar component={PdfGenerator} />} />
        <Route path="/raw-material-details" element={<Navbar component={RawMaterialDetails} />} />
        <Route path="/add-Raw-Material-details" element={<Navbar component={AddRawMaterialDetails} />} />
        <Route path="/attendance" element={<Navbar component={Attendance } />} />
        <Route path="/todo-list" element={<Navbar component={TodoList } />} />
      </Routes>
    </Router>
    </>
  );
};

export default App;
