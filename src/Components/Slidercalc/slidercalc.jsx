import React, { useState } from 'react';
import './slidercalc.css';

const ModernSlider = ({ label, min = 0, max = 100, step = 1, unit = "" }) => {
  const [value, setValue] = useState(min);

  // Calculate percentage for the active track background fill
  const calculatePercentage = () => {
    return ((value - min) / (max - min)) * 100;
  };

  const handleInputChange = (e) => {
    // Allows typing or deleting numbers without breaking the input
    const val = e.target.value === '' ? min : Number(e.target.value);
    if (val >= min && val <= max) {
      setValue(val);
    }
  };

  return (
    <div className="slidercalc-container">
      <label className="slidercalc-label">{label}</label>
      
      {/* Centered Value Box */}
      <div className="slidercalc-value-box">
        <input 
          type="number" 
          className="slidercalc-value-input" 
          value={value} 
          onChange={handleInputChange}
          min={min}
          max={max}
        />
        {unit && <span className="slidercalc-value-unit">{unit}</span>}
      </div>

      {/* Modernized Slider */}
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
        style={{
          background: `linear-gradient(to right, #00d2ff 0%, #00d2ff ${calculatePercentage()}%, rgba(255, 255, 255, 0.1) ${calculatePercentage()}%, rgba(255, 255, 255, 0.1) 100%)`
        }}
        className="slidercalc-slider"
      />
    </div>
  );
};

export default ModernSlider;