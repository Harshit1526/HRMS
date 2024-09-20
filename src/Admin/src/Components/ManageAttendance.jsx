import React, { useState, useEffect } from 'react';
import './Attendance.css';

const ManageAttendance = () => {
  const [attendanceData, setAttendanceData] = useState([]);

  useEffect(() => {
    // Simulating a fetch request for attendance data
    const fetchAttendance = async () => {
      const data = [
        { id: 1, name: 'Alice Johnson', date: '2024-09-01', status: 'Present' },
        { id: 2, name: 'Bob Smith', date: '2024-09-01', status: 'Absent' },
        { id: 3, name: 'Charlie Brown', date: '2024-09-01', status: 'Present' },
        { id: 4, name: 'Diana Ross', date: '2024-09-01', status: 'Late' },
      ];
      setAttendanceData(data);
    };
    fetchAttendance();
  }, []);

  const handleStatusChange = (id, newStatus) => {
    const updatedData = attendanceData.map(item =>
      item.id === id ? { ...item, status: newStatus } : item
    );
    setAttendanceData(updatedData);
  };

  return (
    <div className="manage-attendance-container">
      <h2>Manage Attendance</h2>
      <p>Admin can approve, correct, or change attendance statuses here.</p>
      <div className="attendance-table-container">
        <table className="attendance-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {attendanceData.map((attendance) => (
              <tr key={attendance.id}>
                <td>{attendance.name}</td>
                <td>{attendance.date}</td>
                <td>
                  <div className="status-buttons">
                    <button
                      onClick={() => handleStatusChange(attendance.id, 'Present')}
                      className={`btn status-btn ${attendance.status === 'Present' ? 'active' : ''}`}
                    >
                      Present
                    </button>
                    <button
                      onClick={() => handleStatusChange(attendance.id, 'Absent')}
                      className={`btn status-btn ${attendance.status === 'Absent' ? 'active' : ''}`}
                    >
                      Absent
                    </button>
                    <button
                      onClick={() => handleStatusChange(attendance.id, 'Late')}
                      className={`btn status-btn ${attendance.status === 'Late' ? 'active' : ''}`}
                    >
                      Late
                    </button>
                  </div>
                </td>
                <td>
                  <button
                    onClick={() => handleStatusChange(attendance.id, 'Approved')}
                    className="btn approve-btn"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleStatusChange(attendance.id, 'Corrected')}
                    className="btn correct-btn"
                  >
                    Correct
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageAttendance;
