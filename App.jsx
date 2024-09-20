import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginSignup from './src/loginSignup/LoginSignup.jsx';
import Dashboard from './src/HR/src/components/Dashboard/Dashboard.jsx';
import Header from './src/components/Header/Header.jsx';
import EmployeeDashboard from './src/Employee/src/Dashboard/components/EmployeeDashboard.jsx'
import AdminDashboard from './src/Admin/src/Components/AdminDashboard.jsx';


function App() {
  return (
    <>
    <Header></Header>
    <div>
    <Router>
      <Routes>
        <Route path="/login" element={<LoginSignup />} />
        <Route path="/hr_dashboard/*" element={<Dashboard />} />
        <Route path="/employee_dashboard/*" element={<EmployeeDashboard />} />
        <Route path="/admin_dashboard/*" element={<AdminDashboard />} />
        <Route path="/" element={<LoginSignup />} />
      </Routes>
    </Router>
    </div>
    </>
  );
}

export default App;
