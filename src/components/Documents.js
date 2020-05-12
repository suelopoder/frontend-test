import React from 'react';
import Document from './Document';
import { getTotalSizeInKb } from '../helpers';

const getMessage = length => {
  if (!length) {
    return 'No documents yet';
  }

  if (length === 1) {
    return '1 document';
  }

  return `${length} documents`;
}

const Documents = ({ documents, onDelete }) => (
  <section id="documents">
    <div>
      <h2>{getMessage(documents.length)}</h2>
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
