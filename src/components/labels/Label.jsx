"use client";

import React from 'react';
import EditableLabel from '../editableLabel/EditableLabel';
import './styles.css';

export const Label = ({
  selectedMin,
  selectedMax,
  isEditable,
  handleMinBlur,
  handleMaxBlur,
  minPosition,
  maxPosition,
}) => {
  const nearPoints = Math.abs(selectedMax - selectedMin) < 10;
  return (
    <div className="range-labels">
      <EditableLabel
        initialValue={selectedMin}
        isEditable={isEditable}
        handleBlur={handleMinBlur}
        position={minPosition - 3}
        nearPoints={nearPoints}
      />
      <EditableLabel
        initialValue={selectedMax}
        isEditable={isEditable}
        handleBlur={handleMaxBlur}
        position={maxPosition}
      />
    </div>
  );
};