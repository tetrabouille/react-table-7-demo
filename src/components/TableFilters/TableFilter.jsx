import React from 'react';
import { Input } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import useTableFilter from '../../hooks/useTableFilter';

const TableFilter = ({
  filter,
  setFilter,
  inputProps,
  searchTimer,
}) => {
  const { inputValue, setInputValue, onInputValueChange } = useTableFilter({
    filter,
    setFilter,
    timer: searchTimer,
  });

  return (
    <Input
      placeholder="Search..."
      value={inputValue || ''}
      onChange={(e) => {
        setInputValue(e.target.value);
        onInputValueChange(e.target.value);
      }}
      onKeyDown={(e) => {
        if (e.key === 'Enter') setFilter(e.target.value || undefined);
      }}
      {...inputProps}
    />
  );
};

TableFilter.propTypes = {
  // La value du filtre
  filter: PropTypes.string,
  // La fonction de mise à jour du filtre
  setFilter: PropTypes.func.isRequired,
  // Props additionnels à ajouter à Input
  inputProps: PropTypes.func,
  // Timer en ms apres lequel on effectue une recherche (apres modification de l'input)
  searchTimer: PropTypes.number,
};

TableFilter.defaultProps = {
  filter: undefined,
  inputProps: {},
  searchTimer: undefined,
};

export default TableFilter;
