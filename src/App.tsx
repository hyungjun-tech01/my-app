import React from 'react';
import styled, {keyframes}  from "styled-components";

const Title = styled.h1`
  color:${props=>props.theme.textColor};
`;

const Wrapper = styled.div`
  height:100vh;
  width:100vh;
  justify-content:center;
  align-item:center;
  background-color:${props=>props.theme.backgroundColor};
  display :flex ;
  `;

function App() {
  return (
    <Wrapper>
      <Title>Hello</Title>
    </Wrapper>  
  );
}

export default App;
