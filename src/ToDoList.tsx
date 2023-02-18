import React, { useState } from "react";
import {useForm} from "react-hook-form";
import {atom, useRecoilState} from "recoil";

const toDoState = atom<IToDo[]>(
    {
        key:"toDo",
        default:[],
    }
);
interface IForm{
    toDo:string,
}
interface IToDo{
    text:string;
    id:number;
    category:"TO_DO"|"DOING"|"DONE";
}
function ToDoList(){
    //atom 생성 toDoState 
    const [toDos, setToDos] = useRecoilState(toDoState);
    //register : onchange value 등을 , onclur, onclick 등을 지원 
    const {register, handleSubmit, formState:{errors}, setValue} = useForm<IForm>();

    //onValid엣 사용자 정의 message 추가 
    const onValid = (data:IForm)=>{
        console.log("data", data.toDo);
        setToDos(oldToDos => [{text:data.toDo, id:Date.now(), category:"TO_DO"}, ...oldToDos]);
        setValue("toDo","");
    }

    // style 을 세로로
    return (
        <div>
            <form style={{display:"flex", flexDirection:"column"}} onSubmit={handleSubmit(onValid)}>
                <input  {...register("toDo", {required:"To do is required.", 
                    minLength:{
                        value: 10,
                        message:"your todo is too short."
                    }
                })} placeholder = "write a to do"/>
                <span>
                    { errors?.toDo?.message }
                </span>                       
                <button>Add</button>
            </form>
            <ul>
                {toDos.map(toDo=><li key={toDo.id}>{toDo.text}</li> )}
            </ul>
        </div>
    );    
}
export default ToDoList;