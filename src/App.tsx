import React, {useState} from 'react';
import Circle from './Circle';
import styled from 'styled-components';

const Container = styled.div`
  background-color : ${prop => prop.theme.bgColor};  
`;
const H1 = styled.h1`
  color : ${prop=>prop.theme.textColor}
`;

function App() {
  return (
    <Container>
      <H1>Hello
      </H1>
    </Container>
  );
}

export default App;
