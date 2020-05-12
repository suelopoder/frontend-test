import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders without crash', () => {
  render(<App />);
});

test('renders main controls', () => {
  const { getByText, getByTestId } = render(<App />);
  const uploadText = getByText(/upload/i);
  expect(uploadText).toBeInTheDocument();
  const searchText = getByTestId(/search/i);
  expect(searchText).toBeInTheDocument();
});
