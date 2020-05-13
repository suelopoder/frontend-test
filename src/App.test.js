import React from 'react';
import { render, screen, waitForElement, cleanup, act } from '@testing-library/react';
import App from './App';
import APIMock from './API';

jest.mock('./API');

afterEach(cleanup);

test('updating filter should return less results', async () => {
  const fakeResponse = [{ id: '1', name: 'giaconda', size: 1024 }];
  APIMock.getDocs.mockResolvedValue(fakeResponse);

  render(<App />);

  await waitForElement(() => screen.getByText(/giaconda/));
});