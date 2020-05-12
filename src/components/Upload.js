import React from 'react';

const Upload = ({ onUpload }) => (
  <section>
    <button onClick={() => onUpload()}>Upload</button>
  </section>
);

export default Upload;
