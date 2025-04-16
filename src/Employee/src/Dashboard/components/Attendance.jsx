import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Attendance.css';
import { BASE_URL } from '../../../../utils/constants';

const Attendance = () => {
  const [isCheckIn, setIsCheckIn] = useState(true);
  // const [time, setTime] = useState(new Date().toLocaleTimeString());
  const [checkInTime, setCheckInTime] = useState('');
  const [checkOutTime, setCheckOutTime] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Always use today's date for display
  const todayDate = new Date().toISOString().split('T')[0];
  
  // Update the clock time every second


  // useEffect(() => {
  //   const getData = () =>{
  //     const token = localStorage.getItem('token')
  //     try {
  //       const response = axios.get(`${BASE_URL}/attendance/todayAllEmployee`,{
  //         headers:{
  //           Authorization: `Bearer ${token}`
  //         }
  //       });

  //       console.log('attendace response', response)
  //     } catch (err) {
  //       console.log('error fetching attendance:', err)
  //     }
  //   } 
  //   getData();
  // }, [])
  
  
  // Function to safely format ISO date string to time
  const formatTimeFromISO = (isoString) => {
    if (!isoString) return '';
    
    try {
      // Handle both full ISO strings and time strings
      if (isoString.includes('T')) {
        return isoString.split('T')[1].substring(0, 8);
      } else {
        return isoString;
      }
    } catch (err) {
      console.error('Error formatting time:', err);
      return isoString; // Return original if formatting fails
    }
  };
  
  // Function to check if user has already checked in/out TODAY ONLY
  const checkTodayAttendance = async () => {
    const token = localStorage.getItem('token');
    
    try {
      const response = await axios.get(`${BASE_URL}/attendance/today`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      console.log('Today attendance response:', response.data);
      const { record } = response.data;
      
      // Only process record if it's from today
      if (record && record.date) {
        // Extract the date part to compare with today
        let recordDate;
        if (typeof record.date === 'string' && record.date.includes('T')) {
          recordDate = record.date.split('T')[0];
        } else {
          recordDate = record.date;
        }
        
        // Only use the record if it's from today
        if (recordDate === todayDate) {
          // Update check-in time if exists
          if (record.checkIn) {
            setCheckInTime(formatTimeFromISO(record.checkIn));
            setIsCheckIn(false); // Show check-out button
          }
          
          // Update check-out time if exists
          if (record.checkOut) {
            setCheckOutTime(formatTimeFromISO(record.checkOut));
            setIsCheckIn(true); // Reset to check-in for visual consistency
          }
        } else {
          console.log('Record found but not from today. Today:', todayDate, 'Record date:', recordDate);
          // Reset times for a new day
          setCheckInTime('');
          setCheckOutTime('');
          setIsCheckIn(true);
        }
      } else {
        // No record found, reset times
        setCheckInTime('');
        setCheckOutTime('');
        setIsCheckIn(true);
      }
    } catch (err) {
      console.error('Error checking today\'s attendance:', err);
      // Reset on error
      setCheckInTime('');
      setCheckOutTime('');
      setIsCheckIn(true);
    }
  };


  
  const handleAttendance = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    const token = localStorage.getItem('token');
    try {
      const response = await axios.post(`${BASE_URL}/attendance/mark`, {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      console.log('Mark attendance response:', response.data);
      const { status, attendance, message } = response.data;
      
      if (attendance) {
        // Only use the record if it's from today
        let recordDate;
        if (attendance.date) {
          if (typeof attendance.date === 'string' && attendance.date.includes('T')) {
            recordDate = attendance.date.split('T')[0];
          } else {
            recordDate = attendance.date;
          }
        }
        
        if (recordDate === todayDate) {
          if (status === 'checkedIn') {
            setCheckInTime(formatTimeFromISO(attendance.checkIn));
            setIsCheckIn(false); // Change button to "Check-Out"
          } else if (status === 'checkedOut') {
            setCheckOutTime(formatTimeFromISO(attendance.checkOut));
            setIsCheckIn(true); // Reset to "Check-In" (will be disabled)
          }
        }
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Error marking attendance');
      console.error('Error marking attendance:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // const updateTime = () => {
    //   setTime(new Date().toLocaleTimeString());
    // };
    // const intervalId = setInterval(updateTime, 1000);
    
    // Check existing attendance record for today when component mounts
    checkTodayAttendance();
    
    // return () => {
    //   clearInterval(intervalId);
    // };
  }, [handleAttendance]);
  
  // Determine if the button should be disabled
  const isButtonDisabled = isLoading || (checkInTime && checkOutTime);
  
  return (
    <div className="attendance-page">
      <h2>Mark Attendance</h2>
      
      {error && <div className="error-message">{error}</div>}
      
      <form className="attendance-form">
        {/* <div className="time-input">
          <label>{isCheckIn ? "Check-In:" : "Check-Out:"}</label>
          <input
            className="time"
            value={time}
            name={isCheckIn ? "checkIn" : "checkOut"}
            readOnly
          />
        </div> */}
        <button 
          type="submit" 
          onClick={handleAttendance}
          disabled={isButtonDisabled}
          className={isButtonDisabled ? "button-disabled" : ""}
        >
          {isLoading ? "Processing..." : isCheckIn ? "Check-In" : "Check-Out"}
        </button>
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
              <td>{todayDate}</td>
              <td>{checkInTime || "-"}</td>
              <td>{checkOutTime || "-"}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Attendance;