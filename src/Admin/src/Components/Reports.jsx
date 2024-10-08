import React, { useState } from 'react';
import './Report.css';

const AdminReports = () => {
  const [reportType, setReportType] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [generatedReport, setGeneratedReport] = useState(null);
  const [error, setError] = useState('');

  const handleGenerateReport = () => {
    if (!reportType || !startDate || !endDate) {
      setError('Please fill out all fields to generate a report.');
      return;
    }
    setError('');

    // Simulate generating a report based on the selected type and date range
    const report = {
      type: reportType,
      startDate,
      endDate,
      data: [
        { id: 1, name: 'Alice Johnson', attendance: '95%', payroll: '$5000' },
        { id: 2, name: 'Bob Smith', attendance: '98%', payroll: '$6000' },
      ],
    };
    setGeneratedReport(report);
  };

  return (
    <div className="admin-reports">
      <h2>Generate Reports</h2>
      <div className="report-filters">
        <div className="filter-item">
          <label htmlFor="reportType">Report Type:</label>
          <select
            id="reportType"
            value={reportType}
            onChange={(e) => setReportType(e.target.value)}
          >
            <option value="">Select a report type</option>
            <option value="attendance">Attendance Report</option>
            <option value="payroll">Payroll Report</option>
            <option value="leave">Leave Report</option>
          </select>
        </div>

        <div className="filter-item">
          <label htmlFor="startDate">Start Date:</label>
          <input
            type="date"
            id="startDate"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>

        <div className="filter-item">
          <label htmlFor="endDate">End Date:</label>
          <input
            type="date"
            id="endDate"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>

        <button onClick={handleGenerateReport} className="btn generate-btn">
          Generate Report
        </button>
      </div>

      {error && <p className="error-message">{error}</p>}

      {generatedReport && (
        <div className="generated-report">
          <h3>{`${generatedReport.type.charAt(0).toUpperCase() + generatedReport.type.slice(1)} Report`}</h3>
          <p>
            Report from {generatedReport.startDate} to {generatedReport.endDate}
          </p>
          <table className="report-table">
            <thead>
              <tr>
                <th>Employee Name</th>
                {generatedReport.type === 'attendance' && <th>Attendance</th>}
                {generatedReport.type === 'payroll' && <th>Payroll</th>}
                {generatedReport.type === 'leave' && <th>Leave Status</th>}
              </tr>
            </thead>
            <tbody>
              {generatedReport.data.map((row) => (
                <tr key={row.id}>
                  <td>{row.name}</td>
                  {generatedReport.type === 'attendance' && <td>{row.attendance}</td>}
                  {generatedReport.type === 'payroll' && <td>{row.payroll}</td>}
                  {generatedReport.type === 'leave' && <td>Approved</td>}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminReports;
