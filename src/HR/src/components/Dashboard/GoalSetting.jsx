import React, { useState } from 'react';
import { FaPlusCircle } from 'react-icons/fa';

const GoalSetting = () => {
  const [goals, setGoals] = useState([]);
  const [newGoal, setNewGoal] = useState({ title: '', milestone: '', deadline: '' });

  const handleAddGoal = () => {
    setGoals([...goals, newGoal]);
    setNewGoal({ title: '', milestone: '', deadline: '' });
  };

  return (
    <div className="goal-setting">
      <h2>SMART Goal Creation & Tracking</h2>
      <div className="goal-form">
        <input
          type="text"
          placeholder="Goal Title"
          value={newGoal.title}
          onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Milestone"
          value={newGoal.milestone}
          onChange={(e) => setNewGoal({ ...newGoal, milestone: e.target.value })}
        />
        <input
          type="date"
          value={newGoal.deadline}
          onChange={(e) => setNewGoal({ ...newGoal, deadline: e.target.value })}
        />
        <button onClick={handleAddGoal}>
          <FaPlusCircle /> Add Goal
        </button>
      </div>
      
      <div className="goal-list">
        {goals.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Goal</th>
                <th>Milestone</th>
                <th>Deadline</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {goals.map((goal, index) => (
                <tr key={index}>
                  <td>{goal.title}</td>
                  <td>{goal.milestone}</td>
                  <td>{goal.deadline}</td>
                  <td>In Progress</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No goals set yet.</p>
        )}
      </div>
    </div>
  );
};

export default GoalSetting;
