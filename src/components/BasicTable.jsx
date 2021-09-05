// dependences
import React, { useMemo } from 'react'
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  useFilters,
  usePagination,
} from 'react-table'
import { Icon, Table } from 'semantic-ui-react'
import MOCK_DATA from '../mock_data/MOCK_DATA.json'
import { COLUMNS } from './columns'
import { TableFilter, ColumnFilter } from './TableFilters'
import PaginationButtons from './PaginationButtons'
import SelectPage from './SelectPage'

// css
import './BasciTable.scss'

// TABLE
const BasicTable = () => {
  const columns = useMemo(() => COLUMNS, [])
  const data = useMemo(() => MOCK_DATA, [])

  const defaultColumn = useMemo(
    () => ({
      Filter: ColumnFilter,
    }),
    []
  )

  const tableInstance = useTable(
    {
      columns,
      data,
      defaultColumn,
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
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
  } = tableInstance
  const { globalFilter, pageIndex, pageSize } = state

  return (
    <>
      <TableFilter
        filter={globalFilter}
        setFilter={setGlobalFilter}
        getInputProps={() => ({
          label: 'Recherche Global',
          inverted: true,
        })}
      />
      <Table
        inverted
        selectable
        striped
        {...getTableProps()}
        style={{
          marginTop: '20px',
        }}
      >
        <Table.Header>
          {headerGroups.map((headerGroup, headerGroupIndex) => (
            <Table.Row
              {...headerGroup.getHeaderGroupProps()}
              key={`header-group-${String(headerGroupIndex)}`}
            >
              {headerGroup.headers.map((column, headerIndex) => (
                <Table.HeaderCell
                  {...column.getHeaderProps()}
                  style={{
                    backgroundColor: '#1976D2',
                    color: 'white',
                  }}
                  key={`header-${String(headerGroupIndex)}-${String(
                    headerIndex
                  )}`}
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
                  <div style={{ marginTop: '5px' }}>
                    {column.canFilter && column.render('Filter')}
                  </div>
                </Table.HeaderCell>
              ))}
            </Table.Row>
          ))}
        </Table.Header>
        <Table.Body {...getTableBodyProps()}>
          {page.map((row, rowIndex) => {
            prepareRow(row)
            return (
              <Table.Row {...row.getRowProps()} key={`row-${String(rowIndex)}`}>
                {row.cells.map((cell, cellIndex) => (
                  <Table.Cell
                    {...cell.getCellProps()}
                    key={`cell-${String(rowIndex)}-${String(cellIndex)}`}
                  >
                    {cell.render('Cell')}
                  </Table.Cell>
                ))}
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
                  style={{
                    backgroundColor: '#1976D2',
                    color: 'white',
                  }}
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
          getButtonsProps={() => ({
            inverted: true,
            style: {
              margin: '0',
            },
          })}
          getInputProps={() => ({
            inverted: true,
            transparent: true,
            style: {
              maxWidth: '5rem',
            },
            className: 'dark-label',
          })}
          getLabelProps={() => ({
            className: 'dark-label',
          })}
        />
        <SelectPage
          pageSizesList={[10, 20, 30, 40, 50]}
          setPageSize={setPageSize}
          label="lignes"
          pageSize={pageSize}
          getExtraProps={() => ({
            className: 'dark-label',
          })}
        />
      </div>
    </>
  )
}

export default BasicTable
