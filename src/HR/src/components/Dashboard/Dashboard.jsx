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
  FaBell,
  FaEnvelope,
} from 'react-icons/fa';
import { PieChart, Pie, Cell, BarChart, Bar,Line,LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, ComposedChart } from 'recharts';
import './Dashboard.css';
import Employees from './Employees';
import Attendance from './Attendance';
import LeaveManagement from './LeaveManagement';
import Payroll from './Payroll';
import Reports from './Reports';
import Onboarding from './Onboarding';
import Performance from './Performance';

const Dashboard = () => {
  const navItems = [
    { path: '', name: 'Overview', icon: <FaTachometerAlt /> },
    { path: 'employees', name: 'Employees', icon: <FaUsers /> },
    { path: 'attendance', name: 'Attendance', icon: <FaCalendarAlt /> },
    { path: 'leave', name: 'Leave Management', icon: <FaClipboardList /> },
    { path: 'payroll', name: 'Payroll', icon: <FaMoneyBillWave /> },
    { path: 'onboarding', name: 'Onboarding', icon: <FaEnvelope /> },
    { path: 'performance', name: 'Performance', icon: <FaBell /> },
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
              to={`/hr_dashboard/${item.path}`}
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
            <Route path="" element={<DashboardOverview />} />
            <Route path="employees" element={<Employees />} />
            <Route path="attendance" element={<Attendance />} />
            <Route path="leave" element={<LeaveManagement />} />
            <Route path="payroll" element={<Payroll />} />
            <Route path="onboarding" element={<Onboarding />} />
            <Route path="performance" element={<Performance />} />
            <Route path="reports" element={<Reports />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};

const DashboardOverview = () => {
  const employeeDistributionData = [
    { name: 'Full-time', value: 150 },
    { name: 'Part-time', value: 50 },
    { name: 'Contract', value: 30 },
    { name: 'Intern', value: 20 },
  ];

  const attendanceTrendData = [
    { month: 'Jan', attendance: 95.2, lateArrivals: 3.5, absentees: 1.3 },
    { month: 'Feb', attendance: 96.8, lateArrivals: 2.8, absentees: 0.4 },
    { month: 'Mar', attendance: 97.5, lateArrivals: 2.2, absentees: 0.3 },
    { month: 'Apr', attendance: 98.1, lateArrivals: 1.7, absentees: 0.2 },
    { month: 'May', attendance: 98.6, lateArrivals: 1.3, absentees: 0.1 },
    { month: 'Jun', attendance: 99.0, lateArrivals: 0.9, absentees: 0.1 },
    { month: 'Jul', attendance: 99.2, lateArrivals: 0.7, absentees: 0.1 },
    { month: 'Aug', attendance: 99.4, lateArrivals: 0.5, absentees: 0.1 },
    { month: 'Sep', attendance: 99.5, lateArrivals: 0.4, absentees: 0.1 },
    { month: 'Oct', attendance: 99.6, lateArrivals: 0.3, absentees: 0.1 },
    { month: 'Nov', attendance: 99.7, lateArrivals: 0.2, absentees: 0.1 },
    { month: 'Dec', attendance: 99.8, lateArrivals: 0.1, absentees: 0.1 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  const formatTooltip = (value, name, props) => {
    return [`${value.toFixed(1)}%`, name];
  };

  return (
    <div className="dashboard-overview">
      <h2>HRMS Dashboard Overview</h2>
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
            <h3>Average Attendance</h3>
            <p>98.5%</p>
          </div>
        </div>
        <div className="stat-card">
          <FaClipboardList className="stat-icon" />
          <div className="stat-info">
            <h3>Leave Utilization</h3>
            <p>85%</p>
          </div>
        </div>
        <div className="stat-card">
          <FaMoneyBillWave className="stat-icon" />
          <div className="stat-info">
            <h3>Monthly Payroll</h3>
            <p>$425,000</p>
          </div>
        </div>
      </div>
      <div className="dashboard-charts">
        <div className="chart employee-distribution">
          <h3>Employee Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={employeeDistributionData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {employeeDistributionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="chart attendance-trend">
          <h3>Monthly Attendance Trends</h3>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart
              data={attendanceTrendData}
              margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis yAxisId="left" domain={[90, 100]} />
              <YAxis yAxisId="right" orientation="right" domain={[0, 10]} />
              <Tooltip formatter={formatTooltip} />
              <Legend />
              <Line 
                yAxisId="left"
                type="monotone" 
                dataKey="attendance" 
                stroke="#8884d8" 
                strokeWidth={2}
                name="Attendance Rate (%)"
              />
              <Line 
                yAxisId="right"
                type="monotone" 
                dataKey="lateArrivals" 
                stroke="#82ca9d" 
                strokeWidth={2}
                name="Late Arrivals (%)"
              />
              <Line 
                yAxisId="right"
                type="monotone" 
                dataKey="absentees" 
                stroke="#ffc658" 
                strokeWidth={2}
                name="Absentees (%)"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
