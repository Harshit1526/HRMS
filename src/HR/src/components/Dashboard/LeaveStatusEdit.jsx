import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../../../../utils/constants'

const LeaveStatusEdit = () => {
    const navigate = useNavigate()
    const location = useLocation();
    const data = location.state;

    const [formData, setFormData] = useState({
        status: 'pending'
    }); 

    const handleChange = (e) =>{
        setFormData( prev => ({...prev, [e.target.name]: e.target.value })  ) 
    }

    const handleSumit = async (e) =>{
        e.preventDefault();
        const token = localStorage.getItem('token')
        try{
            console.log('form', formData)
            const response = await axios.put(`${BASE_URL}/leaves/update/${data?.id}`, formData ,{
                headers:{
                    Authorization: `Bearer ${token}`
                }
            });
            console.log('response', response);

            if(response?.status == 200 || response?.status == 201){
                alert('Form updated successfully!');
                navigate('/hr_dashboard/leave')
            }
        }catch(err){
            console.log('error', err)
        }
    }
  return (
    <>
             <form className="leave-form" style={{ "margin-top": '70px'  }} onSubmit={handleSumit} >
          <input
            type="text"
            name="employeeId"
            value={data.employeeId}
            // onChange={handleInputChange}
            placeholder="Employee ID"
            // required
          />
          <input
            type="text"
            name="employeeName"
            value={data?.User?.name}
            // onChange={handleInputChange}
            placeholder="Employee Name"
            required
          />
          <input
            type="text"
            name="reason"
            value={data?.reason}
            // onChange={handleInputChange}
            placeholder="Employee Name"
            required
          />
  
          <label htmlFor='startDate' >Start Date</label>
          <input
            id='startDate'
            type="date"
            name="startDate"
            value={data?.startDate}
            // onChange={handleInputChange}
            // required
          />
          <label htmlFor='endDate' >End Date</label>
          <input
            type="date"
            name="endDate"
            id="endDate"
            value={data?.endDate}
            // onChange={handleInputChange}
            // required
          />
        <select name="status" value={formData?.status} onChange={handleChange}  required>
            <option value=" ">select</option>
            <option value="Rejected">Reject</option>
            <option value="Approved" >Accept</option>
          </select>
          <button type="submit">Update Request</button>
        </form>
    </>
  )
}

export default LeaveStatusEdit