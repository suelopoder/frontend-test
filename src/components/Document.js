import React from 'react';
import { getSizeInKb } from '../helpers';

const Document = (props) => (
  <li key={props.name} className="document">
    <h3>{props.name}</h3>
    <span>{getSizeInKb(props.size)}kb</span>
    <button onClick={props.onDelete}>delete</button>
  </li>
);

export default Document;