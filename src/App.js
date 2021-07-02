import React from 'react';
import './App.css';
import { Container, Segment } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import { BasicTable } from './components';
import MOCK_DATA from './mock_data/MOCK_DATA.json';
import { COLUMNS } from './components/columns';

function App() {
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
              data={MOCK_DATA}
            />
          </Container>
        </Segment>
      </Container>
    </div>
  );
}

export default App;
