import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginSignup from './components/loginSignup/LoginSignup.jsx';
import Dashboard from './components/Dashboard/Dashboard.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginSignup />} />
        <Route path="/dashboard/*" element={<Dashboard />} />
        <Route path="/" element={<LoginSignup />} />
      </Routes>
    </Router>
  );
}

export default App;
