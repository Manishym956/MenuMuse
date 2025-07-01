import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Result from './pages/Result';
import './App.css'

const App = () => {
  return (
    <Router>
      <nav style={{ display: 'flex', gap: '1rem', justifyContent: 'center', margin: '2rem 0' }}>
        <Link to="/">Home</Link>
        <Link to="/result">Result</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/result" element={<Result />} />
      </Routes>
    </Router>
  );
};

export default App;
