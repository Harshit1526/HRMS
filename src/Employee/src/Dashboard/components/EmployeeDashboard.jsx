import React from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import {
  FaUsers,
  FaCalendarAlt,
  FaClipboardList,
  FaMoneyBillWave,
  FaChartBar,
  FaSignOutAlt,
  FaTachometerAlt,
} from 'react-icons/fa';
import './EmployeeDashboard.css';
import Attendance from './Attendance';
import LeaveManagement from './LeaveManagement';
import Payroll from './Payroll';
import Reports from './Reports';

const EmployeeDashboard = () => {
  const navItems = [
    { path: '', name: 'Overview', icon: <FaTachometerAlt /> },
    { path: 'attendance', name: 'Attendance', icon: <FaCalendarAlt /> },
    { path: 'leave', name: 'Leave Management', icon: <FaClipboardList /> },
    { path: 'payroll', name: 'Payroll', icon: <FaMoneyBillWave /> },
    { path: 'reports', name: 'Reports', icon: <FaChartBar /> },
  ];

  return (
    <div className="dashboard">
      <aside className="sidebar">
        <div className="sidebar-header">
          <h1>HRMS</h1>
        </div>
        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={`/employee_dashboard/${item.path}`}
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              {item.icon}
              <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>
        <div className="sidebar-footer">
          <NavLink to="/" className="logout-btn">
            <FaSignOutAlt />
            <span>Logout</span>
          </NavLink>
        </div>
      </aside>

      <main className="main-content">
        <div className="content-area">
          <Routes>
            <Route path="/" element={<DashboardOverview />} />
            <Route path="/attendance" element={<Attendance />} />
            <Route path="/leave" element={<LeaveManagement />} />
            <Route path="/payroll" element={<Payroll />} />
            <Route path="/reports" element={<Reports />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};

const DashboardOverview = () => (
  <div className="dashboard-overview">
    <h2>Welcome to the HRMS Dashboard</h2>
    <div className="quick-stats">
      <div className="stat-card">
        <FaUsers className="stat-icon" />
        <div className="stat-info">
          <h3>Total Employees</h3>
          <p>250</p>
        </div>
      </div>
      <div className="stat-card">
        <FaCalendarAlt className="stat-icon" />
        <div className="stat-info">
          <h3>Present Today</h3>
          <p>230</p>
        </div>
      </div>
      <div className="stat-card">
        <FaClipboardList className="stat-icon" />
        <div className="stat-info">
          <h3>On Leave</h3>
          <p>15</p>
        </div>
      </div>
      <div className="stat-card">
        <FaMoneyBillWave className="stat-icon" />
        <div className="stat-info">
          <h3>Payroll</h3>
          <p>$125,000</p>
        </div>
      </div>
    </div>
  </div>
);

export default EmployeeDashboard;
