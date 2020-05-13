const MAX_SIZE = 10 * 1024 * 1024;
const VALID_MIME_TYPES = [
  "image/png", "image/jpeg"
];
const VALID_FILE_EXTENSIONS = [
  '.jpg','.jpeg','.png'
];

// TODO find a way to share this code with client side
const getFileError =  file => {
  if (file.size > MAX_SIZE) {
    return 'Max size is 10MB';
  }
  if (!VALID_MIME_TYPES.find(t => t === file.mimetype)) {
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

module.exports = getFileError;