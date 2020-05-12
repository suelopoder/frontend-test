import React, { useState, useEffect } from 'react';
import './App.css';
import Search from './components/Search';
import Upload from './components/Upload';
import Documents from './components/Documents';
import Loading from './components/Loading';
import UIError from './components/Error';
import { getFileUploadError } from './helpers';

function App() {
  const [docs, setDocs] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    async function fetchDocs() {
      setLoading(true);
      setError(null);
      try {
        const result = await fetch(`./api?query=${searchQuery}`);
        const data = await result.json();
        setDocs(data);
      } catch (error) {
        setError(error.message);
      }
      setLoading(false);
    }
    fetchDocs();
  }, [searchQuery]);

  const onUpload = async file => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      await fetch('/api', { method: 'POST', body: formData })
      // clear search query so new file is visible
      setSearchQuery('');
    } catch (error) {
      setError(error.message);
    }
  }

  const onSearch = query => {
    // TODO validate query
    setSearchQuery(query);
  }

  return (
    <div className="App">
      <Search onSearch={onSearch} query={searchQuery} />
      <Upload onUpload={onUpload} isValid={getFileUploadError} />
      {loading && <Loading />}
      {error && <UIError error={error} />}
      {docs.length && <Documents documents={docs} />}
    </div>
  );
}

export default App;
