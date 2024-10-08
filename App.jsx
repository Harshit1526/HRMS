import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginSignup from './src/loginSignup/LoginSignup.jsx';
import Dashboard from './src/HR/src/components/Dashboard/Dashboard.jsx';
import Header from './src/components/Header/Header.jsx';
import EmployeeDashboard from './src/Employee/src/Dashboard/components/EmployeeDashboard.jsx'
import AdminDashboard from './src/Admin/src/Components/AdminDashboard.jsx';
import ManageEmployees from './src/Admin/src/Components/ManageEmployees.jsx';
import ManageAttendance from './src/Admin/src/Components/ManageAttendance.jsx';
import Managepayroll from './src/Admin/src/Components/Managepayroll.jsx';
import ManageLeave from './src/Admin/src/Components/ManageLeaveRequests.jsx';
import Report from './src/Admin/src/Components/Reports.jsx';
import EmployeeAtendance from './src/Employee/src/Dashboard/components/Attendance.jsx';
import LeaveManagement from './src/Employee/src/Dashboard/components/LeaveManagement.jsx';
import Payroll from './src/Employee/src/Dashboard/components/Payroll.jsx';
import Reports from './src/Employee/src/Dashboard/components/Reports.jsx';

function App() {
  return (
    <>
      <Header />
      <Router>
        <Routes>
          <Route path="/" element={<LoginSignup />} />
          <Route path="/login" element={<LoginSignup />} />
          <Route path="/hr_dashboard/*" element={<Dashboard />} />
          <Route path="/admin_dashboard/*" element={<AdminDashboard />} />
          <Route path="/admin/employees" element={<ManageEmployees />} />
          <Route path="/admin/attendance" element={<ManageAttendance />} />
          <Route path="/admin/payroll" element={<Managepayroll />} />
          <Route path="/admin/leave" element={<ManageLeave />} />
          <Route path="/admin/reports" element={<Report />} />

          {/* Nested routes for Employee Dashboard */}
          <Route path="/employee_dashboard/*" element={<EmployeeDashboard />}>
            <Route path="attendance" element={<EmployeeAtendance />} />
            <Route path="leave" element={<LeaveManagement />} />
            <Route path="payroll" element={<Payroll />} />
            <Route path="reports" element={<Reports />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
