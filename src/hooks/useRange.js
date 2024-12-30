import { useRef, useState, useEffect } from 'react';

const useRange = ({ min, max, rangeValues = null }) => {
  const rangeRef = useRef(null);
  const [selectedMin, setSelectedMin] = useState(min);
  const [selectedMax, setSelectedMax] = useState(max);
  const [dragging, setDragging] = useState(null);

  useEffect(() => {
    setSelectedMin(min);
    setSelectedMax(max);
  }, [min, max]);

  const validateMinChange = (value) => {
    const validation = value < min || value >= selectedMax;
    if (rangeValues) {
      return !validation && rangeValues.includes(value);
    }
    return !validation;
  };

  const validateMaxChange = (value) => {
    const validation = value > max || value <= selectedMin;
    if (rangeValues) {
      return !validation && rangeValues.includes(value);
    }
    return !validation;
  };

  const handleMinChange = (value) => {
    if (validateMinChange(value)) {
      setSelectedMin(value);
    }
  };

  const handleMaxChange = (value) => {
    if (validateMaxChange(value)) {
      setSelectedMax(value);
    }
  };

  const calculateNewValue = (offsetX, rectWidth) => {
    let newValue = Math.round((offsetX / rectWidth) * (max - min) + min);
    if (rangeValues) {
      newValue = rangeValues.reduce((prev, curr) =>
        Math.abs(curr - newValue) < Math.abs(prev - newValue) ? curr : prev
      );
    }
    return newValue;
  };

  const handleMouseMove = (e) => {
    if (dragging && rangeRef.current) {
      const rect = rangeRef.current.getBoundingClientRect();
      const offsetX = e.clientX - rect.left;
      const newValue = calculateNewValue(offsetX, rect.width);

      if (dragging === 'min') {
        handleMinChange(newValue);
      } else {
        handleMaxChange(newValue);
      }
    }
  };

  const handleMouseUp = () => {
    setDragging(null);
  };

  const handleMouseDown = (type) => () => {
    setDragging(type);
  };

  const handleBlur = (newValue, type) => {
    if (type === 'min' && validateMinChange(newValue)) {
      setSelectedMin(newValue);
    } else if (type === 'max' && validateMaxChange(newValue)) {
      setSelectedMax(newValue);
    }
    handleMouseDown(type)();
    handleMouseMove({
      clientX: (newValue - min) / (max - min) * rangeRef.current.getBoundingClientRect().width + rangeRef.current.getBoundingClientRect().left,
    });
    handleMouseUp();
  };

  return {
    rangeRef,
    selectedMin,
    selectedMax,
    handleMouseMove,
    handleMouseUp,
    handleMouseDown,
    handleMinBlur: (newMinValue) => handleBlur(newMinValue, 'min'),
    handleMaxBlur: (newMaxValue) => handleBlur(newMaxValue, 'max'),
  };
};

export default useRange;