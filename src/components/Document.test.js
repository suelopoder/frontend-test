import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Document from './Document';

test('renders document data', () => {
  const { getByText } = render(
    <Document
      name="amazing pic.png"
      size="130kb"
    />);
  expect(getByText('amazing pic.png')).toBeInTheDocument();
  expect(getByText('130kb')).toBeInTheDocument();
});

test('callback is called when delete button is clicke', () => {
  const onDelete = jest.fn();
  const { getByText } = render(
    <Document
      name="amazing pic.png"
      size="130kb"
      onDelete={onDelete}
    />);

  fireEvent.click(getByText('delete'));

  expect(onDelete.mock.calls.length).toBe(1);
});
