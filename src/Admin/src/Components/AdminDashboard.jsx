import React from 'react';
import { Link } from 'react-router-dom';
import './Admin.css';
import { FaUserCog, FaMoneyCheckAlt, FaCalendarCheck, FaFileAlt, FaChartBar } from 'react-icons/fa';

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard-container">
      <h1 className="admin-heading">Admin Panel</h1>
      <div className="admin-dashboard-grid">
        <Link to="/admin/employees" className="admin-link">
          <FaUserCog className="admin-icon" />
          <span>Manage Employees</span>
        </Link>
        <Link to="/admin/payroll" className="admin-link">
          <FaMoneyCheckAlt className="admin-icon" />
          <span>Manage Payroll</span>
        </Link>
        <Link to="/admin/attendance" className="admin-link">
          <FaCalendarCheck className="admin-icon" />
          <span>Manage Attendance</span>
        </Link>
        <Link to="/admin/leave" className="admin-link">
          <FaFileAlt className="admin-icon" />
          <span>Manage Leave Requests</span>
        </Link>
        <Link to="/admin/reports" className="admin-link">
          <FaChartBar className="admin-icon" />
          <span>View Reports</span>
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
