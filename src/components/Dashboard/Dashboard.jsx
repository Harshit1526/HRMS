import React from 'react';
import { Routes, Route, NavLink, useResolvedPath, useMatch } from 'react-router-dom';
import { FaUsers, FaCalendarAlt, FaClipboardList, FaMoneyBillWave, FaChartBar, FaSignOutAlt } from 'react-icons/fa';
import './Dashboard.css';
import Employees from './Employees';
import Attendance from './Attendance';
import LeaveManagement from './LeaveManagement';
import Payroll from './Payroll';
import Reports from './Reports';

const Dashboard = () => {
  const resolvedPath = useResolvedPath('');
  const match = useMatch({ path: resolvedPath.pathname, end: true });

  const navItems = [
    { path: 'employees', name: 'Employees', icon: <FaUsers /> },
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
              to={`${match.pathname}/${item.path}`}
              className={({ isActive }) => isActive ? 'active' : ''}
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
        <header className="main-header">
          <h2>HR Management System</h2>
          <div className="user-info">
            <span>John Doe</span>
            <img src="https://via.placeholder.com/40" alt="User avatar" className="avatar" />
          </div>
        </header>
        <div className="content-area">
          <Routes>
            <Route path={match.pathname} element={
              <div className="welcome-screen">
                <h2>Welcome to the HRMS Dashboard</h2>
                <p>Select an option from the sidebar to manage HR tasks.</p>
              </div>
            } />
            <Route path={`${match.pathname}/employees`} element={<Employees />} />
            <Route path={`${match.pathname}/attendance`} element={<Attendance />} />
            <Route path={`${match.pathname}/leave`} element={<LeaveManagement />} />
            <Route path={`${match.pathname}/payroll`} element={<Payroll />} />
            <Route path={`${match.pathname}/reports`} element={<Reports />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;