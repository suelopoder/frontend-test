import React from 'react';
import './App.css';
import Search from './components/Search';
import Upload from './components/Upload';
import Documents from './components/Documents';
import Loading from './components/Loading';
import UIError from './components/Error';
import { getFileUploadError } from './helpers';
import useDocuments from './useDocuments';

function App() {
  const [
    { docs, error, loading, searchQuery },
    { searchDocs, uploadDoc, deleteDoc }
  ] = useDocuments();

  return (
    <div className="app">
      <Search onSearch={searchDocs} query={searchQuery} />
      <Upload onUpload={uploadDoc} isValid={getFileUploadError} />
      {loading && <Loading />}
      {error && <UIError error={error} />}
      <Documents documents={docs} onDelete={deleteDoc} />
    </div>
  );
}

export default App;
