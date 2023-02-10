import React, { useState } from "react";

function ToDoList(){
    // input tag 안에 value 값이 들어오는 것을 감지 하고 써줌 .
    // event:React.FormEvent<HTMLInputElement> 를 써줌 (이걸 어떻게 알지?? ) 
    const [value, setValue] = useState("");
    const changeValue = (event:React.FormEvent<HTMLInputElement>)=>{
        const { 
            currentTarget:{value}
        } = event;
        //setValue(event.currentTarget.value);
        setValue(value);
    }
    // form을 submit 할 때 동작 value 값을 console에 출력
    const onSubmit = (event:React.FormEvent<HTMLFormElement>)=>{
        event.preventDefault();
        console.log(value);

    }
    return (
        <div>
            <form onSubmit = {onSubmit}>
                <input onChange={changeValue} value = {value} placeholder = "write a to do"/>
                <button>Add</button>
            </form>
        </div>

    );
}
export default ToDoList;