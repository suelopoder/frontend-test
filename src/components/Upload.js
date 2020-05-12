import React, { useRef, useState } from 'react';

const Upload = ({ onUpload, isValid }) => {
  const inputRef = useRef(null);
  const [error, setError] = useState(false);
  const onButtonClick = () => {
    inputRef.current.click();
  };
  const onFileUpload = ev => {
    setError(false);
    const target = ev.target.files[0];
    if (!isValid(target)) {
      setError(true);
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
          accept="file_extension:.jpg,.jpeg,.png"
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
