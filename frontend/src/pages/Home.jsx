import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UploadButton from '../components/UploadButton';
import LoadingScreen from '../components/LoadingScreen';
import Tesseract from 'tesseract.js';

const Home = () => {
  const [image, setImage] = useState(null);
  const [ocrText, setOcrText] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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

  const handleProceed = () => {
    navigate('/result', { state: { menuText: ocrText } });
  };

  return (
    <div className="modern-card">
      <h1>MenuMuse</h1>
      <p>Your AI muse for food choices</p>
      <UploadButton onImageSelected={handleImageSelected} />
      {loading && <LoadingScreen />}
      {ocrText && (
        <div className="ocr-card" style={{ marginTop: '2rem', whiteSpace: 'pre-wrap', textAlign: 'left', width: '100%' }}>
          <h3>Detected Menu Text:</h3>
          <div style={{ background: '#e0f7fa', padding: '1rem', borderRadius: '8px', border: '1px solid #14b8a6' }}>{ocrText}</div>
          <button onClick={handleProceed} style={{ marginTop: '1rem' }}>
            What should I eat?
          </button>
        </div>
      )}
    </div>
  );
};

export default Home; 