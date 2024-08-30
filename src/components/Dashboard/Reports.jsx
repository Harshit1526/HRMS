import React, { useState } from 'react';
import './Reports.css';

const Reports = () => {
  const [selectedReport, setSelectedReport] = useState('');

  const handleReportSelection = (reportType) => {
    setSelectedReport(reportType);
  };

  // Sample report data (this could be fetched from an API in a real-world application)
  const reportData = {
    Attendance: [
      { date: '2024-08-01', present: 23, absent: 2 },
      { date: '2024-08-02', present: 25, absent: 0 },
      { date: '2024-08-03', present: 24, absent: 1 },
    ],
    Payroll: [
      { name: 'Alice Johnson', salary: '$5000', month: 'August' },
      { name: 'Bob Smith', salary: '$6000', month: 'August' },
      { name: 'Charlie Brown', salary: '$4000', month: 'August' },
    ],
    Performance: [
      { name: 'Alice Johnson', rating: 'Excellent' },
      { name: 'Bob Smith', rating: 'Good' },
      { name: 'Charlie Brown', rating: 'Average' },
    ],
    Leave: [
      { name: 'Alice Johnson', type: 'Sick Leave', days: 2 },
      { name: 'Bob Smith', type: 'Annual Leave', days: 5 },
      { name: 'Charlie Brown', type: 'Sick Leave', days: 1 },
    ],
  };

  const renderReportDetails = () => {
    switch (selectedReport) {
      case 'Attendance':
        return (
          <table className="report-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Present</th>
                <th>Absent</th>
              </tr>
            </thead>
            <tbody>
              {reportData.Attendance.map((entry, index) => (
                <tr key={index}>
                  <td>{entry.date}</td>
                  <td>{entry.present}</td>
                  <td>{entry.absent}</td>
                </tr>
              ))}
            </tbody>
          </table>
        );
      case 'Payroll':
        return (
          <table className="report-table">
            <thead>
              <tr>
                <th>Employee Name</th>
                <th>Salary</th>
                <th>Month</th>
              </tr>
            </thead>
            <tbody>
              {reportData.Payroll.map((entry, index) => (
                <tr key={index}>
                  <td>{entry.name}</td>
                  <td>{entry.salary}</td>
                  <td>{entry.month}</td>
                </tr>
              ))}
            </tbody>
          </table>
        );
      case 'Performance':
        return (
          <table className="report-table">
            <thead>
              <tr>
                <th>Employee Name</th>
                <th>Performance Rating</th>
              </tr>
            </thead>
            <tbody>
              {reportData.Performance.map((entry, index) => (
                <tr key={index}>
                  <td>{entry.name}</td>
                  <td>{entry.rating}</td>
                </tr>
              ))}
            </tbody>
          </table>
        );
      case 'Leave':
        return (
          <table className="report-table">
            <thead>
              <tr>
                <th>Employee Name</th>
                <th>Leave Type</th>
                <th>Days</th>
              </tr>
            </thead>
            <tbody>
              {reportData.Leave.map((entry, index) => (
                <tr key={index}>
                  <td>{entry.name}</td>
                  <td>{entry.type}</td>
                  <td>{entry.days}</td>
                </tr>
              ))}
            </tbody>
          </table>
        );
      default:
        return <p>Please select a report category to view details.</p>;
    }
  };

  return (
    <div className="reports-dashboard">
      <h2>Reports Dashboard</h2>
      <div className="reports-categories">
        <div className="category-card" onClick={() => handleReportSelection('Attendance')}>
          <h3>Attendance Reports</h3>
          <p>View attendance details and summaries.</p>
        </div>
        <div className="category-card" onClick={() => handleReportSelection('Payroll')}>
          <h3>Payroll Reports</h3>
          <p>Generate payroll and salary reports.</p>
        </div>
        <div className="category-card" onClick={() => handleReportSelection('Performance')}>
          <h3>Performance Reports</h3>
          <p>Analyze employee performance metrics.</p>
        </div>
        <div className="category-card" onClick={() => handleReportSelection('Leave')}>
          <h3>Leave Reports</h3>
          <p>Track and report on employee leave.</p>
        </div>
      </div>
      <div className="report-details">
        <h3>{selectedReport ? `${selectedReport} Report` : 'Select a Report'}</h3>
        {renderReportDetails()}
      </div>
    </div>
  );
};

export default Reports;
