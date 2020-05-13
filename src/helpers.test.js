import { getFileUploadError, getSizeInKb, getTotalSizeInKb } from './helpers';

describe('getFileUploadError', () => {
  const VALID_FILE = {
    name: 'some name.png',
    type: 'image/png',
    size: 1000000, // 1 MB
  };

  test('Files bigger than 10MB are not allowed', () => {
    const result = getFileUploadError({
      ...VALID_FILE,
      size: 10000000000,
    });
    expect(result).toBe('Max size is 10MB');
  });

  test('Files without valid name suffix are not allowed', () => {
    const result = getFileUploadError({
      ...VALID_FILE,
      name: 'some name.txt',
    });
    expect(result).toBe('Valid extensions are .jpg,.jpeg,.png');
  });

  test('Files without valid type are not allowed', () => {
    const result = getFileUploadError({
      ...VALID_FILE,
      type: 'application/json',
    });
    expect(result).toBe('Valid types are jpg and png only');
  });

  test('Simple files are valid', () => {
    const result = getFileUploadError(VALID_FILE);
    expect(result).toBe(null);
  });
});

describe('getSizeInKb', () => {
  test('exactly 1024 b should be 1 kb', () => {
    expect(getSizeInKb(1024)).toBe('1');
  });

  test('less than 1024 b should return <1 kb', () => {
    expect(getSizeInKb(1023)).toBe('<1');
  });
});

describe('getTotalSizeInKb', () => {
  test('should return the summaried size in kb', () => {
    expect(getTotalSizeInKb([
      { size: 1024 },
      { size: 1024 },
      { size: 1024 },
    ])).toBe('3');
  });
})