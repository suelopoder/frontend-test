import React from 'react';
import PropTypes from 'prop-types';

const Document = (props) => (
  <li className="document">
    <h3>{props.name}</h3>
    <span>{props.size}kb</span>
    <button onClick={props.onDelete}>delete</button>
  </li>
);

Document.propTypes = {
  name: PropTypes.string.isRequired,
  size: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
}

export default Document;