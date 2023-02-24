
import {Draggable} from "react-beautiful-dnd";
import styled from "styled-components";
import React from "react";

const Card = styled.div`
  background-color : ${(props)=> props.theme.cardColor};
  padding : 10px 10px;
  border-radius : 5px;
  margin-bottom : 5px;
`;
interface IDraggableCardProps{
    toDo:string;
    index:number;
}
function DraggableCard({toDo,index }: IDraggableCardProps){
    console.log(toDo);
    return (
        <Draggable draggableId={toDo} index={index} key= {toDo}>
                { (magic)=> (
                  <Card ref={magic.innerRef} {...magic.draggableProps} {...magic.dragHandleProps} >
                    {toDo} 
                  </Card>
                )}
        </Draggable>
    );
}
export default React.memo(DraggableCard);  // props가 바뀌지 않았으면 rendering 하지 말아줘 