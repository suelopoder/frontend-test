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

const getSizeInKb = size => Math.ceil(size / 1000);

const getTotalSizeInKb = documents => {
  const totalSize = documents
    .map(doc => doc.size)
    .reduce((a,b) => a+b, 0);
  return getSizeInKb(totalSize)
};

const Document = (props) => (
  <li key={props.name} className="document">
    <h3>{props.name}</h3>
    <span>{getSizeInKb(props.size)}kb</span>
    <button onClick={props.onDelete}>delete</button>
  </li>
)

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
