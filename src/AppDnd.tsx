//import Circle from './Circle';
import { useState } from 'react';
import { ReactQueryDevtools } from 'react-query/devtools';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { darkTheme, lightTheme } from './theme';
import {DragDropContext, Droppable, Draggable, DropResult} from "react-beautiful-dnd";
import styled from "styled-components";
import {useRecoilState} from "recoil";
import {dndToDoState, categoryState} from "./components/atoms";
import DraggableCard from "./components/DraggableCard";
import Board from "./components/Board";

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



function AppDnd() {
  const [toDos, setToDos] = useRecoilState(dndToDoState);
  const onDragEnd = (info:DropResult)=>{
      console.log(info);
      const {draggableId, destination, source} = info;
      if(destination?.droppableId === source.droppableId){
        //we are same board
       setToDos(allBoard => {
         const copyToDos = [...allBoard[source.droppableId]];
         // delet 
         copyToDos.splice(source.index, 1);
         //if(destination?.draggableId) {}
         copyToDos.splice(destination?.index, 0, draggableId);
         return {
           ...allBoard,
           [source.droppableId]:copyToDos,
         }
        });
      }
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <Boards>
        {Object.keys(toDos).map(boardId =><Board key={boardId} boardId={boardId} toDos={ toDos[boardId] }/> )}
      </Boards>
      </Wrapper>
    </DragDropContext>
  );
}

export default AppDnd;

