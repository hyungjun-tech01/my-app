import React, { useState } from "react";
import {useForm} from "react-hook-form";
import {useRecoilValue} from "recoil";
import CreateToDo from "./components/CreateToDo";
import { toDoState } from "./components/atoms";
import ToDo from "./components/ToDo";

function ToDoList(){
    const toDos = useRecoilValue(toDoState);
    return (
        <div>
            <CreateToDo />
            <ul>
                {toDos.map(toDo=> 
                    <ToDo key={toDo.id} {...toDo} />) }
            </ul>
        </div>
    );    
}
export default ToDoList;