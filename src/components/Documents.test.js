import React from 'react';
import { render, screen } from '@testing-library/react';
import Documents from './Documents';

test('empty array renders no list', () => {
  const { getByText, queryByRole } = render(<Documents documents={[]} />);
  const uploadText = getByText(/No documents yet/i);
  expect(uploadText).toBeInTheDocument();
  expect(screen.queryByText(/Total size/i)).toBeNull();
  expect(queryByRole('list')).toBeNull();
});

test('list of one elem reders a doc', () => {
  const { getByText } = render(<Documents documents={[{ name: 'A doc', size: 8000 }]} />);
  expect(getByText('A doc')).toBeInTheDocument();
});

test('list reders all docs', () => {
  const { getByText } = render(<Documents documents={[
    { name: 'A doc', size: 8000 },
    { name: 'Another doc', size: 9000 },
    { name: 'And yet abother doc', size: 10000 },
  ]} />);
  expect(getByText(/Total size/i)).toBeInTheDocument();
  expect(getByText('A doc')).toBeInTheDocument();
  expect(getByText('Another doc')).toBeInTheDocument();
  expect(getByText('And yet abother doc')).toBeInTheDocument();
});

