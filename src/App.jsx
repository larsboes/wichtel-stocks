import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Reveal from './pages/Reveal';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-900 text-white overflow-hidden relative">
        {/* Background effects can go here */}
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/reveal/:hash" element={<Reveal />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
