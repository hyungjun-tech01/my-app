import React, {useState} from 'react';
import Circle from './Circle';
import styled from 'styled-components';
import Router from "./Router";

const Container = styled.div`
  background-color : ${prop => prop.theme.bgColor};  
`;
const H1 = styled.h1`
  color : ${prop=>prop.theme.textColor}
`;

function App() {
  return (
    <Container>
      <Router />
    </Container>
  );
}

export default App;
