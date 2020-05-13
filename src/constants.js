import PropTypes from 'prop-types';

// 10 MB
export const MAX_SIZE = 10 * 1024 * 1024;

export const VALID_FILE_TYPES = [
  "image/png", "image/jpeg"
];

export const VALID_FILE_EXTENSIONS = [
  '.jpg','.jpeg','.png'
];

export const DocumentPropShape = PropTypes.shape({
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired,
});