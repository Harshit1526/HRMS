import React, { useState, useEffect } from 'react';
import './Leave.css';

const ManageLeave = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);

  useEffect(() => {
    // Simulating a fetch request for leave requests
    const fetchLeaveRequests = async () => {
      const data = [
        { id: 1, name: 'Alice Johnson', type: 'Sick Leave', date: '2024-09-01', status: 'Pending' },
        { id: 2, name: 'Bob Smith', type: 'Casual Leave', date: '2024-09-03', status: 'Pending' },
        { id: 3, name: 'Charlie Brown', type: 'Annual Leave', date: '2024-09-05', status: 'Approved' },
      ];
      setLeaveRequests(data);
    };
    fetchLeaveRequests();
  }, []);

  const handleApprove = (id) => {
    const updatedRequests = leaveRequests.map(request =>
      request.id === id ? { ...request, status: 'Approved' } : request
    );
    setLeaveRequests(updatedRequests);
  };

  const handleReject = (id) => {
    const updatedRequests = leaveRequests.map(request =>
      request.id === id ? { ...request, status: 'Rejected' } : request
    );
    setLeaveRequests(updatedRequests);
  };

  return (
    <div className="manage-leave">
      <h2>Manage Leave Requests</h2>
      <table className="leave-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Leave Type</th>
            <th>Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {leaveRequests.map((request) => (
            <tr key={request.id}>
              <td>{request.name}</td>
              <td>{request.type}</td>
              <td>{request.date}</td>
              <td className={`status ${request.status.toLowerCase()}`}>{request.status}</td>
              <td>
                {request.status === 'Pending' && (
                  <>
                    <button onClick={() => handleApprove(request.id)} className="btn approve-btn">
                      Approve
                    </button>
                    <button onClick={() => handleReject(request.id)} className="btn reject-btn">
                      Reject
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageLeave;
