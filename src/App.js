import React, { useCallback, useMemo, useState } from 'react'
import './App.css'
import { Container, Segment } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import { BasicTable } from './components'
import { COLUMNS } from './components/columns'
import makeData from './mock_data/makeData'

function App() {
  const [selectedRows, setSelectedRows] = useState([])

  const data = useMemo(() => makeData(100, 5, 5), [])

  const handleRowSelection = useCallback((rows) => {
    setSelectedRows(rows)
  }, [])

  return (
    <div className="App">
      <Container fluid>
        <Segment inverted attached="top">
          <h2>Demo React Table v7</h2>
        </Segment>
        <Segment inverted attached="bottom">
          <Container fluid textAlign="left">
            <BasicTable
              columns={COLUMNS}
              data={data}
              withRowSelection
              handleRowSelection={handleRowSelection}
            />
            <div>
              {JSON.stringify(
                {
                  selectedFlatRows: selectedRows.map((row) => row.original),
                },
                null,
                2
              )}
            </div>
          </Container>
        </Segment>
      </Container>
    </div>
  )
}

export default App
