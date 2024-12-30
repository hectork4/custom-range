import React from 'react';
import useEditableValue from '../../hooks/useEditableLabel';

const EditableLabel = ({ initialValue, isEditable, handleBlur, position, nearPoints = null }) => {
  const { isEditing, value, handleClick, handleChange, onBlur } = useEditableValue(
    initialValue,
    handleBlur
  );

  const style = {
    left: `${position}%`,
    ...(nearPoints && { top: '15px' }),
  };


  return (
    <div className="label-wrapper" style={style}>
      {isEditing && isEditable ? (
        <input
          type="number"
          value={value}
          onChange={handleChange}
          onBlur={onBlur}
          autoFocus
        />
      ) : (
        <span onClick={handleClick}>{initialValue}</span>
      )}
    </div>
  );
};

export default EditableLabel;