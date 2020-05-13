import { MAX_SIZE, VALID_FILE_TYPES, VALID_FILE_EXTENSIONS } from './constants';

export const getFileUploadError = file => {
  if (file.size > MAX_SIZE) {
    return 'Max size is 10MB';
  }
  if (!VALID_FILE_TYPES.find(t => t === file.type)) {
    return 'Valid types are jpg and png only';
  }

  let isExtensionValid = false;
  for (const extension of VALID_FILE_EXTENSIONS) {
    if (file.name.endsWith(extension)) {
      isExtensionValid = true;
    }
  }
  if (!isExtensionValid) {
    return `Valid extensions are ${VALID_FILE_EXTENSIONS.join(',')}`;
  }

  return null;
}

export const getSizeInKb = size => {
  if (size < 1024) return '<1';
  return Math.round(size / 1024).toFixed(0);
};

export const getTotalSizeInKb = documents => {
  const totalSize = documents
    .map(doc => doc.size)
    .reduce((a,b) => a+b, 0);
  return getSizeInKb(totalSize);
};
