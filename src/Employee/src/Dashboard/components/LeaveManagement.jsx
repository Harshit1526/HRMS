import React, { useState, useEffect } from 'react';
import './LeaveManagement.css';
import axios from 'axios';
import {BASE_URL} from '../../../../utils/constants'

const LeaveManagement = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [leaveRequestsRecord, setLeaveRequestsRecord] = useState([]);
  const [formVisible, setFormVisible] = useState(false);


  useEffect(()=>{

    const getData = async() =>{
      const token = localStorage.getItem('token');

      const employeeId = localStorage.getItem('id')
      console.log('id', employeeId)
        try {
          const response = await axios.get(`${BASE_URL}/leaves/request/${employeeId}`, {headers:{
            Authorization: `Bearer ${token}`
          }});
          console.log('response', response);
          setLeaveRequestsRecord(response.data)
        } catch (error) {
          console.log("error while getting: ", error)
        }
    }
    getData();
  },[])

  const handleAddLeaveRequest = async (e) => {
    e.preventDefault();
    // const newLeaveRequest = {
    //   ...newRequest,
    //   id: Date.now(), // Use timestamp as unique ID
    // };
    // setLeaveRequests([...leaveRequests, newLeaveRequest]);
    // setFormVisible(false);
    // setNewRequest({
    //   type: 'Sick Leave',
    //   startDate: '',
    //   endDate: '',
    //   status: 'Pending'
    // });

    const token = localStorage.getItem('token')

    try {
      console.log('newrequest', leaveRequests)
      const response = await axios.post(`http://localhost:5000/api/leaves/apply`, leaveRequests,{
        headers:{
          Authorization: `Bearer ${token}`,
        } 
      } );

      console.log('response: ', response);
      if(response.status == 201 || response.status == 200){
        alert('Request Submitted Successfully!')
      }
    } catch (err) {
      alert(`error:  ${err.response.data.message}`)
      console.log('error: ', err.response.data.message)
    }


  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLeaveRequests({ ...leaveRequests, [name]: value });
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
          <select name="reason" value={leaveRequests.reason} onChange={handleInputChange} required>
            <option value="">Select reason</option>
            <option value="Sick Leave">Sick Leave</option>
            <option value="Annual Leave">Annual Leave</option>
            <option value="Casual Leave">Casual Leave</option>
          </select>
          <input
            type="date"
            name="startDate"
            value={leaveRequests.startDate}
            onChange={handleInputChange}
            required
          />
          <input
            type="date"
            name="endDate"
            value={leaveRequests.endDate}
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
            {leaveRequestsRecord?.map((request) => (
              <tr key={request.id}>
                <td>{request.reason}</td>
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
