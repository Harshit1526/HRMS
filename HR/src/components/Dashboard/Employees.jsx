import React, { useState } from 'react';
import { FaSearch, FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import './Employees.css';

const initialEmployees = [
  { id: 1, name: 'Alice Johnson', position: 'Software Engineer', department: 'Engineering' },
  { id: 2, name: 'Bob Smith', position: 'Product Manager', department: 'Product' },
  { id: 3, name: 'Charlie Brown', position: 'UI/UX Designer', department: 'Design' },
];

const Employees = () => {
  const [employees, setEmployees] = useState(initialEmployees);
  const [showForm, setShowForm] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({ id: '', name: '', position: '', department: '' });
  const [searchTerm, setSearchTerm] = useState('');

  const handleAddClick = () => {
    setEditMode(false);
    setFormData({ id: '', name: '', position: '', department: '' });
    setShowForm(true);
  };

  const handleEditClick = (employee) => {
    setEditMode(true);
    setFormData(employee);
    setShowForm(true);
  };

  const handleDeleteClick = (id) => {
    setEmployees(employees.filter(employee => employee.id !== id));
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (editMode) {
      setEmployees(employees.map(employee => 
        employee.id === formData.id ? formData : employee
      ));
    } else {
      setEmployees([...employees, { ...formData, id: Date.now() }]);
    }
    handleCancelClick(); // Hide the form and reset the form data
  };

  const handleCancelClick = () => {
    setShowForm(false);
    setFormData({ id: '', name: '', position: '', department: '' });
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredEmployees = employees.filter(employee =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="employees-page">
      <div className="employees-header">
        <h2>Employees</h2>
        <div className="employees-actions">
          <input
            type="text"
            placeholder="Search employees..."
            className="search-input"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <button className="add-btn" onClick={handleAddClick}>
            <FaPlus />
            <span>{editMode ? 'Edit Employee' : 'Add Employee'}</span>
          </button>
        </div>
      </div>
      {showForm && (
        <form className="employee-form" onSubmit={handleFormSubmit}>
          <input
            type="text"
            name="id"
            placeholder="Employee ID"
            value={formData.id}
            onChange={handleFormChange}
            required
            disabled={editMode} // Disable ID input during edit
          />
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleFormChange}
            required
          />
          <input
            type="text"
            name="position"
            placeholder="Position"
            value={formData.position}
            onChange={handleFormChange}
            required
          />
          <input
            type="text"
            name="department"
            placeholder="Department"
            value={formData.department}
            onChange={handleFormChange}
            required
          />
          <button type="submit" className="submit-btn">
            {editMode ? 'Update' : 'Add'} Employee
          </button>
          <button type="button" className="cancel-btn" onClick={handleCancelClick}>
            Cancel
          </button>
        </form>
      )}
      <table className="employees-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Position</th>
            <th>Department</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.name}</td>
              <td>{employee.position}</td>
              <td>{employee.department}</td>
              <td>
                <button className="edit-btn" onClick={() => handleEditClick(employee)}>
                  <FaEdit />
                </button>
                <button className="delete-btn" onClick={() => handleDeleteClick(employee.id)}>
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Employees;
