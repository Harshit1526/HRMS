import React, { useState } from 'react';
import './Payroll.css';

const Payroll = () => {
  const [payrollRecords, setPayrollRecords] = useState([
    { id: 1, month: 'Jan', hoursWorked: 200, salary: 5000, status: 'Paid' },
    { id: 2, month: 'Feb', hoursWorked: 220, salary: 6000, status: 'Paid' },
    { id: 3, month: 'March', hoursWorked: 180, salary: 4000, status: 'Pending' },
    { id: 3, month: 'April', hoursWorked: 190, salary: 4000, status: 'Pending' },
  ]);


  return (
    <div className="payroll-dashboard">
      <h2>Payroll Management</h2>
      <div className="payroll-summary">
        <div className="summary-card">
          <h3>Total Payroll</h3>
          <p>${payrollRecords.reduce((total, record) => total + record.salary, 0)}</p>
        </div>
        <div className="summary-card">
          <h3>Hours worked</h3>
          <p>{payrollRecords[payrollRecords.length-1].hoursWorked}</p>
        </div>
        <div className="summary-card">
          <h3>Pending Approvals</h3>
          <p>{payrollRecords.filter(record => record.status === 'Pending').length}</p>
        </div>
      </div>

     
      <div className="payroll-details">
        <h3>Payroll Details</h3>
        <table className="payroll-table">
          <thead>
            <tr>
              <th>Month</th>
              <th>Salary</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {payrollRecords.map((record) => (
              <tr key={record.id}>
                <td>{record.month}</td>
                <td>${record.salary}</td>
                <td className={`status ${record.status.toLowerCase()}`}>{record.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Payroll;
