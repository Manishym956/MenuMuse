import React, { useState } from 'react';
import UploadButton from '../components/UploadButton';
import LoadingScreen from '../components/LoadingScreen';
import Tesseract from 'tesseract.js';

const Home = () => {
  const [image, setImage] = useState(null);
  const [ocrText, setOcrText] = useState('');
  const [loading, setLoading] = useState(false);

  const handleImageSelected = (file) => {
    setImage(file);
    setOcrText('');
    setLoading(true);
    Tesseract.recognize(file, 'eng')
      .then(({ data: { text } }) => {
        setOcrText(text);
      })
      .finally(() => setLoading(false));
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '4rem' }}>
      <h1>MenuMuse</h1>
      <p>Your AI muse for food choices</p>
      <UploadButton onImageSelected={handleImageSelected} />
      {loading && <LoadingScreen />}
      {ocrText && (
        <div style={{ marginTop: '2rem', whiteSpace: 'pre-wrap', textAlign: 'left', maxWidth: 500, margin: '2rem auto' }}>
          <h3>Detected Menu Text:</h3>
          <div style={{ background: '#f9f9f9', padding: '1rem', borderRadius: '8px' }}>{ocrText}</div>
        </div>
      )}
    </div>
  );
};

export default Home; 