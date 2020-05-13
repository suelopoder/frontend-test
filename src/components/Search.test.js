import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Search from './Search';

test('current query should be rendered', () => {
  const { getByLabelText } = render(
    <Search query="docs" />
  );
  const input = getByLabelText('Search documents');
  expect(input.value).toBe('docs');
});

test('callback should be called on change', () => {
  const onSearch = jest.fn();
  const { getByLabelText } = render(
    <Search query="" onSearch={onSearch} />
  );
  const input = getByLabelText('Search documents');
  fireEvent.change(input, { target: { value: 'docs' } });
  expect(onSearch.mock.calls.length).toBe(1);
});
