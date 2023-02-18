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
interface IForm{
    toDo:string,
    email:string,
    password1:string,
    password2:string,
}
function ToDoList(){
    //register : onchange value 등을 , onclur, onclick 등을 지원 
    const {register, handleSubmit, formState:{errors}, setError} = useForm<IForm>();

    //onValid엣 사용자 정의 message 추가 
    const onValid = (data:IForm)=>{
        // if password1 과 password2가 같지 않을때 
        if( data.password1 !== data.password2){
            setError(
                "password2",
                {message:"Password are not the same"},
                {shouldFocus: true},
            );
        }
        console.log("data", data);
    }
    console.log(errors);

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
                    {
                        errors?.toDo?.message
                    }
                </span>
                <input  {...register("email", {
                    required:"email is required." , 
                    pattern: {
                        value:/^[A-Za-z0-9._%+-]+@naver.com$/,
                        message:"Only naver.com emails allowed"
                    } 
                    })} placeholder = "E-Mail"/>
                <span>
                    {
                        errors?.email?.message
                    }
                </span>
                <input  {...register("password1", {required:"To do is required.", 
                    minLength:{
                        value: 5,
                        message:"your password is too short."
                    }
                })} placeholder = "write a to do"/>
                <span> {errors?.password1?.message}</span>                
                <input  {...register("password2", {required:"To do is required.", 
                    minLength:{
                        value: 5,
                        message:"your password is too short."
                    }
                })} placeholder = "write a to do"/>                   
                <span> {errors?.password2?.message}</span>                             
                <button>Add</button>
            </form>
        </div>
    );    
}
export default ToDoList;