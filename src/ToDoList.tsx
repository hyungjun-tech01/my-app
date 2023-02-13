import React, { useState } from "react";
import {useForm} from "react-hook-form";

// function ToDoList(){
//     input tag 안에 value 값이 들어오는 것을 감지 하고 써줌 .
//     event:React.FormEvent<HTMLInputElement> 를 써줌 (이걸 어떻게 알지?? ) 
//     const [toDo, setToDo] = useState("");
//     const changeValue = (event:React.FormEvent<HTMLInputElement>)=>{
//         const { 
//             currentTarget:{value}
//         } = event;
//         setValue(event.currentTarget.value);
//         setToDo(value);
//         setToDoError("");
//     }
//     toDo Error 처리 
//     const [toDoError, setToDoError] = useState("");
//     form을 submit 할 때 동작 value 값을 console에 출력
//     const onSubmit = (event:React.FormEvent<HTMLFormElement>)=>{
//         event.preventDefault();
//         if(toDo.length < 10){
//             return setToDoError("toDo should be longer!");
//         }
//         console.log(toDo);
//     }
//     return (
//         <div>
//             <form onSubmit = {onSubmit}>
//                 <input onChange={changeValue} value = {toDo} placeholder = "write a to do"/>
//                 <button>Add</button>
//                 <span>{toDoError === "" ? "" : toDoError}</span>
//             </form>
//         </div>

//     );
// }
function ToDoList(){
    const {register} = useForm();
    console.log(register("toDo"))
    return (
        <div>
            <form>
                <input  {...register("toDo")} placeholder = "write a to do"/>
                <button>Add</button>
            </form>
        </div>
    
    );    
}
export default ToDoList;