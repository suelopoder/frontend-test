import React from 'react';
import { render, waitForElement, cleanup, fireEvent } from '@testing-library/react';
import App from './App';
import APIMock from './API';

jest.mock('./API');
afterEach(() => {
  APIMock.getDocs.mockClear();
  cleanup();
});

const TEST_ENTRY = { id: '1', name: 'giaconda.png', size: 1024 };

test('renders loading, then fetched list', async () => {
  APIMock.getDocs.mockResolvedValue([TEST_ENTRY]);

  const { getByText, queryByText } = render(<App />);

  await waitForElement(() => getByText(/loading/i));
  await waitForElement(() => getByText(/giaconda/));
  expect(queryByText(/loading/i)).toBe(null);
  APIMock.getDocs.mockClear();
});

test('renders error when fetch failed', async () => {
  APIMock.getDocs.mockResolvedValue(Promise.reject(new Error()));

  const { getByText, queryByText } = render(<App />);

  await waitForElement(() => getByText(/loading/i));
  await waitForElement(() => getByText(/error/i));
  expect(queryByText(/loading/i)).toBe(null);
});

test('search for results should query the API', async () => {
  // mimic and empty result when we have a query
  APIMock.getDocs.mockImplementation(query => query === 'test' ? [] :[TEST_ENTRY]);
  const { getByText, getByLabelText, queryByText } = render(<App />);
  await waitForElement(() => getByText(/giaconda/));

  fireEvent.change(getByLabelText('Search documents'), { target: { value: 'test' } });
  await waitForElement(() => getByText(/loading/i));
  expect(APIMock.getDocs.mock.calls.length).toBe(2);
  expect(queryByText(/giaconda/)).not.toBeInTheDocument();
});

test('deleting a document should remove it from the list', async () => {
  const UGLY_DOC = { id: '2', name: 'ugly.jpg', size: 567 };
  APIMock.getDocs.mockResolvedValue([TEST_ENTRY, UGLY_DOC]);
  // if delete is called, next return should not return UGLY
  APIMock.deleteDoc.mockImplementation(() => {
    APIMock.getDocs.mockResolvedValue([TEST_ENTRY]);
  });

  const { getByText, getAllByRole, queryByText } = render(<App />);
  await waitForElement(() => getByText(/giaconda/));
  expect(queryByText(/ugly/)).toBeInTheDocument();

  // buttons are: upload, delete, delete
  const deleteUglyButton = getAllByRole('button')[2];
  fireEvent.click(deleteUglyButton);

  await waitForElement(() => getByText(/giaconda/));
  expect(queryByText(/ugly/)).not.toBeInTheDocument();
  expect(APIMock.getDocs.mock.calls.length).toBe(2);
});

test('uploading a doc should add it to the list', async () => {
  const NEW_DOC = { id: '2', name: 'brand new.jpg', size: 900 };
  APIMock.getDocs.mockResolvedValue([TEST_ENTRY]);
  // if upload is called, add new doc to the list on next get call
  APIMock.uploadDoc.mockImplementation(() => {
    APIMock.getDocs.mockResolvedValue([TEST_ENTRY, NEW_DOC]);
  });

  const { getByText, getByTestId } = render(<App />);
  await waitForElement(() => getByText(/giaconda/));

  const input = getByTestId('upload-input');
  const file = {
    type: 'image/jpeg',
    name: 'brand new.jpg',
    size: 900,
  }
  fireEvent.change(input, { target: { files: [file] } });

  await waitForElement(() => getByText(/brand new/));
});