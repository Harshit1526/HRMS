import React, { useState, useEffect } from 'react';
import './ManageEmployees.css';

const ManageEmployees = () => {
  const [employees, setEmployees] = useState([]);
  const [editingEmployee, setEditingEmployee] = useState(null);

  useEffect(() => {
    // Simulated API call to get employee data
    const fetchEmployees = async () => {
      const data = [
        { id: 1, name: 'Alice Johnson', position: 'Software Engineer', department: 'Development' },
        { id: 2, name: 'Bob Smith', position: 'HR Manager', department: 'Human Resources' },
      ];
      setEmployees(data);
    };
    fetchEmployees();
  }, []);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      setEmployees(employees.filter(emp => emp.id !== id));
    }
  };

  const handleEdit = (employee) => {
    setEditingEmployee(employee);
  };

  const handleSave = () => {
    setEmployees((prevEmployees) =>
      prevEmployees.map((emp) =>
        emp.id === editingEmployee.id ? editingEmployee : emp
      )
    );
    setEditingEmployee(null);
  };

  return (
    <div className="manage-employees">
      <h2>Manage Employees</h2>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Position</th>
            <th>Department</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.name}</td>
              <td>{employee.position}</td>
              <td>{employee.department}</td>
              <td>
                <button className="edit-btn" onClick={() => handleEdit(employee)}>
                  Edit
                </button>
                <button className="delete-btn" onClick={() => handleDelete(employee.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editingEmployee && (
        <div className="edit-form">
          <h3>Edit Employee</h3>
          <input
            type="text"
            value={editingEmployee.name}
            onChange={(e) => setEditingEmployee({ ...editingEmployee, name: e.target.value })}
            placeholder="Employee Name"
          />
          <input
            type="text"
            value={editingEmployee.position}
            onChange={(e) => setEditingEmployee({ ...editingEmployee, position: e.target.value })}
            placeholder="Position"
          />
          <input
            type="text"
            value={editingEmployee.department}
            onChange={(e) => setEditingEmployee({ ...editingEmployee, department: e.target.value })}
            placeholder="Department"
          />
          <button className="save-btn" onClick={handleSave}>
            Save
          </button>
        </div>
      )}
    </div>
  );
};

export default ManageEmployees;
