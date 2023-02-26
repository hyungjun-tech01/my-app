import {Droppable} from "react-beautiful-dnd";
import styled from "styled-components";
import DraggableCard from "./DraggableCard";

const Wrapper = styled.div`
  padding : 20px 10px;
  padding-top:30px;
  background-color : ${(props)=>props.theme.boardColor};  
  border-radius : 5px;
  margin-right : 10px;
  min-height: 200px;
`;
const Title = styled.h2`
  text-align:center;
  font-weight:600;
  margine-bottom:10px;
  font-size: 18px;
`;


interface IBoardProps{
    toDos:string[],
    boardId:string;
}
function Board({toDos, boardId}:IBoardProps){
    return (
      <Wrapper>
        <Title>{boardId}</Title>
        <Droppable droppableId={boardId}>
          {(magic)=>(
            <Wrapper ref={magic.innerRef} {...magic.droppableProps} >
              {toDos.map( (toDo, index)=> (
                <DraggableCard key={toDo} index={index} toDo={toDo} />
              ))
              }
              {magic.placeholder}
            </Wrapper>
          )}
        </Droppable>
      </Wrapper>
    );
}
export default Board;