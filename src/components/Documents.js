import React from 'react';
import PropTypes from 'prop-types';
import Document from './Document';
import { getSizeInKb, getTotalSizeInKb } from '../helpers';
import { DocumentPropShape } from '../constants';

const getMessage = length => {
  if (!length) {
    return 'No documents';
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
      {documents.length > 0 && <span>Total size: {getTotalSizeInKb(documents)} kb</span>}
    </div>
    {documents.length > 0 &&
      <ul>
        {documents.map(doc =>
          <Document
            key={doc.id}
            name={doc.name}
            size={getSizeInKb(doc.size)}
            onDelete={() => onDelete(doc)}
          />
        )}
      </ul>
    }
  </section>
);

Documents.propTypes = {
  documents: PropTypes.arrayOf(DocumentPropShape).isRequired,
  onDelete: PropTypes.func.isRequired,
}

export default Documents;
