import React, { useState } from 'react';
import './Performance.css';
import { FaBullseye, FaComments, FaAward } from 'react-icons/fa';
import GoalSetting from './GoalSetting';
import ReviewsFeedback from './ReviewsFeedback';
import Appraisals from './Appraisals';

const PerformanceManagement = () => {
  const [activeTab, setActiveTab] = useState('goals');

  return (
    <div className="performance-management">
      <nav className="performance-nav">
        <button
          className={activeTab === 'goals' ? 'active' : ''}
          onClick={() => setActiveTab('goals')}
        >
          <FaBullseye className="icon" /> Goal Setting
        </button>
        <button
          className={activeTab === 'reviews' ? 'active' : ''}
          onClick={() => setActiveTab('reviews')}
        >
          <FaComments className="icon" /> Reviews & Feedback
        </button>
        <button
          className={activeTab === 'appraisals' ? 'active' : ''}
          onClick={() => setActiveTab('appraisals')}
        >
          <FaAward className="icon" /> Appraisals
        </button>
      </nav>

      <main className="performance-content">
        {activeTab === 'goals' && <GoalSetting />}
        {activeTab === 'reviews' && <ReviewsFeedback />}
        {activeTab === 'appraisals' && <Appraisals />}
      </main>
    </div>
  );
};

export default PerformanceManagement;
