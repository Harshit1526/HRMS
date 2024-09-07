import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminDashboard from './Components/AdminDashboard';
import ManageEmployees from './Components/ManageEmployees';
import ManagePayroll from './Components/ManagePayroll';
import ManageAttendance from './Components/ManageAttendance';
import ManageLeaveRequests from './Components/ManageLeaveRequests';
import Reports from './Components/Reports';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<AdminDashboard />} />
          <Route path="/admin/employees" element={<ManageEmployees />} />
          <Route path="/admin/payroll" element={<ManagePayroll />} />
          <Route path="/admin/attendance" element={<ManageAttendance />} />
          <Route path="/admin/leave" element={<ManageLeaveRequests />} />
          <Route path="/admin/reports" element={<Reports />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
