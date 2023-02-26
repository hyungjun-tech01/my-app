
import {Draggable} from "react-beautiful-dnd";
import styled from "styled-components";
import React from "react";

const Card = styled.div<{isDragging : boolean}>`
  background-color : ${(props)=> props.isDragging ? "#74b9ff": props.theme.cardColor};
  padding : 10px 10px;
  border-radius : 5px;
  margin-bottom : 5px;
  box-shadow : ${props => props.isDragging ? "0px 2px 5px rgba(0,0,0,0.5)" : "none"};
`;
interface IDraggableCardProps{
    toDoId:number;
    toDoText:string;
    index:number;
}
function DraggableCard({toDoId, toDoText, index }: IDraggableCardProps){
    return (
        <Draggable draggableId={toDoId as any} index={index} key= {toDoId}>
                { (magic, snapshot)=> (
                  <Card isDragging = {snapshot.isDragging} ref={magic.innerRef} {...magic.draggableProps} {...magic.dragHandleProps} >
                    {toDoText} 
                  </Card>
                )}
        </Draggable>
    );
}
export default React.memo(DraggableCard);  // props가 바뀌지 않았으면 rendering 하지 말아줘 