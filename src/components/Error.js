import React from 'react';

const Error = ({ error }) =>
  <span>{error || 'Ups. Something went wrong'}</span>;

export default Error;