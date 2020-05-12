import React from 'react';

const Amount = ({ length }) => {
  if (!length) {
    return <h2>No documents yet</h2>;
  }

  if (length === 1) {
    return <h2>1 document</h2>;
  }

  return <h2>{length} documents</h2>;
}

const getTotalSizeInKb = documents =>
  documents
    .map(doc => doc.size)
    .reduce((a,b) => a+b, 0) / 1000;

const Documents = ({ documents, onDelete }) => (
  <section id="documents">
    <div>
      <Amount length={documents.length} />
      <span>Total size: {Math.ceil(getTotalSizeInKb(documents))} kb</span>
    </div>
    <ul>
      {documents.map(doc =>
        <li key={doc.name}>
          {doc.name}
          <button onClick={() => onDelete(doc)}>delete</button>
        </li>
      )}
    </ul>
  </section>
);

export default Documents;
