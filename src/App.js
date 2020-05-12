import React, { useState, useEffect } from 'react';
import './App.css';
import Search from './components/Search';
import Upload from './components/Upload';
import Documents from './components/Documents';
import Loading from './components/Loading';
import UIError from './components/Error';

function App() {
  const [docs, setDocs] = useState([]);
  const [errorFetchingDocs, setErrorFetchingDocs] = useState(null);
  const [fetchingDocs, setFetchingDocs] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    async function fetchDocs() {
      try {
        setFetchingDocs(true);
        const result = await fetch(`./api?query=${searchQuery}`);
        const data = await result.json();
        setDocs(data);
        setFetchingDocs(false);
      } catch (error) {
        setFetchingDocs(false);
        setErrorFetchingDocs(error.message);
      }
    }
    fetchDocs();
  }, [searchQuery]);

  const addDoc = () => {
    const random = Math.ceil(Math.random()*100);
    setDocs([
      ...docs,
      { name: `Doc ${random}`, size: random * 1000 }
    ]);
  }

  const onSearch = query => {
    // TODO validate query
    setSearchQuery(query);
  }

  return (
    <div className="App">
      <Search onSearch={onSearch} query={searchQuery} />
      <Upload onUpload={addDoc} />
      {fetchingDocs && <Loading />}
      {errorFetchingDocs && <UIError />}
      {docs.length && <Documents documents={docs} />}
    </div>
  );
}

export default App;
