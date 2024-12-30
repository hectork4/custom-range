import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Range from '../components/range/Range';

describe('Range Component', () => {
  beforeEach(() => {
    HTMLElement.prototype.getBoundingClientRect = jest.fn(() => ({
      left: 0,
      width: 200,
      right: 200,
      top: 0,
      bottom: 50,
      height: 50,
    }));
  });

  it('renders correctly with initial min and max values', () => {
    const { getByText } = render(<Range min={0} max={100} />);
    expect(getByText('0')).toBeInTheDocument();
    expect(getByText('100')).toBeInTheDocument();
  });

  it('updates the minimum value when min bullet is dragged', () => {
    const { getByRole } = render(<Range min={0} max={100} />);
    const rangeContainer = getByRole('slider', { name: 'min' }).parentElement;

    fireEvent.mouseDown(getByRole('slider', { name: 'min' }));
    fireEvent.mouseMove(rangeContainer, { clientX: 60 });
    fireEvent.mouseUp(rangeContainer);

    const minBullet = getByRole('slider', { name: 'min' });
    expect(minBullet.style.left).toBe('30%');
  });

  it('updates the maximum value when max bullet is dragged', () => {
    const { getByRole } = render(<Range min={0} max={100} />);
    const rangeContainer = getByRole('slider', { name: 'max' }).parentElement;

    fireEvent.mouseDown(getByRole('slider', { name: 'max' }));
    fireEvent.mouseMove(rangeContainer, { clientX: 140 });
    fireEvent.mouseUp(rangeContainer);

    const maxBullet = getByRole('slider', { name: 'max' });
    expect(maxBullet.style.left).toBe('70%');
  });

  it('snaps to closest value in rangeValues', () => {
    const rangeValues = [0, 25, 50, 75, 100];
    const { getByRole } = render(<Range min={0} max={100} rangeValues={rangeValues} />);
    const rangeContainer = getByRole('slider', { name: 'min' }).parentElement;

    fireEvent.mouseDown(getByRole('slider', { name: 'min' }));
    fireEvent.mouseMove(rangeContainer, { clientX: 85 });
    fireEvent.mouseUp(rangeContainer);

    const minBullet = getByRole('slider', { name: 'min' });
    expect(minBullet.style.left).toBe('50%');
  });

  it('updates min value when clicking on the min span', () => {
    const { getByText } = render(<Range min={0} max={100} />);
  
    const minSpan = getByText('0');
    fireEvent.click(minSpan);
  
    expect(minSpan).toHaveTextContent('0');
  });
  
  it('updates max value when clicking on the max span', () => {
    const { getByText } = render(<Range min={0} max={100} />);
  
    const maxSpan = getByText('100');
    fireEvent.click(maxSpan);
  
    expect(maxSpan).toHaveTextContent('100');
  });
  
  it('does not update max value when the value is invalid', () => {
    const rangeValues = [0, 25, 50, 75, 100];
    const { getByText } = render(<Range min={0} max={100} rangeValues={rangeValues} />);
  
    const maxSpan = getByText('100');
  
    fireEvent.click(maxSpan);
    fireEvent.mouseMove(maxSpan, { clientX: 210 });
  
    expect(maxSpan).toHaveTextContent('100');
  });

  it('respects new min and max props on update', () => {
    const { getByText, rerender } = render(<Range min={0} max={100} />);
    expect(getByText('0')).toBeInTheDocument();
    expect(getByText('100')).toBeInTheDocument();
    rerender(<Range min={10} max={90} />);
    expect(getByText('10')).toBeInTheDocument();
    expect(getByText('90')).toBeInTheDocument();
  });
  
  it('does not allow min value to change if not in rangeValues', () => {
    const rangeValues = [0, 25, 50, 75, 100];
    const { getByRole } = render(<Range min={0} max={100} rangeValues={rangeValues} />);
    
    const rangeContainer = getByRole('slider', { name: 'min' }).parentElement;
    
    fireEvent.mouseDown(getByRole('slider', { name: 'min' }));
    fireEvent.mouseMove(rangeContainer, { clientX: 40 });
    fireEvent.mouseUp(rangeContainer);
    
    const minBullet = getByRole('slider', { name: 'min' });
    expect(minBullet.style.left).not.toBe('20%');
  });
  
  it('allows min value to change if it is in rangeValues', () => {
    const rangeValues = [0, 25, 50, 75, 100];
    const { getByRole } = render(<Range min={0} max={100} rangeValues={rangeValues} />);
    
    const rangeContainer = getByRole('slider', { name: 'min' }).parentElement;
    
    fireEvent.mouseDown(getByRole('slider', { name: 'min' }));
    fireEvent.mouseMove(rangeContainer, { clientX: 50 });
    fireEvent.mouseUp(rangeContainer);
    
    const minBullet = getByRole('slider', { name: 'min' });
    expect(minBullet.style.left).toBe('25%');
  });

  it('updates max and min value when clicking on the spans', () => {
    const MAX_VALUE = '100';
    const NEW_MAX_VALUE = '80';
    const MIN_VALUE = '0';
    const NEW_MIN_VALUE = '20';
    const { getByText, getByRole } = render(<Range min={0} max={100} />);
  
    const maxLabel = getByText(MAX_VALUE);
    fireEvent.click(maxLabel);
    let input = getByRole('spinbutton');
    fireEvent.change(input, { target: { value: NEW_MAX_VALUE } });
    fireEvent.blur(input);

    const minLabel = getByText(MIN_VALUE);
    fireEvent.click(minLabel);
    input = getByRole('spinbutton');
    fireEvent.change(input, { target: { value: NEW_MIN_VALUE } });
    fireEvent.blur(input);

    expect(getByText(NEW_MAX_VALUE)).toBeInTheDocument();
    expect(getByText(NEW_MIN_VALUE)).toBeInTheDocument();
  });

  it('does not allow the maximum value to change if it is towards a value larger than it', () => {
    const rangeValues = [0, 25, 50, 75, 100];
    const { getByRole } = render(<Range min={0} max={100} rangeValues={rangeValues} />);
    
    const rangeContainer = getByRole('slider', { name: 'max' }).parentElement;
    
    fireEvent.mouseDown(getByRole('slider', { name: 'max' }));
    fireEvent.mouseMove(rangeContainer, { clientX: 50 });
    fireEvent.mouseUp(rangeContainer);
    fireEvent.mouseMove(rangeContainer, { clientX: 100 });
    fireEvent.mouseUp(rangeContainer);
    
    const maxBullet = getByRole('slider', { name: 'max' });
    expect(maxBullet.style.left).not.toBe('50%');
  });
});
