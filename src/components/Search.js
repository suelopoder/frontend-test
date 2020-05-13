import React from 'react';
import PropTypes from 'prop-types';

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

Search.propTypes = {
  onSearch: PropTypes.func.isRequired,
  query: PropTypes.string.isRequired,
}

export default Search;
