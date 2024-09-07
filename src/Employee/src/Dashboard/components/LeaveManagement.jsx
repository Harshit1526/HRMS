import React, { useState } from 'react';
import './LeaveManagement.css';

const initialLeaveRequests = [
  { employeeId: 'E001',  type: 'Sick Leave', startDate: '2024-09-01', endDate: '2024-09-03', status: 'Approved' },
  { employeeId: 'E002',  type: 'Annual Leave', startDate: '2024-09-05', endDate: '2024-09-10', status: 'Pending' },
  { employeeId: 'E003',  type: 'Casual Leave', startDate: '2024-09-15', endDate: '2024-09-16', status: 'Rejected' },
];

const LeaveManagement = () => {
  const [leaveRequests, setLeaveRequests] = useState(initialLeaveRequests);
  const [formVisible, setFormVisible] = useState(false);
  const [newRequest, setNewRequest] = useState({
    type: 'Sick Leave',
    startDate: '',
    endDate: '',
    status: 'Pending'
  });

  const handleAddLeaveRequest = (e) => {
    e.preventDefault();
    const newLeaveRequest = {
      ...newRequest,
      id: Date.now(), // Use timestamp as unique ID
    };
    setLeaveRequests([...leaveRequests, newLeaveRequest]);
    setFormVisible(false);
    setNewRequest({
      type: 'Sick Leave',
      startDate: '',
      endDate: '',
      status: 'Pending'
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRequest({ ...newRequest, [name]: value });
  };

  const toggleFormVisibility = () => {
    setFormVisible(!formVisible);
  };

  return (
    <div className="leave-management">
      <h2>Leave Management</h2>
      <button className="toggle-form-btn" onClick={toggleFormVisibility}>
        {formVisible ? 'Hide Leave Request Form' : 'Add Leave Request'}
      </button>
      {formVisible && (
        <form className="leave-form" onSubmit={handleAddLeaveRequest}>
          <select name="type" value={newRequest.type} onChange={handleInputChange} required>
            <option value="Sick Leave">Sick Leave</option>
            <option value="Annual Leave">Annual Leave</option>
            <option value="Casual Leave">Casual Leave</option>
          </select>
          <input
            type="date"
            name="startDate"
            value={newRequest.startDate}
            onChange={handleInputChange}
            required
          />
          <input
            type="date"
            name="endDate"
            value={newRequest.endDate}
            onChange={handleInputChange}
            required
          />
          <button type="submit">Submit Request</button>
        </form>
      )}
      <div className="leave-requests">
        <h3>Leave History</h3>
        <table className="leave-table">
          <thead>
            <tr>
              <th>Leave Type</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {leaveRequests.map((request) => (
              <tr key={request.id}>
                <td>{request.type}</td>
                <td>{request.startDate}</td>
                <td>{request.endDate}</td>
                <td className={`status ${request.status.toLowerCase()}`}>{request.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeaveManagement;
