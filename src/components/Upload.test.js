import React from 'react';
import { render, fireEvent, cleanup, act } from '@testing-library/react';
import Upload from './Upload';

afterEach(cleanup);

const FILE = new File(
  ['(⌐□_□)'],
  'chucknorris.png',
  { type: 'image/png', size: 1000, name: 'chucknorris.png' }
);

test('callback is called when file is valid', () => {
  const onUploadFn = jest.fn();

  const { getByTestId } = render(<Upload onUpload={onUploadFn} getFileError={() => null}/>)
  const input = getByTestId('upload-input');
  act(() => {
    fireEvent.change(input, { target: { files: [FILE] } });
  });

  expect(onUploadFn.mock.calls.length).toBe(1);
});

test('callback is not called and error is shown for when file is invalid', () => {
  const onUploadFn = jest.fn();

  const { getByText, getByTestId } = render(<Upload onUpload={onUploadFn} getFileError={() => 'some error'}/>)
  const input = getByTestId('upload-input');
  act(() => {
    fireEvent.change(input, { target: { files: [FILE] } });
  });

  expect(onUploadFn.mock.calls.length).toBe(0);
  expect(getByText('Valid files are jpeg and png files under 10MB')).toBeInTheDocument();
});

test('error is cleared after a valid file is submitted', () => {
  const getFileError = file => {
    if (file.name === 'chucknorris.png') {
      return 'no chuch';
    }
    return null
  };

  const invalidFile = new File(
    ['(⌐□_□)'],
    'chucknorris.png',
    { type: 'image/png' }
  );
  const { getByText, getByTestId, queryByText } = render(<Upload getFileError={getFileError} onUpload={() => {}}/>)
  const input = getByTestId('upload-input');

  act(() => {
    fireEvent.change(input, { target: { files: [invalidFile] } });
  });

  expect(getByText('Valid files are jpeg and png files under 10MB')).toBeInTheDocument();

  const validFile = new File(
    ['(⌐□_□)'],
    'vandamme.png',
    { type: 'image/png' }
  );

  act(() => {
    fireEvent.change(input, { target: { files: [validFile] } });
  });

  expect(queryByText('Valid files are jpeg and png files under 10MB')).not.toBeInTheDocument();
});
