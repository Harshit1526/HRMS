import React, { useState } from 'react';

const ReviewsFeedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [newFeedback, setNewFeedback] = useState({ employee: '', rating: '', notes: '' });

  const handleAddFeedback = () => {
    setFeedbacks([...feedbacks, newFeedback]);
    setNewFeedback({ employee: '', rating: '', notes: '' });
  };

  return (
    <div className="reviews-feedback">
      <h2>Performance Reviews & Feedback</h2>
      <div className="feedback-form">
        <input
          type="text"
          placeholder="Employee Name"
          value={newFeedback.employee}
          onChange={(e) => setNewFeedback({ ...newFeedback, employee: e.target.value })}
        />
        <input
          type="number"
          placeholder="Rating (1-5)"
          value={newFeedback.rating}
          onChange={(e) => setNewFeedback({ ...newFeedback, rating: e.target.value })}
        />
        <textarea
          placeholder="Notes"
          value={newFeedback.notes}
          onChange={(e) => setNewFeedback({ ...newFeedback, notes: e.target.value })}
        />
        <button onClick={handleAddFeedback}>Submit Feedback</button>
      </div>

      <div className="feedback-list">
        {feedbacks.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Employee</th>
                <th>Rating</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody>
              {feedbacks.map((feedback, index) => (
                <tr key={index}>
                  <td>{feedback.employee}</td>
                  <td>{feedback.rating}</td>
                  <td>{feedback.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No feedback given yet.</p>
        )}
      </div>
    </div>
  );
};

export default ReviewsFeedback;
