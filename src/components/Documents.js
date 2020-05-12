import React from 'react';

const Documents = ({ documents, onDelete }) => (
  <section>
    Documents
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
