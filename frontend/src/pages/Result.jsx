import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ResultCard from '../components/ResultCard';
import LoadingScreen from '../components/LoadingScreen';

const BACKEND_URL = 'http://localhost:8000/recommend';

const Result = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const menuText = location.state?.menuText;
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!menuText) {
      navigate('/');
      return;
    }
    setLoading(true);
    fetch(BACKEND_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ menu_text: menuText })
    })
      .then(res => res.json())
      .then(data => setResult(data))
      .catch(() => setResult({ dish: 'Error', reason: 'Could not get recommendation.' }))
      .finally(() => setLoading(false));
  }, [menuText, navigate]);

  return (
    <div className="modern-card">
      {loading && <LoadingScreen />}
      {!loading && result && <div className="result-card"><ResultCard dish={result.dish} reason={result.reason} /></div>}
      {!loading && !result && <p>No recommendation found.</p>}
      <button onClick={() => navigate('/')} style={{ marginTop: '2rem' }}>
        Re-upload
      </button>
    </div>
  );
};

export default Result; 