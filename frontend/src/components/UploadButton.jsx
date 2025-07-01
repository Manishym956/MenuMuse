import React from 'react';

const UploadButton = ({ onImageSelected }) => {
  const handleChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      onImageSelected(e.target.files[0]);
    }
  };

  return (
    <input
      type="file"
      accept="image/*"
      onChange={handleChange}
      style={{ padding: '1rem', borderRadius: '8px', background: '#eee', border: 'none' }}
    />
  );
};

export default UploadButton; 