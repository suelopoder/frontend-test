import React, { useState } from 'react';
import './App.css';
import Search from './components/Search';
import Upload from './components/Upload';
import Documents from './components/Documents';

const TEST_DOCS = [
  { name: 'Doc 1', size: 999999 },
  { name: 'Doc 2', size: 20 },
  { name: 'Doc 3', size: 50000 },
];
function App() {
  const [docs, setDocs] = useState(TEST_DOCS);
  const [searchQuery, setSearchQuery] = useState('');

  const addDoc = () => {
    const random = Math.ceil(Math.random()*100);
    setDocs([
      ...docs,
      { name: `Doc ${random}`, size: random * 1000 }
    ]);
  }

  const displayedDocs = docs.filter(doc =>
    doc.name.toLocaleLowerCase().includes(searchQuery.toLocaleLowerCase()));

  return (
    <div className="App">
      <Search
        onSearch={setSearchQuery}
        query={searchQuery}
      />
      <Upload onUpload={() => addDoc()} />
      <Documents documents={displayedDocs} />
    </div>
  );
}

export default App;
