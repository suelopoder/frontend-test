import React from 'react';
import PropTypes from 'prop-types';

const Document = ({ name, size, onDelete }) => (
  <li className="document">
    <h3>{name}</h3>
    <span>{size}</span>
    <button onClick={onDelete}>delete</button>
  </li>
);

Document.propTypes = {
  name: PropTypes.string.isRequired,
  size: PropTypes.string.isRequired,
  onDelete: PropTypes.func,
}

Document.defaultProps = {
  onDelete: () => {},
}

export default Document;