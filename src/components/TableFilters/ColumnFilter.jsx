import React from 'react'
import PropTypes from 'prop-types'
import TableFilter from './TableFilter'

const ColumnFilter = ({ column }) => {
  const { filterValue, setFilter } = column

  return (
    <TableFilter
      filter={filterValue}
      setFilter={setFilter}
      getInputProps={() => ({
        transparent: true,
        inverted: true,
        placeholer: 'Search...',
        size: 'mini',
        style: {
          borderStyle: 'solid',
          borderRadius: '4px',
          borderWidth: '1px',
          borderColor: 'white',
          padding: '5px 10px',
        },
      })}
    />
  )
}

ColumnFilter.propTypes = {
  // Objet column récupéré par react-table
  column: PropTypes.shape({
    filterValue: PropTypes.string,
    setFilter: PropTypes.func,
  }).isRequired,
}

export default ColumnFilter
