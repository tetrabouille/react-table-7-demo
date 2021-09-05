import React from 'react'
import { format } from 'date-fns'

const COLUMNS = [
  {
    id: 'expander',
  },
  {
    Header: 'Id',
    accessor: 'id',
    Footer: 'Id',
    disableFilters: true,
    disableSortBy: true,
  },
  {
    Header: 'Prénom',
    accessor: 'first_name',
    Footer: 'Prénom',
  },
  {
    Header: 'Nom',
    accessor: 'last_name',
    Footer: 'Nom',
  },
  {
    Header: 'Email',
    accessor: 'email',
    Footer: 'Email',
  },
  {
    Header: 'Date de naissance',
    accessor: 'birth_date',
    Footer: 'Date de naissance',
    // eslint-disable-next-line react/prop-types
    Cell: ({ value }) => (
      <div style={{ minWidth: '160px' }}>
        {format(new Date(value), 'dd/MM/yyyy')}
      </div>
    ),
    sortType: 'datetime',
  },
  {
    Header: 'Pays',
    accessor: 'country',
    Footer: 'Pays',
  },
  {
    Header: 'Téléphone',
    accessor: 'phone',
    Footer: 'Téléphone',
  },
]

export { COLUMNS }
