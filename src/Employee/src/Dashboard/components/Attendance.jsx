import React, { useState } from 'react';
import './Attendance.css';

const initialAttendance = [
  { date: '2024-08-22', status: 'Present', employeeId: 1, checkIn: '09:00 AM', checkOut: '05:00 PM' },
  { date: '2024-08-22', status: 'Absent', employeeId: 2, checkIn: '-', checkOut: '-' },
  { date: '2024-08-22', status: 'Present', employeeId: 3, checkIn: '10:00 AM', checkOut: '06:00 PM' },
];

const Attendance = () => {
  const [attendanceRecords, setAttendanceRecords] = useState(initialAttendance);
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [status, setStatus] = useState('Present');
  const [checkIn, setCheckIn] = useState({ time: '09:00', period: 'AM' });
  const [checkOut, setCheckOut] = useState({ time: '05:00', period: 'PM' });
  const [formVisible, setFormVisible] = useState(false);
  const [isCheckIn, setIsCheckIn] = useState(false)

  const handleAddAttendance = (e) => {
    e.preventDefault();
    const newRecord = {
      id: Date.now(),
      date: new Date().toISOString().split('T')[0],
      status,
      employeeId: parseInt(selectedEmployee.split('|')[0]),
      employeeName: selectedEmployee.split('|')[1],
      // checkIn: `${checkIn.time} ${checkIn.period}`,
      // checkOut: `${checkOut.time} ${checkOut.period}`,
      checkIn: new Date().toLocaleTimeString(),
      checkOut: new Date().toLocaleTimeString(),
    };
    setAttendanceRecords([...attendanceRecords, newRecord]);
    resetForm();
  };


  const handleStatusChange = (e) => {
    setStatus(e.target.value);
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

  const handleCheckIn = (e) =>{
    e.preventDefault();
    if(isCheckIn){
      const newRecord = {
        id: Date.now(),
        date: new Date().toISOString().split('T')[0],
        status,
        employeeId: parseInt(selectedEmployee.split('|')[0]),
        employeeName: selectedEmployee.split('|')[1],
        checkIn: new Date().toLocaleTimeString(),
        checkOut: new Date().toLocaleTimeString(),
      };
      setAttendanceRecords([...attendanceRecords, newRecord]);
    }
    setIsCheckIn(!isCheckIn);
  }

  // const resetForm = () => {
  //   setStatus('Present');
  //   setCheckIn({ time: '09:00', period: 'AM' });
  //   setCheckOut({ time: '05:00', period: 'PM' });
  //   setFormVisible(false);
  // };

  return (
    <div className="attendance-page">
      <h2>Mark Attendance</h2>
      
        <form className="attendance-form" onSubmit={handleAddAttendance}>
          <div className="time-input">
            <label> {isCheckIn ? "Check-Out:" : "Check-In:"} </label>
            <input
            className='time'
              // type="time"
              value={new Date().toLocaleTimeString()}
              onChange={(e) => handleTimeChange(e, setCheckIn, checkIn)}
             readOnly
            />

          </div>
          <button type="submit" onClick={handleCheckIn}>{isCheckIn ? "Check-Out:" : "Check-In"}</button>
        </form>

      <div className="attendance-history">
        <h3>Attendance History</h3>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Status</th>
              <th>Check-In</th>
              <th>Check-Out</th>
            </tr>
          </thead>
          <tbody>
            {attendanceRecords.map((record) => (
              <tr key={record.id}>
                <td>{record.date}</td>
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
