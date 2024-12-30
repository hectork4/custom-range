import { useState, useEffect } from 'react';

const useEditableValue = (initialValue, handleBlur) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const handleClick = () => {
    setIsEditing(true);
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const onBlur = () => {
    setIsEditing(false);
    handleBlur(value);
  };

  return {
    isEditing,
    value,
    handleClick,
    handleChange,
    onBlur,
  };
};

export default useEditableValue;