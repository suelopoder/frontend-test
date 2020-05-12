import React from 'react';

const Search = ({ onSearch, query }) => (
  <section id="search">
    <input
      onChange={e => onSearch(e.target.value)}
      value={query}
      placeholder="Search documents..."
      data-testid="search"
    />
  </section>
);

export default Search;
