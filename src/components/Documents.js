import React from 'react';
import Document from './Document';
import { getTotalSizeInKb } from '../helpers';

const Amount = ({ length }) => {
  if (!length) {
    return <h2>No documents yet</h2>;
  }

  if (length === 1) {
    return <h2>1 document</h2>;
  }

  return <h2>{length} documents</h2>;
}

const Documents = ({ documents, onDelete }) => (
  <section id="documents">
    <div>
      <Amount length={documents.length} />
      <span>Total size: {getTotalSizeInKb(documents)} kb</span>
    </div>
    <ul>
      {documents.map(doc =>
        <Document {...doc} key={doc.name} onDelete={() => onDelete(doc)} />
      )}
    </ul>
  </section>
);

export default Documents;
