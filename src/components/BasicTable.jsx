// dependences
import React, { useMemo } from 'react'
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  useFilters,
  usePagination,
  useExpanded,
} from 'react-table'
import { Icon, Table } from 'semantic-ui-react'
import PropTypes from 'prop-types'

import PaginationButtons from './PaginationButtons'
import SelectPage from './SelectPage'
import { ColumnFilter, TableFilter } from './TableFilters'

// css
import './BasciTable.scss'

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
  expandIconUp,
  expandIconRight,
  expandIconDown,
}) => {
  const defaultColumn = useMemo(() => {
    const ColumnFilterWithProps = (props) => (
      <ColumnFilter
        searchTimer={filterSearchTimer}
        inputProps={columnFilterProps}
        {...props}
      />
    )
    return {
      Filter: ColumnFilterWithProps,
    }
  }, [columnFilterProps, filterSearchTimer])

  const tableInstance = useTable(
    {
      columns,
      data,
      defaultColumn,
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    useExpanded,
    usePagination
  )

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
    getToggleAllRowsExpandedProps,
    toggleAllRowsExpanded,
    isAllRowsExpanded,
  } = tableInstance
  const { globalFilter, pageIndex, pageSize, expanded } = state

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
          {headerGroups.map((headerGroup, headerGroupIndex) => (
            <Table.Row
              {...headerGroup.getHeaderGroupProps()}
              key={`header-group-${String(headerGroupIndex)}`}
            >
              {headerGroup.headers.map((column, headerIndex) => {
                // 0 : tout replié | 1 : certain déplié | 2 : tout déplié
                const expandedState = (() => {
                  if (!Object.keys(expanded).length) return 0
                  return !isAllRowsExpanded ? 1 : 2
                })()
                // True si la column est celle des boutons de dépliement
                const isExpander = column.id === 'expander'
                // ne pas utiliser les props de trie pour une column expand
                const headerDivProps = !isExpander
                  ? column.getSortByToggleProps()
                  : getToggleAllRowsExpandedProps({
                      onClick: () => toggleAllRowsExpanded(expandedState === 0),
                    })
                return (
                  <Table.HeaderCell
                    {...column.getHeaderProps()}
                    style={headerStyle}
                    key={`header-${String(headerGroupIndex)}-${String(
                      headerIndex
                    )}`}
                  >
                    <span
                      {...headerDivProps}
                      style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr auto',
                        cursor:
                          column.disableSortBy && !isExpander
                            ? 'normal'
                            : 'pointer',
                      }}
                    >
                      {!isExpander && column.render('Header')}
                      {column.isSorted && (
                        <Icon
                          name={column.isSortedDesc ? 'sort down' : 'sort up'}
                        />
                      )}
                      {isExpander && (
                        <Icon
                          name={(() => {
                            switch (expandedState) {
                              case 0:
                                return expandIconUp
                              case 1:
                                return expandIconRight
                              case 2:
                              default:
                                return expandIconDown
                            }
                          })()}
                          style={{
                            fontSize: '17px',
                          }}
                        />
                      )}
                    </span>
                    {withColumnFilter && (
                      <div style={{ marginTop: '5px' }}>
                        {column.canFilter && column.render('Filter')}
                      </div>
                    )}
                  </Table.HeaderCell>
                )
              })}
            </Table.Row>
          ))}
        </Table.Header>
        <Table.Body {...getTableBodyProps()}>
          {page.map((row, rowIndex) => {
            prepareRow(row)
            return (
              <Table.Row {...row.getRowProps()} key={`row-${String(rowIndex)}`}>
                {row.cells.map((cell, cellIndex) => {
                  const isExpander = cell.column.id === 'expander'
                  return (
                    <Table.Cell
                      {...cell.getCellProps()}
                      key={`cell-${String(rowIndex)}-${String(cellIndex)}`}
                    >
                      {!isExpander && cell.render('Cell')}
                      {isExpander && cell.row.canExpand && (
                        <span
                          {...cell.row.getToggleRowExpandedProps({
                            style: {
                              paddingLeft: `${row.depth * 1.5}rem`,
                              display: 'grid',
                            },
                          })}
                        >
                          <Icon
                            name={
                              cell.row.isExpanded
                                ? expandIconDown
                                : expandIconRight
                            }
                          />
                        </span>
                      )}
                    </Table.Cell>
                  )
                })}
              </Table.Row>
            )
          })}
        </Table.Body>
        <Table.Footer>
          {footerGroups.map((footerGroup, footerGroupIndex) => (
            <Table.Row
              {...footerGroup.getFooterGroupProps()}
              key={`footer-group-${String(footerGroupIndex)}`}
            >
              {footerGroup.headers.map((column, cellIndex) => (
                <Table.HeaderCell
                  {...column.getFooterProps}
                  style={footerStyle}
                  key={`footer-cell-${String(cellIndex)}`}
                >
                  {column.render('Footer')}
                </Table.HeaderCell>
              ))}
            </Table.Row>
          ))}
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
  )
}

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
  // Nom de l'icon pour déplier les lignes : flèche haut
  expandIconUp: PropTypes.string,
  // Nom de l'icon pour déplier les lignes : flèche droite
  expandIconRight: PropTypes.string,
  // Nom de l'icon pour déplier les lignes : flèche bas
  expandIconDown: PropTypes.string,
}

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
  expandIconUp: 'arrow up',
  expandIconRight: 'arrow right',
  expandIconDown: 'arrow down',
}

export default BasicTable
