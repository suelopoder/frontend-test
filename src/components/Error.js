import React from 'react';
import PropTypes from 'prop-types';

const Error = ({ error }) =>
  <span>{error || 'Ups. Something went wrong'}</span>;

Error.propTypes = {
  error: PropTypes.string.isRequired,
}

export default Error;