//import Circle from './Circle';
import { useState } from 'react';
import { ReactQueryDevtools } from 'react-query/devtools';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { darkTheme, lightTheme } from './theme';
import {DragDropContext, Droppable, Draggable} from "react-beautiful-dnd";
import styled from "styled-components";

// npm i react-beautiful-dnd
// npm i --save-dev @types/react-beautiful-dnd
const Wrapper = styled.div`
  display : flex;
  max-width : 480px;
  margin : 0 auto;
  justify-content : center;
  align-items : center;
  height : 100vh;
`;

const Boards = styled.div`
  display : grid;
  width : 100%;
  grid-template-columns : repeat(3, 1fr);
`;
const Board = styled.div`
  padding : 20px 10px;
  padding-top:30px;
  background-color : ${(props)=>props.theme.boardColor};  
  border-radius : 5px;
  min-height: 200px;
`;
const Card = styled.div`
  background-color : ${(props)=> props.theme.cardColor};
  padding : 10px 10px;
  border-radius : 5px;
  margin-bottom : 5px;
`;

const toDos = ["a", "b", "c", "d", "e", "f"];
function AppDnd() {
  const onDragEnd = ()=>{};
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <Boards>
        <Droppable droppableId="one">
          {(magic)=>(
            <Board ref={magic.innerRef} {...magic.droppableProps} >
              {toDos.map( (toDo, index)=> (
                <Draggable draggableId={toDo} index={index}>
                { (magic)=> (
                  <Card ref={magic.innerRef} {...magic.draggableProps} {...magic.dragHandleProps} >
                    {toDo} 
                  </Card>
                )}
              </Draggable>
              ))
              }
              {magic.placeholder}
            </Board>
          )}
        </Droppable>
      </Boards>
      </Wrapper>
    </DragDropContext>
  );
}

export default AppDnd;
