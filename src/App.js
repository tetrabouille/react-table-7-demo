import React, { useMemo } from 'react';
import './App.css';
import { Container, Segment } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import { BasicTable } from './components';
import { COLUMNS } from './components/columns';
import makeData from './mock_data/makeData';

function App() {
  const data = useMemo(() => makeData(100, 5, 5), []);
  return (
    <div className="App">
      <Container fluid>
        <Segment inverted attached="top">
          <h2>
            Demo React Table v7
          </h2>
        </Segment>
        <Segment inverted attached="bottom">
          <Container fluid textAlign="left">
            <BasicTable
              columns={COLUMNS}
              data={data}
            />
          </Container>
        </Segment>
      </Container>
    </div>
  );
}

export default App;
