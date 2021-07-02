import React, { useMemo } from 'react';
import {
  useTable, useSortBy, useGlobalFilter, useFilters, usePagination,
} from 'react-table';
import { Icon, Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import PaginationButtons from './PaginationButtons';
import SelectPage from './SelectPage';
import { ColumnFilter, TableFilter } from './TableFilters';

// css
import './BasciTable.scss';

// TABLE
const BasicTable = ({
  columns,
  data,
  withColumnFilter,
  withGlobalFilter,
  tableProps,
  columnFilterProps,
  globalFilterProps,
  filterSearchTimer,
  headerStyle,
  footerStyle,
}) => {
  const defaultColumn = useMemo(() => {
    const ColumnFilterWithProps = (props) => (
      <ColumnFilter
        searchTimer={filterSearchTimer}
        inputProps={columnFilterProps}
        {...props}
      />
    );
    return {
      Filter: ColumnFilterWithProps,
    };
  }, [columnFilterProps, filterSearchTimer]);

  const tableInstance = useTable({
    columns,
    data,
    defaultColumn,
  },
  useFilters,
  useGlobalFilter,
  useSortBy,
  usePagination);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    gotoPage,
    pageCount,
    setPageSize,
    prepareRow,
    state,
    setGlobalFilter,
  } = tableInstance;
  const { globalFilter, pageIndex, pageSize } = state;

  return (
    <>
      {withGlobalFilter && (
      <TableFilter
        filter={globalFilter}
        setFilter={setGlobalFilter}
        inputProps={globalFilterProps}
      />
      )}
      <Table
        {...getTableProps()}
        style={{
          marginTop: '20px',
        }}
        {...tableProps}
      >
        <Table.Header>
          {
          headerGroups.map((headerGroup, headerGroupIndex) => (
            <Table.Row {...headerGroup.getHeaderGroupProps()} key={`header-group-${String(headerGroupIndex)}`}>
              {
                headerGroup.headers.map((column, headerIndex) => (
                  <Table.HeaderCell
                    {...column.getHeaderProps()}
                    style={headerStyle}
                    key={`header-${String(headerGroupIndex)}-${String(headerIndex)}`}
                  >
                    <div
                      {...column.getSortByToggleProps()}
                      style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr auto',
                        cursor: 'pointer',
                      }}
                    >
                      {column.render('Header')}
                      {column.isSorted && (
                        <Icon
                          name={column.isSortedDesc ? 'sort down' : 'sort up'}
                        />
                      )}
                    </div>
                    {withColumnFilter && (
                      <div style={{ marginTop: '5px' }}>
                        {column.canFilter && column.render('Filter')}
                      </div>
                    )}
                  </Table.HeaderCell>
                ))
              }
            </Table.Row>
          ))
        }
        </Table.Header>
        <Table.Body {...getTableBodyProps()}>
          {page.map((row, rowIndex) => {
            prepareRow(row);
            return (
              <Table.Row {...row.getRowProps()} key={`row-${String(rowIndex)}`}>
                {
                row.cells.map((cell, cellIndex) => (
                  <Table.Cell {...cell.getCellProps()} key={`cell-${String(rowIndex)}-${String(cellIndex)}`}>
                    {cell.render('Cell')}
                  </Table.Cell>
                ))
              }
              </Table.Row>
            );
          })}
        </Table.Body>
        <Table.Footer>
          {
          footerGroups.map((footerGroup, footerGroupIndex) => (
            <Table.Row {...footerGroup.getFooterGroupProps()} key={`footer-group-${String(footerGroupIndex)}`}>
              {
                footerGroup.headers.map((column, cellIndex) => (
                  <Table.HeaderCell
                    {...column.getFooterProps}
                    style={footerStyle}
                    key={`footer-cell-${String(cellIndex)}`}
                  >
                    { column.render('Footer') }
                  </Table.HeaderCell>
                ))
              }
            </Table.Row>
          ))
        }
        </Table.Footer>
      </Table>
      <div className="main-pagination-div">
        <PaginationButtons
          nextPage={nextPage}
          previousPage={previousPage}
          gotoPage={gotoPage}
          pageCount={pageCount}
          disablePrevious={!canPreviousPage}
          disableNext={!canNextPage}
          pageIndex={pageIndex + 1}
          pagesLength={pageOptions.length}
          buttonsProps={{
            inverted: true,
            style: {
              margin: '0',
            },
          }}
          inputProps={{
            inverted: true,
            transparent: true,
            style: {
              maxWidth: '5rem',
            },
            className: 'dark-label',
          }}
          labelProps={{
            className: 'dark-label',
          }}
        />
        <SelectPage
          pageSizesList={[10, 20, 30, 40, 50]}
          setPageSize={setPageSize}
          label="lignes"
          pageSize={pageSize}
          extraProps={{
            className: 'dark-label',
          }}
        />
      </div>
    </>
  );
};

BasicTable.propTypes = {
  // Configuration des columns
  columns: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)),
  // Données à afficher dans la table
  data: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)),
  // Ajoute un champ de recherche par colonne
  withColumnFilter: PropTypes.bool,
  // Ajoute un champ de recherche global
  withGlobalFilter: PropTypes.bool,
  // Props additionnels passés à la table Semantic
  tableProps: PropTypes.objectOf(PropTypes.any),
  // Props additionnels pour le filtre des columns
  columnFilterProps: PropTypes.objectOf(PropTypes.any),
  // Props additionnels pour le filtre global
  globalFilterProps: PropTypes.objectOf(PropTypes.any),
  // Temporisation entre la saisie dans un champ de recherche et l'exécution de la recherche
  filterSearchTimer: PropTypes.number,
  // Style donnée au header de la table
  headerStyle: PropTypes.objectOf(PropTypes.any),
  // Style donnée au footer de la table
  footerStyle: PropTypes.objectOf(PropTypes.any),
};

BasicTable.defaultProps = {
  columns: [],
  data: [],
  withColumnFilter: false,
  withGlobalFilter: false,
  tableProps: {},
  columnFilterProps: {},
  globalFilterProps: {},
  filterSearchTimer: undefined,
  headerStyle: {},
  footerStyle: {},
};

export default BasicTable;
