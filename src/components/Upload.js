import React, { useRef, useState } from 'react';
import { VALID_FILE_EXTENSIONS } from '../constants';

const Upload = ({ onUpload, isValid }) => {
  const inputRef = useRef(null);
  const [error, setError] = useState(null);
  const onButtonClick = () => {
    inputRef.current.click();
  };
  const onFileUpload = ev => {
    setError(false);
    const target = ev.target.files[0];
    if (!target) {
      return false;
    }
    const error = isValid(target);
    if (error) {
      setError(error);
      return false;
    }

    onUpload(target);
  }

  return (
    <section>
      <form onSubmit={ev => ev.preventDefault()}>
        <input
          type="file"
          onChange={onFileUpload}
          accept={`file_extension:${VALID_FILE_EXTENSIONS.join(',')}`}
          style={{ display: 'none' }}
          ref={inputRef}
          />
        <button onClick={onButtonClick}>Upload</button>
        {error && <span className="error">Valid files are jpeg and png files under 10MB</span>}
      </form>
    </section>
  );
}

export default Upload;
