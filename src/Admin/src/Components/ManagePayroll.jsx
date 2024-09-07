import React, { useState } from 'react';
import './ManagePayroll.css';

const ManagePayroll = () => {
  const [payrollData, setPayrollData] = useState([
    { id: 1, name: 'Alice Johnson', position: 'Software Engineer', salary: '$5,000', status: 'Approved' },
    { id: 2, name: 'Bob Smith', position: 'HR Manager', salary: '$6,000', status: 'Pending' },
    { id: 3, name: 'Charlie Brown', position: 'QA Tester', salary: '$4,000', status: 'Pending' },
  ]);

  const [isEditing, setIsEditing] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState(null);
  const [newSalary, setNewSalary] = useState('');

  const handleEdit = (employee) => {
    setCurrentEmployee(employee);
    setNewSalary(employee.salary);
    setIsEditing(true); // Open the edit modal
  };

  const handleSave = () => {
    setPayrollData(
      payrollData.map((employee) =>
        employee.id === currentEmployee.id ? { ...employee, salary: newSalary } : employee
      )
    );
    setIsEditing(false); // Close the modal
  };

  const handleApprove = (id) => {
    setPayrollData(
      payrollData.map((employee) =>
        employee.id === id ? { ...employee, status: 'Approved' } : employee
      )
    );
  };

  return (
    <div className="manage-payroll">
      <h2>Manage Payroll</h2>

      <table className="payroll-table">
        <thead>
          <tr>
            <th>Employee Name</th>
            <th>Position</th>
            <th>Salary</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {payrollData.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.name}</td>
              <td>{employee.position}</td>
              <td>{employee.salary}</td>
              <td className={employee.status === 'Approved' ? 'status-approved' : 'status-pending'}>
                {employee.status}
              </td>
              <td>
                <button className="edit-btn" onClick={() => handleEdit(employee)}>
                  Edit
                </button>
                {employee.status === 'Pending' && (
                  <button className="approve-btn" onClick={() => handleApprove(employee.id)}>
                    Approve
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isEditing && (
        <div className="edit-modal">
          <div className="modal-content">
            <h3>Edit Salary for {currentEmployee.name}</h3>
            <label>
              New Salary:
              <input
                type="text"
                value={newSalary}
                onChange={(e) => setNewSalary(e.target.value)}
              />
            </label>
            <div className="modal-actions">
              <button onClick={handleSave} className="save-btn">Save</button>
              <button onClick={() => setIsEditing(false)} className="cancel-btn">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManagePayroll;
