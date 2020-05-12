import React from 'react';

const Search = ({ onSearch, query }) => (
  <section>
    <input
      onChange={e => onSearch(e.target.value)}
      value={query}
      placeholder="Search documents..."
    />
  </section>
);

export default Search;
