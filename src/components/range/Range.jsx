"use client";

import React from 'react';
import useRange from '../../hooks/useRange';
import './styles.css';
import { Label } from '../labels/Label';

const Range = ({ min, max, rangeValues = null }) => {
  const {
    rangeRef,
    selectedMin,
    selectedMax,
    handleMouseMove,
    handleMouseUp,
    handleMouseDown,
    handleMinBlur,
    handleMaxBlur
  } = useRange({ min, max, rangeValues });

  const minPosition = ((selectedMin - min) / (max - min)) * 100;
  const maxPosition = ((selectedMax - min) / (max - min)) * 100;

  return (
    <div
      className="range"
      ref={rangeRef}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <Label
        selectedMin={selectedMin}
        selectedMax={selectedMax}
        isEditable={!rangeValues}
        handleMinBlur={handleMinBlur}
        handleMaxBlur={handleMaxBlur}
        minPosition={minPosition}
        maxPosition={maxPosition}
      />
      <div className="range-slider">
        <div
          className="range-bullet min"
          role="slider"
          aria-label="min"
          style={{ left: `${minPosition}%` }}
          onMouseDown={handleMouseDown('min')}
        />
        <div
          className="range-bullet max"
          role="slider"
          aria-label="max"
          style={{ left: `${maxPosition}%` }}
          onMouseDown={handleMouseDown('max')}
        />
      </div>
    </div>
  );
};

export default Range;