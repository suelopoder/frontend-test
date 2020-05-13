import React from 'react';
import PropTypes from 'prop-types';

const Search = ({ onSearch, query }) => (
  <section id="search">
    <input
      onChange={e => onSearch(e.target.value)}
      value={query}
      placeholder="Search documents..."
      aria-label="Search documents"
    />
  </section>
);

Search.propTypes = {
  query: PropTypes.string.isRequired,
  onSearch: PropTypes.func,
}

Search.defaultProps = {
  onSearch: () => {},
}

export default Search;
