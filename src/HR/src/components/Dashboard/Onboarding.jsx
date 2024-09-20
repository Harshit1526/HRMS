import React, { useState } from 'react';
import { FaBriefcase, FaUserCheck, FaTasks } from 'react-icons/fa';
import Modal from './Modal';
import './Onboarding.css';

const Onboarding = () => {
  const [jobs, setJobs] = useState([
    { id: 1, title: 'Software Engineer', location: 'New York', department: 'Engineering', status: 'Active' },
    { id: 2, title: 'Product Manager', location: 'San Francisco', department: 'Product', status: 'Active' },
  ]);
  const [applicants, setApplicants] = useState([
    { id: 1, name: 'John Doe', jobTitle: 'Software Engineer', status: 'Interview Scheduled', appliedDate: '2024-09-15' },
    { id: 2, name: 'Jane Smith', jobTitle: 'Product Manager', status: 'Application Received', appliedDate: '2024-09-16' },
  ]);
  const [tasks, setTasks] = useState([
    { id: 1, task: 'Submit Documents', dueDate: '2024-09-20', status: 'Pending' },
    { id: 2, task: 'Complete Orientation', dueDate: '2024-09-25', status: 'Not Started' },
  ]);

  const [modalContent, setModalContent] = useState(null);

  const handleModalOpen = (type, data) => {
    switch (type) {
      case 'job':
        setModalContent(
          <div>
            <h3>Job Details: {data.title}</h3>
            <p>Location: {data.location}</p>
            <p>Department: {data.department}</p>
            <p>Status: {data.status}</p>
          </div>
        );
        break;
      case 'editJob':
        setModalContent(
          <div>
            <h3>Edit Job: {data.title}</h3>
            <form onSubmit={(e) => handleEditJob(e, data.id)}>
              <label>Job Title:
                <input type="text" name="title" defaultValue={data.title} />
              </label>
              <label>Location:
                <input type="text" name="location" defaultValue={data.location} />
              </label>
              <label>Department:
                <input type="text" name="department" defaultValue={data.department} />
              </label>
              <label>Status:
                <select name="status" defaultValue={data.status}>
                  <option value="Active">Active</option>
                  <option value="Closed">Closed</option>
                  <option value="On Hold">On Hold</option>
                </select>
              </label>
              <button type="submit">Save Changes</button>
            </form>
          </div>
        );
        break;
      case 'interview':
        setModalContent(
          <div>
            <h3>Schedule Interview for {data.name}</h3>
            <form onSubmit={(e) => handleScheduleInterview(e, data.id)}>
              <label>Date:
                <input type="date" name="date" required />
              </label>
              <label>Time:
                <input type="time" name="time" required />
              </label>
              <button type="submit">Schedule</button>
            </form>
          </div>
        );
        break;
      case 'feedback':
        setModalContent(
          <div>
            <h3>Send Feedback for {data.name}</h3>
            <form onSubmit={(e) => handleSendFeedback(e, data.id)}>
              <label>Feedback:
                <textarea name="feedback" rows="4" cols="50" required></textarea>
              </label>
              <button type="submit">Send Feedback</button>
            </form>
          </div>
        );
        break;
      case 'reminder':
        setModalContent(
          <div>
            <h3>Send Reminder for {data.task}</h3>
            <form onSubmit={(e) => handleSendReminder(e, data.id)}>
              <label>Reminder Message:
                <input type="text" name="message" defaultValue={`Reminder: Please complete the task "${data.task}"`} required />
              </label>
              <button type="submit">Send Reminder</button>
            </form>
          </div>
        );
        break;
      default:
        setModalContent(null);
    }
  };

  const handleModalClose = () => {
    setModalContent(null);
  };

  const handleEditJob = (e, id) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const updatedJob = Object.fromEntries(formData);
    setJobs(jobs.map(job => job.id === id ? { ...job, ...updatedJob } : job));
    handleModalClose();
  };

  const handleScheduleInterview = (e, id) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const { date, time } = Object.fromEntries(formData);
    setApplicants(applicants.map(applicant => 
      applicant.id === id ? { ...applicant, status: `Interview on ${date} at ${time}` } : applicant
    ));
    handleModalClose();
  };

  const handleSendFeedback = (e, id) => {
    e.preventDefault();
    // Here you would typically send the feedback to a backend
    console.log(`Feedback sent for applicant ${id}`);
    handleModalClose();
  };

  const handleSendReminder = (e, id) => {
    e.preventDefault();
    // Here you would typically send the reminder to a backend
    console.log(`Reminder sent for task ${id}`);
    handleModalClose();
  };

  return (
    <div className="onboarding-page">
      <section className="job-listings">
        <h2><FaBriefcase /> Current Job Openings</h2>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Job Title</th>
                <th>Location</th>
                <th>Department</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map(job => (
                <tr key={job.id}>
                  <td>{job.title}</td>
                  <td>{job.location}</td>
                  <td>{job.department}</td>
                  <td>{job.status}</td>
                  <td>
                    <button className="action-btn" onClick={() => handleModalOpen('job', job)}>View Details</button>
                    <button className="action-btn" onClick={() => handleModalOpen('editJob', job)}>Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button className="add-btn">Add New Job</button>
      </section>

      <section className="applicant-tracking">
        <h2><FaUserCheck /> Applicant Tracking</h2>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Applicant Name</th>
                <th>Job Title</th>
                <th>Status</th>
                <th>Applied Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {applicants.map(applicant => (
                <tr key={applicant.id}>
                  <td>{applicant.name}</td>
                  <td>{applicant.jobTitle}</td>
                  <td>{applicant.status}</td>
                  <td>{applicant.appliedDate}</td>
                  <td>
                    <button className="action-btn" onClick={() => handleModalOpen('interview', applicant)}>Schedule Interview</button>
                    <button className="action-btn" onClick={() => handleModalOpen('feedback', applicant)}>Send Feedback</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="onboarding-checklist">
        <h2><FaTasks /> New Hire Onboarding Checklist</h2>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Task</th>
                <th>Due Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map(task => (
                <tr key={task.id}>
                  <td>{task.task}</td>
                  <td>{task.dueDate}</td>
                  <td>{task.status}</td>
                  <td>
                    <button className="action-btn" onClick={() => handleModalOpen('reminder', task)}>Send Reminder</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button className="add-btn">Assign New Task</button>
      </section>

      {modalContent && (
        <Modal onClose={handleModalClose}>
          {modalContent}
        </Modal>
      )}
    </div>
  );
};

export default Onboarding;