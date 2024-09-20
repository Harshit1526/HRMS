import React, { useState,useEffect } from 'react';
import './Attendance.css';

const initialAttendance = [
  { date: '2024-08-22', status: 'Present', employeeId: 1, checkIn: '09:00 AM', checkOut: '05:00 PM' },
  { date: '2024-08-22', status: 'Absent', employeeId: 2, checkIn: '-', checkOut: '-' },
  { date: '2024-08-22', status: 'Present', employeeId: 3, checkIn: '10:00 AM', checkOut: '06:00 PM' },
];

const Attendance = () => {
  const [attendanceRecords, setAttendanceRecords] = useState(initialAttendance);
  const [status, setStatus] = useState('Present');
  const [isCheckIn, setIsCheckIn] = useState(false);
  const [time , setTime] = useState(new Date().toLocaleTimeString())
  const [checkInTime , setCheckInTime] = useState()
  const [checkOutTime , setCheckOutTime] = useState()

  useEffect(() => {
    const time = () => {
      const event = new Date();
      setTime(event.toLocaleTimeString());
    };
    const intervalId = setInterval(time, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);



  const handleCheckIn = (e) =>{
    e.preventDefault(); 
    if(isCheckIn){
      setCheckOutTime(time);
      const newRecord = {
        id: Date.now(),
        date: new Date().toISOString().split('T')[0],
        status,
      };
      setAttendanceRecords([...attendanceRecords, newRecord]);  
      console.log(attendanceRecords)
    }
    else{
      setCheckInTime(time);
      const newRecord = {
        id: Date.now(),
        date: new Date().toISOString().split('T')[0],
        status,
      };
      setAttendanceRecords([...attendanceRecords, newRecord]);  
      console.log(attendanceRecords)
    }
    setIsCheckIn(!isCheckIn);
    console.log("default")
    console.log(attendanceRecords)
  }

console.log(checkInTime)
  return (
    <div className="attendance-page">
      <h2>Mark Attendance</h2>
      
        <form className="attendance-form" >
          <div className="time-input">
            <label> {isCheckIn ? "Check-Out:" : "Check-In:"} </label>
            <input
            className='time'
              value={time}
              onChange={(e) => {
                setTime(e.target.value);
              }}
             readOnly
            />

          </div>
          <button type="submit" onClick={handleCheckIn}>{isCheckIn ? "Check-Out" : "Check-In"}</button>
        </form>

      <div className="attendance-history">
        <h3>Attendance Update</h3>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Check-In</th>
              <th>Check-Out</th>
            </tr>
          </thead>
          <tbody>
            <tr>
                <td>{new Date().toISOString().split('T')[0]}</td>
                <td>{checkInTime ? checkInTime : ""}</td>
                <td>{checkOutTime ? checkOutTime : ""}</td>
              </tr>
          </tbody>
        </table>
      </div>
    </div>
  );

};

export default Attendance;
