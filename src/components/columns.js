import React from 'react';
import { format } from 'date-fns';

const COLUMNS = [
  {
    Header: 'Id',
    accessor: 'id',
    Footer: 'Id',
    disableFilters: true,
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
    Cell: ({ value }) => (
      <div style={{ minWidth: '160px' }}>
        {format(new Date(value), 'dd/MM/yyyy')}
      </div>
    ),
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
];

export { COLUMNS };
