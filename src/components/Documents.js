import React from 'react';

const Documents = ({ documents }) => (
  <section>
    Documents
    <ul>
      {documents.map(doc =>
        <li key={doc.name}>{doc.name}</li>
      )}
    </ul>
  </section>
);

export default Documents;
