import React from 'react';
import './App.css';
import json from './data.json';
import Mark from './components/mark';
import { Box, Container } from '@mui/material';

function App() {
  const clauseCounter = React.createRef();
  clauseCounter.current = 1;
  return (
    <Container maxWidth="md">
    <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
      {
        json.map((obj, index) => <Mark key={index} {...obj} clauseCounter={clauseCounter} />)
      }
    </Box>
    </Container>
  );
}

export default App;
