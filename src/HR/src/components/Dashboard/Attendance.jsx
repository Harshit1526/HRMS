import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../../../utils/constants';
import './Attendance.css';

const initialAttendance = [
  { id: 1, date: '2024-08-22', status: 'Present', employeeId: 1, employeeName: 'Alice Johnson', checkIn: '09:00 AM', checkOut: '05:00 PM' },
  { id: 2, date: '2024-08-22', status: 'Absent', employeeId: 2, employeeName: 'Bob Smith', checkIn: '-', checkOut: '-' },
  { id: 3, date: '2024-08-22', status: 'Present', employeeId: 3, employeeName: 'Charlie Brown', checkIn: '10:00 AM', checkOut: '06:00 PM' },
];

const Attendance = () => {
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [status, setStatus] = useState('Present');
  const [checkIn, setCheckIn] = useState({ time: '09:00', period: 'AM' });
  const [checkOut, setCheckOut] = useState({ time: '05:00', period: 'PM' });
  const [formVisible, setFormVisible] = useState(false);

  const handleAddAttendance = (e) => {
    e.preventDefault();
    const newRecord = {
      id: Date.now(),
      date: new Date().toISOString().split('T')[0],
      status,
      employeeId: parseInt(selectedEmployee.split('|')[0]),
      employeeName: selectedEmployee.split('|')[1],
      checkIn: `${checkIn.time} ${checkIn.period}`,
      checkOut: `${checkOut.time} ${checkOut.period}`,
    };
    setAttendanceRecords([...attendanceRecords, newRecord]);
    resetForm();
  };

  useEffect(() => {
      const getData = async () =>{
        const token = localStorage.getItem('token')
        try {
          const response = await axios.get(`${BASE_URL}/attendance/todayAllEmployee`,{
            headers:{
              Authorization: `Bearer ${token}`
            }
          });
  
          console.log('attendace response', response);
          setAttendanceRecords(response.data)
        } catch (err) {
          console.log('error fetching attendance:', err)
        }
      } 
      getData();
    }, [])


  const handleEmployeeChange = (e) => {
    setSelectedEmployee(e.target.value);
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const toggleFormVisibility = () => {
    setFormVisible(!formVisible);
  };

  const handleTimeChange = (e, setTime, currentTime) => {
    const time = e.target.value;
    let [hours, minutes] = time.split(':');
    hours = parseInt(hours) % 12 || 12;
    const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes}`;
    setTime({ ...currentTime, time: formattedTime });
  };

  const handlePeriodChange = (e, setTime, currentTime) => {
    setTime({ ...currentTime, period: e.target.value });
  };

  const resetForm = () => {
    setSelectedEmployee('');
    setStatus('Present');
    setCheckIn({ time: '09:00', period: 'AM' });
    setCheckOut({ time: '05:00', period: 'PM' });
    setFormVisible(false);
  };

  return (
    <div className="attendance-page">
      <h2>Employee Attendance</h2>
      <button className="toggle-form-btn" onClick={toggleFormVisibility}>
        {formVisible ? 'Hide Attendance Form' : 'Add Attendance'}
      </button>
      {formVisible && (
        <form className="attendance-form" onSubmit={handleAddAttendance}>
          <select value={selectedEmployee} onChange={handleEmployeeChange} required>
            <option value="" disabled>Select Employee</option>
            <option value="1|Alice Johnson">Alice Johnson</option>
            <option value="2|Bob Smith">Bob Smith</option>
            <option value="3|Charlie Brown">Charlie Brown</option>
          </select>
          <select value={status} onChange={handleStatusChange} required>
            <option value="Present">Present</option>
            <option value="Absent">Absent</option>
            <option value="On Leave">On Leave</option>
          </select>
          <div className="time-input">
            <input
              type="time"
              value={checkIn.time}
              onChange={(e) => handleTimeChange(e, setCheckIn, checkIn)}
              required
            />
            <select
              value={checkIn.period}
              onChange={(e) => handlePeriodChange(e, setCheckIn, checkIn)}
              required
            >
              <option value="AM">AM</option>
              <option value="PM">PM</option>
            </select>
          </div>
          <div className="time-input">
            <input
              type="time"
              value={checkOut.time}
              onChange={(e) => handleTimeChange(e, setCheckOut, checkOut)}
              required
            />
            <select
              value={checkOut.period}
              onChange={(e) => handlePeriodChange(e, setCheckOut, checkOut)}
              required
            >
              <option value="AM">AM</option>
              <option value="PM">PM</option>
            </select>
          </div>
          <button type="submit">Add Attendance</button>
        </form>
      )}
      <div className="attendance-history">
        <h3>Attendance History</h3>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Employee</th>
              <th>Status</th>
              <th>Check-In</th>
              <th>Check-Out</th>
            </tr>
          </thead>
          <tbody>
            {attendanceRecords.map((record) => (
              <tr key={record.id}>
                <td>{record.date}</td>
                <td>{record?.User?.name}</td>
                <td className={`status ${record.status.toLowerCase()}`}>{record.status}</td>
                <td>{record.checkIn}</td>
                <td>{record.checkOut}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Attendance;
