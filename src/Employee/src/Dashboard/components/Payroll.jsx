import React, { useState } from 'react';
import './Payroll.css';

const Payroll = () => {
  const [payrollRecords, setPayrollRecords] = useState([
    { id: 1, salary: 5000, status: 'Paid' },
    { id: 2, salary: 6000, status: 'Paid' },
    { id: 3, salary: 4000, status: 'Pending' },
  ]);

  const [formVisible, setFormVisible] = useState(false);
  const [payroll, setPayroll] = useState({
    id: '',
    employeeName: '',
    position: '',
    salary: '',
    status: 'Pending',
  });

  const handleAddPayroll = (e) => {
    e.preventDefault();
    const payrollRecord = {
      ...newPayroll,
      id: parseInt(newPayroll.id, 10),
      salary: parseFloat(newPayroll.salary),
    };
    setPayrollRecords([...payrollRecords, newPayrollRecord]);
    setFormVisible(false);
    setNewPayroll({
      id: '',
      employeeName: '',
      position: '',
      salary: '',

      status: 'Pending',
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPayroll({ ...newPayroll, [name]: value });
  };

  const toggleFormVisibility = () => {
    setFormVisible(!formVisible);
  };

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
          <p>{payrollRecords.length}</p>
        </div>
        <div className="summary-card">
          <h3>Pending Approvals</h3>
          <p>{payrollRecords.filter(record => record.status === 'Pending').length}</p>
        </div>
      </div>
      <button className="toggle-form-btn" onClick={toggleFormVisibility}>
        {formVisible ? 'Hide Payroll Form' : 'Add Payroll'}
      </button>
      {formVisible && (
        <form className="payroll-form" onSubmit={handleAddPayroll}>
          <input
            type="number"
            name="id"
            value={newPayroll.id}
            onChange={handleInputChange}
            placeholder="Employee ID"
            required
          />
          <input
            type="text"
            name="employeeName"
            value={newPayroll.employeeName}
            onChange={handleInputChange}
            placeholder="Employee Name"
            required
          />
          <input
            type="text"
            name="position"
            value={newPayroll.position}
            onChange={handleInputChange}
            placeholder="Position"
            required
          />
          <input
            type="number"
            name="salary"
            value={newPayroll.salary}
            onChange={handleInputChange}
            placeholder="Salary"
            required
          />
          <select
            name="status"
            value={newPayroll.status}
            onChange={handleInputChange}
          >
            <option value="Paid">Paid</option>
            <option value="Pending">Pending</option>
          </select>
          <button type="submit">Add Payroll</button>
        </form>
      )}
      <div className="payroll-details">
        <h3>Employee Payroll Details</h3>
        <table className="payroll-table">
          <thead>
            <tr>
              <th>Employee ID</th>
              <th>Employee Name</th>
              <th>Position</th>
              <th>Salary</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {payrollRecords.map((record) => (
              <tr key={record.id}>
                <td>{record.id}</td>
                <td>{record.employeeName}</td>
                <td>{record.position}</td>
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
