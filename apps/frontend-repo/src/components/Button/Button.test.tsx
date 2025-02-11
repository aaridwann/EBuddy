import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import '@testing-library/jest-dom';
import UpdateButton from './Button';

describe('UpdateButton Component', () => {
  it('should renders button with correct text', () => {
    render(<UpdateButton title="Update" onClick={jest.fn()} loading={false} error={null} />);
    expect(screen.getByRole('button', { name: /update/i })).toBeInTheDocument();
  });

  it('should disables button when loading', () => {
    render(<UpdateButton title="Update" onClick={jest.fn()} loading error={null} />);
    expect(screen.getByRole('button')).toBeDisabled();
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('should calls onClick handler when clicked', () => {
    const handleClick = jest.fn();
    render(<UpdateButton title="Update" onClick={handleClick} loading={false} error={null} />);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should shows error message when error is present', () => {
    render(<UpdateButton title="Update" onClick={jest.fn()} loading={false} error="An error occurred" />);
    expect(screen.getByText(/an error occurred/i)).toBeInTheDocument();
  });
});
