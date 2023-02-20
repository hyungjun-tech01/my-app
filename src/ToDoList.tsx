import React, { ReactHTMLElement, useState } from "react";
import {useForm} from "react-hook-form";
import {useRecoilValue, useRecoilState} from "recoil";
import CreateToDo from "./components/CreateToDo";
import { toDoState, toDoSelector, categoryState , ToDoOptions} from "./components/atoms";
import ToDo from "./components/ToDo";
import TranslateHours from "./components/TranslateHours";

function ToDoList(){
    const [toDo] = useRecoilValue(toDoSelector);
    //category atom 정의 
    const [ category, setCategory] = useRecoilState(categoryState);
    //select에 들어오는 값을 감지 
    const onInput = (event:React.FormEvent<HTMLSelectElement>)=> {
        setCategory(event.currentTarget.value as any);
    }
    return (
        <div>
            <h1>To Dos</h1>
            <hr/>
            <select value={category} onInput={onInput}>
                <option value={ToDoOptions.TO_DO}>To Do</option>
                <option value={ToDoOptions.DOING}>Doing</option>
                <option value={ToDoOptions.DONE}>Done</option>
            </select>
            <CreateToDo />
            <hr/>
            <h2>{category}</h2>
            <ul>
                {toDo.map(toDo=> 
                    <ToDo key={toDo.id} {...toDo} />) }
            </ul>
            <hr/>
            <h1> Minuite to Hours</h1>
            <TranslateHours/>
        </div>
    );    
}
export default ToDoList;