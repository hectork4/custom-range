import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Label } from '../components/labels/Label';

describe('Label Component', () => {
  it('renders correctly with initial min and max values', () => {
    const { getByText } = render(
      <Label selectedMin={0} selectedMax={100} isEditable={true} handleMinBlur={() => {}} handleMaxBlur={() => {}} />
    );
    expect(getByText('0')).toBeInTheDocument();
    expect(getByText('100')).toBeInTheDocument();
  });

  it('allows user to edit min value by clicking on label', () => {
    const handleMinBlur = jest.fn();
    const { getByText, getByRole } = render(
      <Label selectedMin={0} selectedMax={100} isEditable={true} handleMinBlur={handleMinBlur} handleMaxBlur={() => {}} />
    );
    const minLabel = getByText('0');
    fireEvent.click(minLabel);
    const input = getByRole('spinbutton');
    fireEvent.change(input, { target: { value: '20' } });
    fireEvent.blur(input);
    expect(handleMinBlur).toHaveBeenCalledWith('20')
  });

  it('allows user to edit max value by clicking on label', () => {
    const handleMaxBlur = jest.fn();
    const { getByText, getByRole } = render(
      <Label selectedMin={0} selectedMax={100} isEditable={true} handleMinBlur={() => {}} handleMaxBlur={handleMaxBlur} />
    );
    const maxLabel = getByText('100');
    fireEvent.click(maxLabel);
    const input = getByRole('spinbutton');
    fireEvent.change(input, { target: { value: 80 } });
    fireEvent.blur(input);
    expect(handleMaxBlur).toHaveBeenCalledWith('80');
  });

  it('does not allow editing when isEditable is false', () => {
    const { getByText, queryByRole } = render(
      <Label selectedMin={0} selectedMax={100} isEditable={false} handleMinBlur={() => {}} handleMaxBlur={() => {}} />
    );
    const minLabel = getByText('0');
    fireEvent.click(minLabel);
    expect(queryByRole('spinbutton')).not.toBeInTheDocument();
  });

  it('updates min value when blur is triggered with a valid value', () => {
    const handleMinBlur = jest.fn();
    const { getByText, getByRole } = render(
      <Label selectedMin={0} selectedMax={100} isEditable={true} handleMinBlur={handleMinBlur} handleMaxBlur={() => {}} />
    );
    
    const minLabel = getByText('0');
    fireEvent.click(minLabel);
    
    const input = getByRole('spinbutton');
    fireEvent.change(input, { target: { value: '25' } });
    fireEvent.blur(input);
    
    expect(handleMinBlur).toHaveBeenCalledWith('25');
  });
});