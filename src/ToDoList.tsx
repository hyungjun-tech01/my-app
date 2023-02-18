import React, { useState } from "react";
import {useForm} from "react-hook-form";

interface IForm{
    toDo:string,
}
function ToDoList(){
    //register : onchange value 등을 , onclur, onclick 등을 지원 
    const {register, handleSubmit, formState:{errors}, setValue} = useForm<IForm>();

    //onValid엣 사용자 정의 message 추가 
    const onValid = (data:IForm)=>{
        console.log("data", data);
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
        </div>
    );    
}
export default ToDoList;