import React from 'react';

const ResultCard = ({ dish, reason }) => (
  <div style={{ border: '1px solid #eee', borderRadius: '12px', padding: '2rem', margin: '2rem auto', maxWidth: 400 }}>
    <h2 style={{ fontWeight: 'bold', fontSize: '2rem' }}>{dish || 'Dish Name'}</h2>
    <p>{reason || 'Reason for recommendation will appear here.'}</p>
  </div>
);

export default ResultCard; 