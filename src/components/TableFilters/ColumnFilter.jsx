import React from 'react';
import PropTypes from 'prop-types';
import TableFilter from './TableFilter';

const ColumnFilter = ({
  column,
  inputProps,
  searchTimer,
}) => {
  const { filterValue, setFilter } = column;

  return (
    <TableFilter
      filter={filterValue}
      setFilter={setFilter}
      inputProps={inputProps}
      searchTimer={searchTimer}
    />
  );
};

ColumnFilter.propTypes = {
  // Objet column récupéré par react-table
  column: PropTypes.shape({
    filterValue: PropTypes.string,
    setFilter: PropTypes.func,
  }).isRequired,
  // Props additionnels passés à l'input Semantic
  inputProps: PropTypes.objectOf(PropTypes.any),
  // Timer en ms apres lequel on effectue une recherche (apres modification de l'input)
  searchTimer: PropTypes.number,
};

ColumnFilter.defaultProps = {
  inputProps: {},
  searchTimer: undefined,
};

export default ColumnFilter;
