

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

export default function ToggleButton({ isActive, onToggle })  {
    const toggleStyles = {
      display: 'inline-block',
      width: '60px',
      height: '30px',
      borderRadius: '15px',
      backgroundColor: isActive ? '#FFA500' : '#FFFFFF',
      position: 'relative',
      cursor: 'pointer',
      margin:'5px',
    };
  
    const handleToggle = () => {
      onToggle(!isActive);
    };
  
    const knobStyles = {
      position: 'absolute',
      top: '2px',
      left: isActive ? '30px' : '2px',
      width: '26px',
      height: '26px',
      borderRadius: '50%',
      backgroundColor: isActive ? '#FFFFFF' : '#FFA500',
      transition: 'left 0.5s',
    };
  
    return (
      <div style={toggleStyles} onClick={handleToggle}>
        <div style={knobStyles}></div>
      </div>
    );
  };
  