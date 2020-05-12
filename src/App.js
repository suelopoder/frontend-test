import React, { useState } from 'react';
import './App.css';

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
      <section>
        <input
          onChange={e => setSearchQuery(e.target.value)}
          value={searchQuery}
          placeholder="Seach documents..."
        />
      </section>
      <section>
        <button onClick={addDoc}>Upload</button>
      </section>
      <section>
        docs
        <ul>
          {displayedDocs.map(doc =>
            <li key={doc.name}>{doc.name}</li>
          )}
        </ul>
      </section>
    </div>
  );
}

export default App;
