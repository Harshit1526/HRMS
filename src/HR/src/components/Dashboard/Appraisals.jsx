import React, { useState } from 'react';

const Appraisals = () => {
  const [appraisals, setAppraisals] = useState([]);
  const [newAppraisal, setNewAppraisal] = useState({ employeeId: '', employee: '', appraisal: '', date: '' });

  const handleAddAppraisal = () => {
    setAppraisals([...appraisals, newAppraisal]);
    setNewAppraisal({ employeeId: '', employee: '', appraisal: '', date: '' });
  };

  return (
    <div className="appraisals">
      <h2>Appraisal Management</h2>
      <div className="appraisal-form">
        <input
          type="text"
          placeholder="Employee ID"
          value={newAppraisal.employeeId}
          onChange={(e) => setNewAppraisal({ ...newAppraisal, employeeId: e.target.value })}
        />
        <input
          type="text"
          placeholder="Employee Name"
          value={newAppraisal.employee}
          onChange={(e) => setNewAppraisal({ ...newAppraisal, employee: e.target.value })}
        />
        <input
          type="text"
          placeholder="Appraisal"
          value={newAppraisal.appraisal}
          onChange={(e) => setNewAppraisal({ ...newAppraisal, appraisal: e.target.value })}
        />
        <input
          type="date"
          value={newAppraisal.date}
          onChange={(e) => setNewAppraisal({ ...newAppraisal, date: e.target.value })}
        />
        <button onClick={handleAddAppraisal}>Submit Appraisal</button>
      </div>

      <div className="appraisal-list">
        {appraisals.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Employee ID</th>
                <th>Employee</th>
                <th>Appraisal</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {appraisals.map((appraisal, index) => (
                <tr key={index}>
                  <td>{appraisal.employeeId}</td>
                  <td>{appraisal.employee}</td>
                  <td>{appraisal.appraisal}</td>
                  <td>{appraisal.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No appraisals submitted yet.</p>
        )}
      </div>
    </div>
  );
};

export default Appraisals;
